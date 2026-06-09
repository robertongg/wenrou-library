"use client";

import { Flex } from "@chakra-ui/react";
import SearchFilters from "./catalog/search-filters";
import SearchResults from "./catalog/search-results";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
// import { Books, IBook } from "../utils/data/books";

export interface IBook {
    title: String,
    author: String,
    image: string | null,
    type: String[],
    owner: String,
    description: String | null,
    category: string[],
    borrower: String | null,
    url: string | null
}

const Catalog = () => {
    // FETCH DATA FROM DATABASE
    const [categoriesArray, setCategoriesArray] = useState<string[]>([]);
    const [bookList, setBookList] = useState<IBook[]>([]);
    const [searchResults, setSearchResults] = useState<IBook[]>([]);

    const fetchData = async() => {
        const supabase = await createClient();
        const { data: categories } = await supabase.from("BOOK_CATEGORY").select("category");

        setCategoriesArray(categories ? categories.map((category) => category.category) : []);

        const { data: books } = await supabase.from("BOOKS").select(`
            title,
            author,
            description,
            BOOKS_CATEGORY!inner(category),
            BOOKS_TYPE!inner(type),
            image,
            url,
            owner,
            borrower
        `);

        let bookListTemp : IBook[] = [];
        books?.forEach((book) => {
            bookListTemp.push({
                title: book.title,
                author: book.author,
                description: book.description,
                category: book.BOOKS_CATEGORY.map((category) => category.category),
                type : book.BOOKS_TYPE.map((type) => type.type),
                image: book.image,
                url: book.image,
                owner: book.owner,
                borrower: book.borrower
            });
        })

        setBookList(bookListTemp ? bookListTemp : []);
        setSearchResults(bookListTemp ? bookListTemp : []);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // SEARCH CRITERIA
    const [searchValue, setSearchValue] = useState("");
    
    const statusArray = ["All", "Available", "Not Available"];
    const [searchStatus, setSearchStatus] = useState(statusArray[0]);

    const [searchCategories, setSearchCategories] = useState<string[]>([]);

    // SEARCH FILTERS
    useEffect(() => {

        const resultsAfterFilter = bookList.filter((book) => {
            const matchesTitle = book.title.toUpperCase().includes(searchValue.toUpperCase());
            const matchesAuthor = book.author && book.author.toUpperCase().includes(searchValue.toUpperCase());
            const matchesDescription = book.description && book.description.toUpperCase().includes(searchValue.toUpperCase());

            const isBookAvailable = (
                (book.type.includes("ebook") && book.url) ||
                (book.type.includes("physical") && !book.borrower)
            );
            const matchesStatus = (
                searchStatus === "All" ||
                (searchStatus === "Available" && isBookAvailable) ||
                (searchStatus === "Not Available" && !isBookAvailable)
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