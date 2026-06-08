"use client";

import { Box, Button, ButtonGroup, Checkbox, CheckboxGroup, CloseButton, Drawer, Fieldset, Flex, Heading, Icon, Input, InputGroup, Portal, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";

interface ISearchFilters {
    searchValue: string,
    setSearchValue: Dispatch<SetStateAction<string>>,
    statusArray: string[],
    searchStatus: string,
    setSearchStatus: Dispatch<SetStateAction<string>>,
    categoriesArray: string[],
    searchCategories: string[],
    setSearchCategories: Dispatch<SetStateAction<string[]>>,
}

const SearchFilters = (property: ISearchFilters) => {
    const [selectAll, setSelectAll] = useState(false);

    const searchCloseButton = !property.searchValue ? undefined : (
        <CloseButton me={-2} size={"xs"} borderRadius={8} onClick={() => {
            property.setSearchValue("");
        }} />
    );

    return (
        <>
            <Flex
                display={{base: "none", md: "flex"}}
                className="filter-panel"
                w={"450px"}
                h={"fit-content"}
                pos={"sticky"}
                top={4}
                flexDir={"column"}
                gap={4}
            >
                <InputGroup startElement={<LuSearch />} endElement={searchCloseButton}>
                    <Input
                        colorPalette={"gray"}
                        borderRadius={12}
                        placeholder="Search books..."
                        value={property.searchValue}
                        onChange={(e) => {
                            property.setSearchValue(e.currentTarget.value)
                        }}
                    />
                </InputGroup>
                <Box>
                    <Heading className="filter-header">STATUS</Heading>
                    <ButtonGroup
                        className="filter-status"
                        display={"flex"}
                        flexDir={"column"}
                    >
                        {property.statusArray.map((item) => {
                            return (
                                <Button
                                    className={property.searchStatus === item ? "active pointer-events-auto" : "pointer-events-auto"}
                                    onClick={() => property.setSearchStatus(item)}
                                >
                                    {item}
                                </Button>
                            );
                        })}
                    </ButtonGroup>
                </Box>
                <Box>
                    <Heading className="filter-header">CATEGORIES ({property.searchCategories.length > 0 ? property.searchCategories.length : property.categoriesArray.length})</Heading>
                    <Fieldset.Root>
                        <Checkbox.Root
                            className="filter-category select-all"
                            value={"Select All"}
                            colorPalette={"blue"}
                            w={"fit-content"}
                            cursor={"pointer"}
                            checked={selectAll}
                            onCheckedChange={(e) => {
                                if (e.checked) {
                                    property.setSearchCategories(property.categoriesArray)
                                    setSelectAll(true);
                                } else {
                                    property.setSearchCategories([]);
                                    setSelectAll(false);
                                }
                            }}
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control cursor={"pointer"} />
                            <Checkbox.Label>Select All</Checkbox.Label>
                        </Checkbox.Root>
                        <CheckboxGroup
                            maxH={"180px"}
                            overflow={"auto"}
                            name="filterCategory"
                            value={property.searchCategories}
                            onValueChange={(e) => {
                                property.setSearchCategories(e);
                                setSelectAll(e.length === property.searchCategories.length);
                            }}
                        >
                            <Fieldset.Content>
                                {property.categoriesArray.map((item) => {
                                    return (
                                        <Checkbox.Root
                                            className="filter-category"
                                            key={item}
                                            value={item}
                                            defaultChecked={property.searchCategories.includes(item)}
                                            colorPalette={"blue"}
                                            w={"fit-content"}
                                            cursor={"pointer"}
                                        >
                                            <Checkbox.HiddenInput />
                                            <Checkbox.Control cursor={"pointer"} />
                                            <Checkbox.Label>{item}</Checkbox.Label>
                                        </Checkbox.Root>
                                    );
                                })}
                            </Fieldset.Content>
                        </CheckboxGroup>
                    </Fieldset.Root>
                </Box>
                <Button
                    w={"full"}
                    colorPalette={"red"}
                    borderRadius={10}
                    onClick={() => {
                        property.setSearchValue("");
                        property.setSearchStatus(property.statusArray[0]);
                        property.setSearchCategories([]);
                        setSelectAll(false);
                    }}
                >
                    Clear Filter
                </Button>
            </Flex>
            <Drawer.Root size={"full"} placement={"start"}>
                <Drawer.Trigger>
                    <Button w={"full"} id="filter-button-mobile" display={{base: "flex", md: "none"}}>
                        <Text>Filter</Text>
                        <Icon>
                            <BsFilter/>
                        </Icon>
                    </Button>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title>Filter By</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body overflow={"auto"}>
                                <Flex
                                    w={"full"}
                                    flexDir={"column"}
                                    gap={4}
                                >
                                    <InputGroup startElement={<LuSearch />} endElement={searchCloseButton}>
                                        <Input
                                            colorPalette={"gray"}
                                            borderRadius={12}
                                            placeholder="Search books..."
                                            value={property.searchValue}
                                            onChange={(e) => {
                                                property.setSearchValue(e.currentTarget.value)
                                            }}
                                        />
                                    </InputGroup>
                                    <Box>
                                        <Heading className="filter-header">STATUS</Heading>
                                        <ButtonGroup
                                            className="filter-status"
                                            display={"flex"}
                                            flexDir={"column"}
                                        >
                                            {property.statusArray.map((item) => {
                                                return (
                                                    <Button
                                                        className={property.searchStatus === item ? "active pointer-events-auto" : "pointer-events-auto"}
                                                        onClick={() => property.setSearchStatus(item)}
                                                    >
                                                        {item}
                                                    </Button>
                                                );
                                            })}
                                        </ButtonGroup>
                                    </Box>
                                    <Box>
                                        <Heading className="filter-header">CATEGORIES ({property.searchCategories.length > 0 ? property.searchCategories.length : property.categoriesArray.length})</Heading>
                                        <Fieldset.Root>
                                            <Checkbox.Root
                                                className="filter-category select-all"
                                                value={"Select All"}
                                                colorPalette={"blue"}
                                                w={"fit-content"}
                                                cursor={"pointer"}
                                                checked={selectAll}
                                                onCheckedChange={(e) => {
                                                    if (e.checked) {
                                                        property.setSearchCategories(property.categoriesArray)
                                                        setSelectAll(true);
                                                    } else {
                                                        property.setSearchCategories([]);
                                                        setSelectAll(false);
                                                    }
                                                }}
                                            >
                                                <Checkbox.HiddenInput />
                                                <Checkbox.Control cursor={"pointer"} />
                                                <Checkbox.Label>Select All</Checkbox.Label>
                                            </Checkbox.Root>
                                            <CheckboxGroup
                                                name="filterCategory"
                                                value={property.searchCategories}
                                                onValueChange={(e) => {
                                                    property.setSearchCategories(e);
                                                }}
                                            >
                                                <Fieldset.Content>
                                                    {property.categoriesArray.map((item) => {
                                                        return (
                                                            <Checkbox.Root
                                                                className="filter-category"
                                                                key={item}
                                                                value={item}
                                                                defaultChecked={property.searchCategories.includes(item)}
                                                                colorPalette={"blue"}
                                                                w={"fit-content"}
                                                                cursor={"pointer"}
                                                            >
                                                                <Checkbox.HiddenInput />
                                                                <Checkbox.Control cursor={"pointer"} />
                                                                <Checkbox.Label>{item}</Checkbox.Label>
                                                            </Checkbox.Root>
                                                        );
                                                    })}
                                                </Fieldset.Content>
                                            </CheckboxGroup>
                                        </Fieldset.Root>
                                    </Box>
                                </Flex>
                            </Drawer.Body>
                            <Drawer.Footer display={"flex"} gap={2}>
                                <Button
                                    w={"calc((100% - 0.5rem) / 2)"}
                                    colorPalette={"red"}
                                    borderRadius={10}
                                    onClick={() => {
                                        property.setSearchValue("");
                                        property.setSearchStatus(property.statusArray[0]);
                                        property.setSearchCategories([]);
                                        setSelectAll(false);
                                    }}
                                >
                                    Clear Filter
                                </Button>
                                <Drawer.ActionTrigger asChild>
                                    <Button
                                        variant={"subtle"}
                                        colorPalette={"gray"}
                                        w={"calc((100% - 0.5rem) / 2)"}
                                        borderRadius={10}
                                    >
                                        Close Filter
                                    </Button>
                                </Drawer.ActionTrigger>
                            </Drawer.Footer>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size={"sm"} />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </>
    );
}

export default SearchFilters;