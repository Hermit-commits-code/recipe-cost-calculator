import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Stack,
  Divider,
} from "@chakra-ui/react";

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

export default function AnalyticsDashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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
        mt={8}
        p={6}
        textAlign="center"
      >
        <Heading as="h2" size="md" mb={4}>
          Analytics
        </Heading>
        <Text>No recipes saved yet.</Text>
      </Box>
    );
  }

  // Most/least expensive recipes
  const sorted = [...recipes].sort(
    (a, b) => b.costPerServing - a.costPerServing
  );
  const mostExpensive = sorted[0];
  const leastExpensive = sorted[sorted.length - 1];
  const avgCost =
    recipes.reduce((sum, r) => sum + r.costPerServing, 0) / recipes.length;

  // Ingredient frequency
  const ingredientMap: Record<string, number> = {};
  recipes.forEach((r) => {
    r.ingredients.forEach((ing) => {
      ingredientMap[ing.name] = (ingredientMap[ing.name] || 0) + 1;
    });
  });
  const topIngredients = Object.entries(ingredientMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <Box maxW={{ base: "100%", md: "5xl" }} mx="auto" mt={8} p={6}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Analytics Dashboard
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Stat>
          <StatLabel>Most Expensive Recipe</StatLabel>
          <StatNumber fontSize="xl">
            ${mostExpensive.costPerServing.toFixed(2)}
          </StatNumber>
          <StatHelpText>{mostExpensive.name}</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Least Expensive Recipe</StatLabel>
          <StatNumber fontSize="xl">
            ${leastExpensive.costPerServing.toFixed(2)}
          </StatNumber>
          <StatHelpText>{leastExpensive.name}</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Average Cost per Serving</StatLabel>
          <StatNumber fontSize="xl">${avgCost.toFixed(2)}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Divider mb={6} />
      <Heading as="h3" size="md" mb={4}>
        Top Ingredients (by usage)
      </Heading>
      <Stack spacing={2}>
        {topIngredients.length === 0 ? (
          <Text>No ingredients found.</Text>
        ) : (
          topIngredients.map(([name, count]) => (
            <Text key={name} fontSize="md">
              {name}: {count} {count === 1 ? "time" : "times"}
            </Text>
          ))
        )}
      </Stack>
    </Box>
  );
}
