import { useState } from "react";
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
  cost: number;
};

export default function RecipeEntry() {
  const [recipeName, setRecipeName] = useState("");
  const [servings, setServings] = useState(1);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: 1, cost: 0 },
  ]);

  // Calculate total cost and cost per serving
  const totalCost = ingredients.reduce(
    (sum, ing) => sum + (isNaN(ing.cost) ? 0 : ing.cost),
    0
  );
  const costPerServing = servings > 0 ? totalCost / servings : 0;

  // Handlers
  const handleIngredientChange = (
    idx: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    setIngredients((prev) =>
      prev.map((ing, i) =>
        i === idx
          ? { ...ing, [field]: field === "name" ? value : Number(value) }
          : ing
      )
    );
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, { name: "", quantity: 1, cost: 0 }]);
  };

  const removeIngredient = (idx: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
  };

  // Simple validation
  const isFormValid =
    recipeName.trim() !== "" &&
    servings > 0 &&
    ingredients.every(
      (ing) => ing.name.trim() !== "" && ing.quantity > 0 && ing.cost >= 0
    );

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
        Add a Recipe
      </Heading>
      <form>
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
                <NumberInput
                  min={0}
                  precision={2}
                  value={ing.cost}
                  onChange={(_, n) => handleIngredientChange(idx, "cost", n)}
                >
                  <NumberInputField />
                </NumberInput>
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
            Save Recipe
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
