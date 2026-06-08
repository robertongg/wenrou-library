import { Box, Heading, Text } from "@chakra-ui/react";

const Header = () => {
    return (
        <Box id="header" py={4} mb={{base: 2, md: 4}} borderRadius={14}>
            <Heading size={{base: "xl", md: "3xl"}} fontWeight={"bolder"} mb={2}>📚 Wenrou Library Catalog</Heading>
            <Text fontSize={{base: "small", md: "large"}}>Search and explore Christian books available in Wenrou Tuanqi.</Text>
        </Box>
    );
}

export default Header;