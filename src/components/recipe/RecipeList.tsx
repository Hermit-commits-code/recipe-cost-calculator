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
  tags?: string[];
}
import { useEffect, useState, useRef } from "react";
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
  const [importError, setImportError] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  // Export recipes as JSON
  const handleExport = () => {
    const data = localStorage.getItem("recipes");
    if (!data) return;
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recipes-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import recipes from JSON
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const imported = JSON.parse(text);
        if (!Array.isArray(imported)) throw new Error("Invalid format");
        // Basic validation: check for required fields
        for (const r of imported) {
          if (!r.name || !r.ingredients || !r.totalCost)
            throw new Error("Missing fields");
        }
        localStorage.setItem("recipes", JSON.stringify(imported));
        setRecipes(imported);
      } catch {
        setImportError(
          "Invalid or corrupt file. Please select a valid recipes-backup.json."
        );
      }
    };
    reader.readAsText(file);
  };

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

  // Collect all unique tags for filter dropdown
  const allTags = Array.from(
    new Set(recipes.flatMap((r) => r.tags || []))
  ).sort();

  // Filter recipes by search, max cost, and tag
  const filtered = recipes.filter((r) => {
    const matchesName = r.name.toLowerCase().includes(search.toLowerCase());
    const matchesCost =
      maxCost === "" || r.costPerServing <= parseFloat(maxCost);
    const matchesTag =
      !tagFilter || (r.tags && r.tags.includes(tagFilter));
    return matchesName && matchesCost && matchesTag;
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

      {/* Import/Export Controls */}
      <Flex mb={4} gap={2} flexWrap="wrap" justify="center" align="center">
        <Button
          colorScheme="gray"
          variant="outline"
          size={{ base: "sm", md: "md" }}
          onClick={handleExport}
        >
          Export Recipes
        </Button>
        <Button
          as="label"
          colorScheme="gray"
          variant="outline"
          size={{ base: "sm", md: "md" }}
          cursor="pointer"
        >
          Import Recipes
          <input
            type="file"
            accept="application/json"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImport}
          />
        </Button>
        <Text fontSize="xs" color="gray.500" ml={2}>
          (Backup or transfer your recipes. Import replaces all recipes.)
        </Text>
      </Flex>
      {importError && (
        <Text color="red.500" fontSize="sm" textAlign="center" mb={2}>
          {importError}
        </Text>
      )}

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
        {/* Tag filter dropdown */}
        <Box minW={{ base: "100%", sm: "160px" }}>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #CBD5E0" }}
          >
            <option value="">All Categories</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </Box>
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
              {recipe.tags && recipe.tags.length > 0 && (
                <Flex mt={1} gap={1} flexWrap="wrap">
                  {recipe.tags.map((tag) => (
                    <Box
                      key={tag}
                      px={2}
                      py={0.5}
                      bg="teal.100"
                      color="teal.800"
                      borderRadius="md"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      {tag}
                    </Box>
                  ))}
                </Flex>
              )}
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
