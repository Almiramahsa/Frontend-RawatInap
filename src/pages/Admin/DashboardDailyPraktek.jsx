import React from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Flex,
  Select,
  Input,
} from "@chakra-ui/react";
import LayoutAdmin from "../../components/LayoutAdmin";
import addButton from "../../assets/images/addButton.svg";
import filterButton from "../../assets/images/filterButton.svg";
import searchIcon from "../../assets/images/searchIcon.svg";

function DashboardDailyPraktek() {
  return (
    <LayoutAdmin activeMenu={"doctor"}>
      <Box>
        <Box border={"2px"} borderColor="white" backgroundColor="white" p={5}>
          <Flex justifyContent={"space-between"}>
            <Text color={"alta.primary"} fontWeight="semibold" fontSize={"xl"}>
              Manajemen Dokter
            </Text>
            <Box>
              <Button color={"black"} variant="outline" mr={2}>
                <Image src={addButton} />
              </Button>
              <Button color={"black"} variant="outline">
                <Image src={filterButton} />
              </Button>
            </Box>
          </Flex>
        </Box>
        <Box backgroundColor="white" mt={5} minH="600px" p={5}>
          <Box>
            <Flex justifyContent={"end"}>
              <Select placeholder="Jawa Timur" w={"200px"}>
                <option value="option1">Jawa Timur</option>
                <option value="option2">Jawa Barat</option>
                <option value="option3">Jawa Tengah</option>
              </Select>
              <Select placeholder="Surabaya" w={"200px"} ml="5">
                <option value="option1">Jawa Timur</option>
                <option value="option2">Jawa Barat</option>
                <option value="option3">Jawa Tengah</option>
              </Select>
              <Button colorScheme="blue" ml="5">
                <Image src={searchIcon} />
              </Button>
            </Flex>
          </Box>
          <Box textAlign={"end"} mt="5">
            <Input
              placeholder="Mitra Keluarga Waru"
              w={{ base: "100%", lg: "300px" }}
            />
          </Box>
        </Box>
      </Box>
    </LayoutAdmin>
  );
}

export default DashboardDailyPraktek;
