"use client";

import { Box, Card, Flex, Heading, Icon, Image, Tag, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaCircle } from "react-icons/fa";
import { IBook } from "../catalog";

interface IResultsCard {
    book: IBook
}

const ResultsCard = (property: IResultsCard) => {
    return (
        <Card.Root className="card" w={{base: "full", lg: "calc((100% - 0.5rem) / 2)", xl: "calc((100% - 1rem) / 3)"}} overflow={"hidden"}>
            <Flex
                className="card-image"
                h={60}
                alignItems={"center"}
                justifyContent={"center"}
                flexDir={"column"}
                gap={1}
            >
                {property.book.url ?
                    <Image w={"full"} h={"full"} objectFit={"contain"}
                        src={property.book.url}
                    />
                    :
                    <>
                        <Text fontSize={"4xl"}>📚</Text>
                        <Text fontSize={"small"}>No Cover</Text>
                    </>
                }
            </Flex>
            <Card.Body gap={2}>
                <Card.Title>{property.book.title}</Card.Title>
                <Text fontSize={"sm"}>{property.book.author}</Text>
                {!property.book.description ? null :
                    <Card.Description>{property.book.description}</Card.Description>
                }
            </Card.Body>
            <Card.Footer flexDir={"column"} gap={4}>
                <Flex w={"full"} fontWeight={"bold"} justifyContent={"space-between"}>
                    {property.book.type === "ebook" ?
                        <Tag.Root size={"md"} colorPalette={"yellow"} py={1} px={3} borderRadius={12}>
                            <Tag.Label>E-Book</Tag.Label>
                        </Tag.Root>
                        :
                        <>
                            <Tag.Root size={"md"} colorPalette={"purple"} py={1} px={3} borderRadius={12}>
                                <Tag.Label>Physical</Tag.Label>
                            </Tag.Root>
                            <Text
                                fontSize={"small"}
                                w={"fit-content"}
                                display={"flex"}
                                flexDir={"row"}
                                gap={2}
                                alignItems={"center"}
                                color={property.book.borrower ? "red" : "green"}
                            >
                                <Icon>
                                    <FaCircle/>
                                </Icon>
                                {property.book.borrower ? "Not Available" : "Available"}
                            </Text>
                        </>
                    }
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
                        return <ResultsCard key={index} book={book} />
                    })}
                </Flex>
            </Box>
        </Flex>
    );
}

export default SearchResults;