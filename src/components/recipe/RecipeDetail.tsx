import { Box, Heading, Text, Stack, Divider, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem("recipes");
    if (stored) {
      try {
        const recipes: Recipe[] = JSON.parse(stored);
        const found = recipes.find((r) => String(r.createdAt) === id);
        setRecipe(found || null);
      } catch {
        setRecipe(null);
      }
    }
  }, [id]);

  if (!recipe) {
    return (
      <Box maxW="lg" mx="auto" mt={8} p={6} textAlign="center">
        <Heading as="h2" size="lg" mb={4}>
          Recipe Not Found
        </Heading>
        <Button colorScheme="blue" onClick={() => navigate("/")}>
          Back to List
        </Button>
      </Box>
    );
  }

  const handleDelete = () => {
    const stored = localStorage.getItem("recipes");
    if (stored) {
      try {
        const recipes: Recipe[] = JSON.parse(stored);
        const updated = recipes.filter((r) => r.createdAt !== recipe.createdAt);
        localStorage.setItem("recipes", JSON.stringify(updated));
      } catch {
        // Ignore JSON parse errors
      }
    }
    navigate("/");
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        {recipe.name}
      </Heading>
      <Text fontSize="md" color="gray.600" mb={2} textAlign="center">
        Servings: {recipe.servings}
      </Text>
      <Divider mb={4} />
      <Text fontWeight="bold" mb={2}>
        Ingredients:
      </Text>
      <Stack spacing={1} mb={4}>
        {recipe.ingredients.map((ing, i) => (
          <Text key={i} fontSize="sm">
            {ing.quantity} x {ing.name} @ ${parseFloat(ing.cost).toFixed(2)}
          </Text>
        ))}
      </Stack>
      <Divider mb={4} />
      <Text fontWeight="bold">Total Cost: ${recipe.totalCost.toFixed(2)}</Text>
      <Text fontWeight="bold" mb={4}>
        Cost per Serving: ${recipe.costPerServing.toFixed(2)}
      </Text>
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <Button colorScheme="blue" onClick={() => navigate("/")}>
          Back to List
        </Button>
        <Button
          colorScheme="green"
          onClick={() => navigate(`/edit/${recipe.createdAt}`)}
        >
          Edit
        </Button>
        <Button colorScheme="red" onClick={() => setShowConfirm(true)}>
          Delete
        </Button>
      </div>
      {showConfirm && (
        <Box
          mt={6}
          bg="#fff5f5"
          border="1px solid #e53e3e"
          borderRadius={8}
          p={4}
          textAlign="center"
        >
          <Text mb={2} color="red.600">
            Are you sure you want to delete this recipe?
          </Text>
          <Button colorScheme="red" mr={2} onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button onClick={() => setShowConfirm(false)}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
}
