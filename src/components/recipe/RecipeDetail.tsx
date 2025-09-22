import { Box, Heading, Text, Stack, Divider } from "@chakra-ui/react";
import { useState } from "react";

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
  onDelete?: (recipe: Recipe) => void;
}

export default function RecipeDetail(props: RecipeDetailProps) {
  const { recipe, onBack, onEdit, onDelete } = props;
  const [showConfirm, setShowConfirm] = useState(false);
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
        {onDelete && (
          <button
            onClick={() => setShowConfirm(true)}
            style={{
              padding: "8px 16px",
              borderRadius: 4,
              background: "#e53e3e",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        )}
      </div>
      {showConfirm && (
        <div
          style={{
            marginTop: 24,
            background: "#fff5f5",
            border: "1px solid #e53e3e",
            borderRadius: 8,
            padding: 16,
            textAlign: "center",
          }}
        >
          <Text mb={2} color="red.600">
            Are you sure you want to delete this recipe?
          </Text>
          <button
            onClick={() => {
              if (onDelete) onDelete(recipe);
              setShowConfirm(false);
            }}
            style={{
              padding: "8px 16px",
              borderRadius: 4,
              background: "#e53e3e",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginRight: 8,
            }}
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            style={{
              padding: "8px 16px",
              borderRadius: 4,
              background: "#a0aec0",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </Box>
  );
}
