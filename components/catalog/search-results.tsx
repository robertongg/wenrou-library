"use client";

import { Box, Card, CloseButton, Dialog, Flex, Heading, Icon, Image, Link, Portal, Tag, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaCircle } from "react-icons/fa";
import { IBook } from "../catalog";
import { LuExternalLink } from "react-icons/lu";

interface IResultsCard {
    book: IBook,
    bookAvailable: boolean
}

const ResultsCard = (property: IResultsCard) => {
    return (
        <Card.Root className="card" w={"full"} h={"full"} overflow={"hidden"}>
            <Flex
                className="card-image"
                h={60}
                alignItems={"center"}
                justifyContent={"center"}
                flexDir={"column"}
                gap={1}
            >
                {property.book.image ?
                    <Image w={"full"} h={"full"} objectFit={"contain"}
                        src={property.book.image}
                    />
                    :
                    <>
                        <Text fontSize={"4xl"}>📚</Text>
                        <Text fontSize={"small"}>No Cover</Text>
                    </>
                }
            </Flex>
            <Card.Body gap={2}>
                <Card.Title className="card-title">{property.book.title}</Card.Title>
                <Text fontSize={"sm"}>{property.book.author}</Text>
                {!property.book.description ? null :
                    <Card.Description className="card-description">{property.book.description}</Card.Description>
                }
            </Card.Body>
            <Card.Footer flexDir={"column"} gap={4}>
                <Flex w={"full"} fontWeight={"bold"} justifyContent={"space-between"}>
                    <Flex gap={1}>
                        {!property.book.type.includes("ebook") ? null :
                            <Tag.Root size={"md"} colorPalette={"yellow"} py={1} px={3} borderRadius={12}>
                                <Tag.Label>E-Book</Tag.Label>
                            </Tag.Root>
                        }
                        {!property.book.type.includes("physical") ? null :
                            <Tag.Root size={"md"} colorPalette={"purple"} py={1} px={3} borderRadius={12}>
                                <Tag.Label>Physical</Tag.Label>
                            </Tag.Root>
                        }
                    </Flex>
                    <Text
                        fontSize={"small"}
                        w={"fit-content"}
                        display={"flex"}
                        flexDir={"row"}
                        gap={2}
                        alignItems={"center"}
                        color={property.bookAvailable ? "green" : "red"}
                    >
                        <Icon>
                            <FaCircle/>
                        </Icon>
                        {property.bookAvailable ? "Available" : "Not Available"}
                    </Text>
                </Flex>
                {property.book.category.length <= 0 ? null :
                    <Flex w={"full"} gap={2}>
                        {property.book.category.map((categoryItem, index) => {
                            return (
                                <Tag.Root
                                    key={index}
                                    size={"sm"}
                                    colorPalette={"blue"}
                                    py={1}
                                    px={3}
                                    borderRadius={12}
                                >
                                    <Tag.Label>{categoryItem}</Tag.Label>
                                </Tag.Root>
                            );
                        })}
                    </Flex>
                }
            </Card.Footer>
        </Card.Root>
    )
}

interface ISearchResults {
    bookList: IBook[],
    searchResults: IBook[],
    setSearchResults: Dispatch<SetStateAction<IBook[]>>,
}

interface IAvailabilityTag {
    available: boolean
}

const AvailabilityTag = (property: IAvailabilityTag) => {
    return (
        <Tag.Root
            size={"sm"}
            w={"fit-content"}
            colorPalette={property.available ? "green" : "red"}
            py={1}
            px={3}
            mt={1}
            borderRadius={12}
        >
            <Tag.Label>{property.available ? "Available" : "Not Available"}</Tag.Label>
        </Tag.Root>
    );
}

const SearchResults = (property: ISearchResults) => {
    return (
        <Flex w={"full"} flexDir={"column"} gap={2}>
            <Text className="total-books" fontSize={"smaller"} fontWeight={"bold"}>
                Showing {property.searchResults.length} of {property.bookList.length} books
            </Text>

            {/* NOT FOUND */}
            <Box textAlign={"center"} className={"results-not-found" + (property.searchResults.length > 0 ? " hidden" : "")}>
                <Text fontSize={{base: "5xl", md: "6xl"}}>📚</Text>
                <Heading fontSize={{base: "lg", md: "2xl"}} fontWeight={"bold"}>No books found</Heading>
                <Text fontSize={{base: "small", md: "medium"}}>Try adjust your search or filters</Text>
            </Box>

            {/* FOUND BOOKS */}
            <Box
                className={property.searchResults.length > 0 ? "" : "hidden"}
            >
                <Flex gap={2} flexWrap={"wrap"}>
                    {property.searchResults.map((book, index) => {
                        const available = (
                            (book.type.includes("ebook") && book.url) ||
                            (book.type.includes("physical") && !book.borrower)
                        ) as boolean;

                        return (
                            <Dialog.Root placement={"center"}>
                                <Dialog.Trigger w={{base: "full", lg: "calc((100% - 0.5rem) / 2)", xl: "calc((100% - 1rem) / 3)"}}>
                                    <ResultsCard key={index} book={book} bookAvailable={available} />
                                </Dialog.Trigger>
                                <Portal>
                                    <Dialog.Backdrop />
                                    <Dialog.Positioner>
                                        <Dialog.Content overflow={"hidden"}>
                                            {!book.image ? null :
                                                <Box
                                                    className="card-image"
                                                >
                                                    <Image
                                                        w={"full"}
                                                        h={"250px"}
                                                        objectFit={"contain"}
                                                        src={book.image}
                                                    />
                                                </Box>
                                            }
                                            <Dialog.Header>
                                                <Dialog.Title>
                                                    {book.title}
                                                </Dialog.Title>
                                            </Dialog.Header>
                                            <Dialog.Body display={"flex"} flexDir={"column"} gap={2}>
                                                <Text><b>Author:</b> {book.author}</Text>
                                                {!book.description ? null :
                                                    <Text><b>Description:</b> {book.description}</Text>
                                                }
                                                <Text><b>Owned By:</b> {book.owner}</Text>
                                                {!book.type.includes("ebook") || !book.url ? null :
                                                    <Text><b>E-book:</b> <Link href={book.url} target={"_blank"} variant={"underline"} className="book-link">Click here <LuExternalLink /></Link></Text>
                                                }
                                                {!book.type.includes("physical") || !book.borrower ? null :
                                                    <Text><b>Borrowed By:</b> {book.borrower}</Text>
                                                }
                                                <AvailabilityTag available={available} />
                                            </Dialog.Body>
                                            <Dialog.CloseTrigger>
                                                <CloseButton size={"sm"} />
                                            </Dialog.CloseTrigger>
                                        </Dialog.Content>
                                    </Dialog.Positioner>
                                </Portal>
                            </Dialog.Root>
                        );
                    })}
                </Flex>
            </Box>
        </Flex>
    );
}

export default SearchResults;