"use client";

import { Flex } from "@chakra-ui/react";
import SearchFilters from "./catalog/search-filters";
import SearchResults from "./catalog/search-results";
import { useEffect, useState } from "react";

export interface IBook {
    title: String,
    author: String,
    image: string | null,
    type: String,
    owner: String,
    description: String | null,
    category: string[],
    borrower: String | null,
    url: string | null
}

const Catalog = () => {
    // SEARCH CRITERIA
    const [searchValue, setSearchValue] = useState("");
    
    const statusArray = ["All", "Available", "Not Available"];
    const [searchStatus, setSearchStatus] = useState(statusArray[0]);

    const categoriesArray = ["Bible Overview", "Bible Tools", "Church", "Cross & Ressurection", "Devotional", "Discipleship", "Evangelism", "Fighting Sin", "God's Character", "Identity", "Mental Health", "Prayer", "Relationship & Gender", "Work/Busyness"];
    const [searchCategories, setSearchCategories] = useState<string[]>([]);

    // SEARCH RESULTS
    const bookList: IBook[] = require("../app/catalog.json").$schema;
    const [searchResults, setSearchResults] = useState(bookList);

    // SEARCH FILTERS
    useEffect(() => {

        const resultsAfterFilter = bookList.filter((book) => {
            const matchesTitle = book.title.toUpperCase().includes(searchValue.toUpperCase());
            const matchesAuthor = book.author && book.author.toUpperCase().includes(searchValue.toUpperCase());
            const matchesDescription = book.description && book.description.toUpperCase().includes(searchValue.toUpperCase());

            const matchesStatus = (
                searchStatus === "All" ||
                (searchStatus === "Available" && (book.type === "ebook" || !book.borrower)) ||
                (searchStatus === "Not Available" && book.borrower)
            );

            let matchesCategories = false;
            if (searchCategories.length <= 0) {
                matchesCategories = true;
            } else {
                book.category.forEach((categoryItem) => {
                    if (searchCategories.includes(categoryItem)) {
                        matchesCategories = true;
                    }
                });
            }

            return (
                (matchesTitle || matchesAuthor || matchesDescription) &&
                matchesStatus &&
                matchesCategories
            );
        })

        setSearchResults(resultsAfterFilter);

    }, [searchValue, searchStatus, searchCategories]);

    useEffect(() => {
        console.log("Search results done!");
    }, [searchResults]);

    return (
        <Flex gap={4} w={"full"} flexDir={{base: "column", md: "row"}}>
            <SearchFilters
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                statusArray={statusArray}
                searchStatus={searchStatus}
                setSearchStatus={setSearchStatus}
                categoriesArray={categoriesArray}
                searchCategories={searchCategories}
                setSearchCategories={setSearchCategories}
            />
            <SearchResults
                bookList={bookList}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
            />
        </Flex>
    );
}

export default Catalog;