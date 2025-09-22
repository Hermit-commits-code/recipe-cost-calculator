import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";

function App() {
  return (
    <Box
      bg="blue.200"
      textAlign="center"
      p={8}
      borderRadius="md"
      boxShadow="md"
    >
      <Stack spacing={4} align="center">
        <Heading as="h1" size="xl" color="blue.900">
          Chakra UI is working!
        </Heading>
        <Text fontSize="lg">Welcome to your Recipe Cost Calculator app.</Text>
        <Button colorScheme="blue">Test Button</Button>
      </Stack>
    </Box>
  );
}

export default App;
