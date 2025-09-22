import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  HStack,
  NumberInput,
  NumberInputField,
  Text,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type Ingredient = {
  name: string;
  quantity: number;
  cost: string; // keep as string for input
};

interface Recipe {
  name: string;
  servings: number;
  ingredients: Ingredient[];
  totalCost: number;
  costPerServing: number;
  createdAt: number;
}

interface RecipeEntryProps {
  initialRecipe?: Recipe;
  onSave?: (recipe: Recipe) => void;
  onCancel?: () => void;
  isEditMode?: boolean;
}

export default function RecipeEntry(props: RecipeEntryProps = {}) {
  const { initialRecipe, isEditMode } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState(initialRecipe?.name || "");
  const [servings, setServings] = useState(initialRecipe?.servings || 1);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialRecipe?.ingredients || [{ name: "", quantity: 1, cost: "" }]
  );

  useEffect(() => {
    if (isEditMode && id) {
      const stored = localStorage.getItem("recipes");
      if (stored) {
        try {
          const recipes: Recipe[] = JSON.parse(stored);
          const found = recipes.find((r) => String(r.createdAt) === id);
          if (found) {
            setRecipeName(found.name);
            setServings(found.servings);
            setIngredients(found.ingredients);
          }
        } catch {
          // Ignore JSON parse errors
        }
      }
    }
  }, [isEditMode, id]);

  const totalCost = ingredients.reduce(
    (sum, ing) =>
      sum + (isNaN(parseFloat(ing.cost)) ? 0 : parseFloat(ing.cost)),
    0
  );
  const costPerServing = servings > 0 ? totalCost / servings : 0;

  const handleIngredientChange = (
    idx: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    setIngredients((prev) =>
      prev.map((ing, i) => {
        if (i !== idx) return ing;
        if (field === "cost") {
          return { ...ing, cost: String(value) };
        } else if (field === "quantity") {
          return { ...ing, quantity: Number(value) };
        } else if (field === "name") {
          return { ...ing, name: String(value) };
        } else {
          return ing;
        }
      })
    );
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, { name: "", quantity: 1, cost: "" }]);
  };

  const removeIngredient = (idx: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
  };

  const isFormValid =
    recipeName.trim() !== "" &&
    servings > 0 &&
    ingredients.every(
      (ing) =>
        ing.name.trim() !== "" &&
        ing.quantity > 0 &&
        ing.cost !== "" &&
        !isNaN(parseFloat(ing.cost)) &&
        parseFloat(ing.cost) >= 0
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    const newRecipe: Recipe = {
      name: recipeName,
      servings,
      ingredients,
      totalCost,
      costPerServing,
      createdAt:
        isEditMode && id ? Number(id) : initialRecipe?.createdAt || Date.now(),
    };
    if (isEditMode && id) {
      const existing = localStorage.getItem("recipes");
      let recipes = [];
      try {
        recipes = existing ? JSON.parse(existing) : [];
      } catch {
        recipes = [];
      }
      const updated = recipes.map((r: Recipe) =>
        String(r.createdAt) === id ? newRecipe : r
      );
      localStorage.setItem("recipes", JSON.stringify(updated));
      navigate(`/recipe/${id}`);
    } else {
      const existing = localStorage.getItem("recipes");
      let recipes = [];
      try {
        recipes = existing ? JSON.parse(existing) : [];
      } catch {
        recipes = [];
      }
      recipes.push(newRecipe);
      localStorage.setItem("recipes", JSON.stringify(recipes));
      setRecipeName("");
      setServings(1);
      setIngredients([{ name: "", quantity: 1, cost: "" }]);
      navigate("/");
    }
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
        {isEditMode ? "Edit Recipe" : "Add a Recipe"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Recipe Name</FormLabel>
            <Input
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="e.g. Spaghetti Bolognese"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Servings</FormLabel>
            <NumberInput
              min={1}
              value={servings}
              onChange={(_, n) => setServings(n)}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <Divider />
          <Heading as="h3" size="md" mb={2} textAlign="center">
            Ingredients
          </Heading>
          {ingredients.map((ing, idx) => (
            <HStack key={idx} align="flex-end">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={ing.name}
                  onChange={(e) =>
                    handleIngredientChange(idx, "name", e.target.value)
                  }
                  placeholder="e.g. Ground Beef"
                />
              </FormControl>
              <FormControl isRequired w="120px">
                <FormLabel>Quantity</FormLabel>
                <NumberInput
                  min={1}
                  value={ing.quantity}
                  onChange={(_, n) =>
                    handleIngredientChange(idx, "quantity", n)
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl isRequired w="140px">
                <FormLabel>Cost ($)</FormLabel>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={ing.cost}
                  onChange={(e) =>
                    handleIngredientChange(idx, "cost", e.target.value)
                  }
                  placeholder="e.g. 2.50"
                />
              </FormControl>
              <IconButton
                aria-label="Remove ingredient"
                icon={<DeleteIcon />}
                colorScheme="red"
                variant="ghost"
                onClick={() => removeIngredient(idx)}
                isDisabled={ingredients.length === 1}
              />
            </HStack>
          ))}
          <Button
            onClick={addIngredient}
            colorScheme="blue"
            variant="outline"
            w="fit-content"
          >
            + Add Ingredient
          </Button>
          <Divider />
          <Box>
            <Text fontWeight="bold">Total Cost: ${totalCost.toFixed(2)}</Text>
            <Text fontWeight="bold">
              Cost per Serving: ${costPerServing.toFixed(2)}
            </Text>
          </Box>
          <Button colorScheme="green" type="submit" isDisabled={!isFormValid}>
            {isEditMode ? "Save Changes" : "Save Recipe"}
          </Button>
          {isEditMode && (
            <Button
              onClick={() => navigate(id ? `/recipe/${id}` : "/")}
              colorScheme="gray"
              variant="outline"
            >
              Cancel
            </Button>
          )}
        </Stack>
      </form>
    </Box>
  );
}
