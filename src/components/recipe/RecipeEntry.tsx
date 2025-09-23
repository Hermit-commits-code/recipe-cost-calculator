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
  tags?: string[];
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
  const [tags, setTags] = useState<string[]>(initialRecipe?.tags || []);
  const [tagInput, setTagInput] = useState("");

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
            setTags(found.tags || []);
          }
        } catch {
          // Ignore JSON parse errors
        }
      }
    }
  }, [isEditMode, id]);

  const totalCost = ingredients.reduce(
    (sum, ing) =>
      sum +
      (isNaN(parseFloat(ing.cost)) ? 0 : parseFloat(ing.cost) * ing.quantity),
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
      tags,
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
      maxW={{ base: "100%", md: "lg" }}
      mx="auto"
      mt={{ base: 2, md: 8 }}
      p={{ base: 2, md: 6 }}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading
        as="h2"
        size={{ base: "md", md: "lg" }}
        mb={4}
        textAlign="center"
      >
        {isEditMode ? "Edit Recipe" : "Add a Recipe"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Recipe Name
            </FormLabel>
            <Input
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="e.g. Spaghetti Bolognese"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Categories/Tags
            </FormLabel>
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
                  e.preventDefault();
                  if (!tags.includes(tagInput.trim().toLowerCase())) {
                    setTags([...tags, tagInput.trim().toLowerCase()]);
                  }
                  setTagInput("");
                } else if (e.key === "Backspace" && !tagInput && tags.length) {
                  setTags(tags.slice(0, -1));
                }
              }}
              placeholder="e.g. dinner, pasta, vegetarian"
              fontSize={{ base: "sm", md: "md" }}
            />
            <Stack direction="row" spacing={2} mt={2} wrap="wrap">
              {tags.map((tag, i) => (
                <Button
                  key={tag}
                  size="xs"
                  colorScheme="teal"
                  variant="solid"
                  onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
                >
                  {tag} ×
                </Button>
              ))}
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Servings</FormLabel>
            <NumberInput
              min={1}
              value={servings}
              onChange={(_, n) => setServings(n)}
            >
              <NumberInputField fontSize={{ base: "sm", md: "md" }} />
            </NumberInput>
          </FormControl>
          <Divider />
          <Heading
            as="h3"
            size={{ base: "sm", md: "md" }}
            mb={2}
            textAlign="center"
          >
            Ingredients
          </Heading>
          {ingredients.map((ing, idx) => (
            <Stack
              key={idx}
              direction={{ base: "column", sm: "row" }}
              spacing={2}
              align="flex-end"
            >
              <FormControl isRequired w={{ base: "100%", sm: "auto" }}>
                <FormLabel fontSize={{ base: "sm", md: "md" }}>Name</FormLabel>
                <Input
                  value={ing.name}
                  onChange={(e) =>
                    handleIngredientChange(idx, "name", e.target.value)
                  }
                  placeholder="e.g. Ground Beef"
                  fontSize={{ base: "sm", md: "md" }}
                />
              </FormControl>
              <FormControl isRequired w={{ base: "100%", sm: "120px" }}>
                <FormLabel fontSize={{ base: "sm", md: "md" }}>
                  Quantity
                </FormLabel>
                <NumberInput
                  min={1}
                  value={ing.quantity}
                  onChange={(_, n) =>
                    handleIngredientChange(idx, "quantity", n)
                  }
                >
                  <NumberInputField fontSize={{ base: "sm", md: "md" }} />
                </NumberInput>
              </FormControl>
              <FormControl isRequired w={{ base: "100%", sm: "140px" }}>
                <FormLabel fontSize={{ base: "sm", md: "md" }}>
                  Cost ($)
                </FormLabel>
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
                  fontSize={{ base: "sm", md: "md" }}
                />
              </FormControl>
              <IconButton
                aria-label="Remove ingredient"
                icon={<DeleteIcon />}
                colorScheme="red"
                variant="ghost"
                onClick={() => removeIngredient(idx)}
                isDisabled={ingredients.length === 1}
                size={{ base: "sm", md: "md" }}
              />
            </Stack>
          ))}
          <Button
            onClick={addIngredient}
            colorScheme="blue"
            variant="outline"
            w={{ base: "100%", sm: "fit-content" }}
            size={{ base: "md", md: "lg" }}
          >
            + Add Ingredient
          </Button>
          <Divider />
          <Box>
            <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
              Total Cost: ${totalCost.toFixed(2)}
            </Text>
            <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
              Cost per Serving: ${costPerServing.toFixed(2)}
            </Text>
          </Box>
          <Button
            colorScheme="green"
            type="submit"
            isDisabled={!isFormValid}
            size={{ base: "md", md: "lg" }}
          >
            {isEditMode ? "Save Changes" : "Save Recipe"}
          </Button>
          {isEditMode && (
            <Button
              onClick={() => navigate(id ? `/recipe/${id}` : "/")}
              colorScheme="gray"
              variant="outline"
              size={{ base: "md", md: "lg" }}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </form>
    </Box>
  );
}
