import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeEntry from "./components/recipe/RecipeEntry";
import RecipeList from "./components/recipe/RecipeList";
import RecipeDetail from "./components/recipe/RecipeDetail";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AnalyticsDashboard from "./components/analytics/AnalyticsDashboard";

function App() {
  return (
    <Router>
      <Box maxW="5xl" mx="auto" p={4}>
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Recipe Cost Calculator
        </Heading>
        <Flex mb={4} justify="center" gap={4}>
          <Button as={RouterLink} to="/" colorScheme="teal" variant="ghost" size="sm">
            Recipes
          </Button>
          <Button as={RouterLink} to="/analytics" colorScheme="teal" variant="ghost" size="sm">
            Analytics
          </Button>
        </Flex>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<RecipeEntry />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/edit/:id" element={<RecipeEntry isEditMode />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
