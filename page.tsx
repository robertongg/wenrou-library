import { Box } from "@chakra-ui/react";
import Header from "../components/header";
import Catalog from "../components/catalog";

const Home = () => {
	return (
		<Box w={"full"} px={8} py={{base: 4, md: 6}} maxW={"1560px"} m={"auto"}>
			<Header/>
			<Catalog/>
		</Box>
	);
}

export default Home;
