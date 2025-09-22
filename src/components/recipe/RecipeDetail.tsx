import { Box, Heading, Text, Stack, Divider } from "@chakra-ui/react";

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

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onEdit?: (recipe: Recipe) => void;
}

export default function RecipeDetail(props: RecipeDetailProps) {
  const { recipe, onBack, onEdit } = props;
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
        <button
          onClick={onBack}
          style={{
            padding: "8px 16px",
            borderRadius: 4,
            background: "#3182ce",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Back to List
        </button>
        {onEdit && (
          <button
            onClick={() => onEdit(recipe)}
            style={{
              padding: "8px 16px",
              borderRadius: 4,
              background: "#38a169",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        )}
      </div>
    </Box>
  );
}
