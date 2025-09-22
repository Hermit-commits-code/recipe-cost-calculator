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
      <Box maxW="lg" mx="auto" mt={8} p={6} textAlign="center">
        <Heading as="h2" size="lg" mb={4}>
          Saved Recipes
        </Heading>
        <Text>No recipes saved yet.</Text>
        <Button mt={4} colorScheme="teal" onClick={() => navigate("/add")}>
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
    <Box maxW="5xl" mx="auto" mt={8} p={6}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Saved Recipes
      </Heading>
      <Flex mb={6} gap={4} flexWrap="wrap" justify="center">
        <InputGroup maxW="300px">
          <InputLeftElement pointerEvents="none">
            <Icon as={SearchIcon} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg="white"
          />
        </InputGroup>
        <NumberInput
          maxW="200px"
          min={0}
          step={0.01}
          value={maxCost}
          onChange={(_, n) => setMaxCost(n === undefined ? "" : String(n))}
        >
          <NumberInputField placeholder="Max $/serving" bg="white" />
        </NumberInput>
        <Button colorScheme="teal" onClick={() => navigate("/add")}>
          + Add Recipe
        </Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {filtered.map((recipe, idx) => (
          <Card
            key={recipe.createdAt || idx}
            boxShadow="md"
            borderWidth={1}
            _hover={{ cursor: "pointer", bg: "gray.50" }}
            onClick={() => navigate(`/recipe/${recipe.createdAt}`)}
          >
            <CardHeader>
              <Heading as="h3" size="md">
                {recipe.name}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Servings: {recipe.servings}
              </Text>
            </CardHeader>
            <Divider />
            <CardBody>
              <Text fontWeight="bold" mb={2}>
                Ingredients:
              </Text>
              <Stack spacing={1}>
                {recipe.ingredients.map((ing, i) => (
                  <Text key={i} fontSize="sm">
                    {ing.quantity} x {ing.name} @ $
                    {parseFloat(ing.cost).toFixed(2)}
                  </Text>
                ))}
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Text fontWeight="bold">
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
