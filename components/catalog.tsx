"use client";

import { Flex } from "@chakra-ui/react";
import SearchFilters from "./catalog/search-filters";
import SearchResults from "./catalog/search-results";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { getSheetRows } from "../app/actions/sheets";

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

    const fetchDataDB = async() => {
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

    const fetchDataGSheet = async() => {

        const categories = await getSheetRows("Categories!$A:$A");
        setCategoriesArray(categories ? categories.map((category) => category[0]) : []);

        const books : String[][] = await getSheetRows("Book List!$A:$I");
        const columnIndex_title = books[0].indexOf("title");
        const columnIndex_author = books[0].indexOf("author");
        const columnIndex_description = books[0].indexOf("description");
        const columnIndex_category = books[0].indexOf("category");
        const columnIndex_type = books[0].indexOf("type");
        const columnIndex_image = books[0].indexOf("image");
        const columnIndex_url = books[0].indexOf("url");
        const columnIndex_owner = books[0].indexOf("owner");
        const columnIndex_borrower = books[0].indexOf("borrower");
        
        let bookListTemp : IBook[] = [];
        books.forEach((book, index) => {
            if (index > 0) {
                bookListTemp.push({
                    title: book.length > columnIndex_title ? book[columnIndex_title] : "",
                    author: book.length > columnIndex_author ? book[columnIndex_author] : "",
                    description: book.length > columnIndex_description ? book[columnIndex_description] : null,
                    category: book.length > columnIndex_category ? book[columnIndex_category].split(", ") : [],
                    type: book.length > columnIndex_type ? book[columnIndex_type].split(", ").map((type) => {
                        if (type === "E-book") {
                            return "ebook";
                        }

                        if (type === "Physical") {
                            return "physical";
                        }

                        return type;
                    }) : [],
                    image: book.length > columnIndex_image ? book[columnIndex_image].toString() : null,
                    url: book.length > columnIndex_url ? book[columnIndex_url].toString() : null,
                    owner: book.length > columnIndex_owner ? book[columnIndex_owner] : "",
                    borrower: book.length > columnIndex_borrower ? book[columnIndex_borrower] : null
                });
            }
        });

        setBookList(bookListTemp);
        setSearchResults(bookListTemp);
    }

    useEffect(() => {
        // fetchDataDB();
        fetchDataGSheet();
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