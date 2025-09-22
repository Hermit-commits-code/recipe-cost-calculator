// Type definitions
interface Ingredient {
  name: string;
  quantity: number;
  cost: string;
}

interface Recipe {
  name: string;
  servings: number;
  ingredients: Ingredient[];
  totalCost: number;
  costPerServing: number;
  createdAt: number;
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Flex,
  Icon,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("recipes");
    if (stored) {
      try {
        setRecipes(JSON.parse(stored));
      } catch {
        setRecipes([]);
      }
    }
  }, []);

  if (recipes.length === 0) {
    return (
      <Box
        maxW={{ base: "100%", md: "lg" }}
        mx="auto"
        mt={{ base: 2, md: 8 }}
        p={{ base: 2, md: 6 }}
        textAlign="center"
      >
        <Heading as="h2" size={{ base: "md", md: "lg" }} mb={4}>
          Saved Recipes
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }}>No recipes saved yet.</Text>
        <Button
          mt={4}
          colorScheme="teal"
          size={{ base: "md", md: "lg" }}
          onClick={() => navigate("/add")}
        >
          + Add Recipe
        </Button>
      </Box>
    );
  }

  // Filter recipes by search and max cost
  const filtered = recipes.filter((r) => {
    const matchesName = r.name.toLowerCase().includes(search.toLowerCase());
    const matchesCost =
      maxCost === "" || r.costPerServing <= parseFloat(maxCost);
    return matchesName && matchesCost;
  });

  return (
    <Box
      maxW={{ base: "100%", md: "5xl" }}
      mx="auto"
      mt={{ base: 2, md: 8 }}
      p={{ base: 2, md: 6 }}
    >
      <Heading
        as="h2"
        size={{ base: "md", md: "lg" }}
        mb={{ base: 4, md: 6 }}
        textAlign="center"
      >
        Saved Recipes
      </Heading>
      <Flex
        mb={{ base: 4, md: 6 }}
        gap={4}
        flexWrap={{ base: "wrap", md: "nowrap" }}
        direction={{ base: "column", sm: "row" }}
        align={{ base: "stretch", sm: "center" }}
        justify="center"
      >
        <InputGroup
          maxW={{ base: "100%", sm: "300px" }}
          mb={{ base: 2, sm: 0 }}
        >
          <InputLeftElement pointerEvents="none">
            <Icon as={SearchIcon} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg="white"
            fontSize={{ base: "sm", md: "md" }}
          />
        </InputGroup>
        <NumberInput
          maxW={{ base: "100%", sm: "200px" }}
          min={0}
          step={0.01}
          value={maxCost}
          onChange={(_, n) => setMaxCost(n === undefined ? "" : String(n))}
        >
          <NumberInputField
            placeholder="Max $/serving"
            bg="white"
            fontSize={{ base: "sm", md: "md" }}
          />
        </NumberInput>
        <Button
          colorScheme="teal"
          size={{ base: "md", md: "lg" }}
          onClick={() => navigate("/add")}
        >
          + Add Recipe
        </Button>
      </Flex>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 2 }}
        spacing={{ base: 4, md: 6 }}
      >
        {filtered.map((recipe, idx) => (
          <Card
            key={recipe.createdAt || idx}
            boxShadow="md"
            borderWidth={1}
            _hover={{ cursor: "pointer", bg: "gray.50" }}
            onClick={() => navigate(`/recipe/${recipe.createdAt}`)}
            p={{ base: 2, md: 4 }}
            borderRadius={{ base: "md", md: "lg" }}
            minH={{ base: "auto", md: 220 }}
          >
            <CardHeader pb={2}>
              <Heading as="h3" size={{ base: "sm", md: "md" }}>
                {recipe.name}
              </Heading>
              <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
                Servings: {recipe.servings}
              </Text>
            </CardHeader>
            <Divider />
            <CardBody py={2}>
              <Text
                fontWeight="bold"
                mb={2}
                fontSize={{ base: "sm", md: "md" }}
              >
                Ingredients:
              </Text>
              <Stack spacing={1}>
                {recipe.ingredients.map((ing, i) => (
                  <Text key={i} fontSize={{ base: "xs", md: "sm" }}>
                    {ing.quantity} x {ing.name} @ $
                    {parseFloat(ing.cost).toFixed(2)}
                  </Text>
                ))}
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter pt={2}>
              <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                Total: ${recipe.totalCost.toFixed(2)} | Per Serving: $
                {recipe.costPerServing.toFixed(2)}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default RecipeList;
