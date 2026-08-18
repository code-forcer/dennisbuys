"use client";

import { Box, Flex, HStack, Text, Circle, Link as CLink, Icon } from "@chakra-ui/react";
import { FiPhone } from "react-icons/fi";
import { site } from "@/site.config";

export function Header() {
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="20"
      bg="rgb(0, 0, 0)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
    >
      <Flex
        maxW="container.lg"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={3}
        align="center"
        justify="space-between"
      >
        <HStack gap={3}>
          <Circle size="34px" bg="navy.500" color="white" fontWeight="700" fontFamily="heading">
            {site.ownerFirstName.charAt(0)}
          </Circle>
          <Box lineHeight="1.1">
            <Text fontSize="xs" color="whiteAlpha.700" fontWeight="500">
              {site.ownerFirstName} Buys
            </Text>
            <Text fontSize="sm" color="white" fontWeight="700">
              Vegas Houses
            </Text>
          </Box>
        </HStack>

        <CLink
          href={`tel:${site.phoneHref}`}
          display="flex"
          alignItems="center"
          gap={2}
          fontSize="sm"
          fontWeight="600"
          color="white"
          borderBottom="2px solid"
          borderColor="navy.500"
          pb="1px"
        >
          <Icon as={FiPhone} boxSize={4} />
          Call {site.ownerFirstName}
        </CLink>
      </Flex>
    </Box>
  );
}
