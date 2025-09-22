import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeEntry from "./components/recipe/RecipeEntry";
import RecipeList from "./components/recipe/RecipeList";
import RecipeDetail from "./components/recipe/RecipeDetail";
import { Box, Heading } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <Box maxW="5xl" mx="auto" p={4}>
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Recipe Cost Calculator
        </Heading>
        {/* Add Recipe button removed for better UX; use the one in RecipeList */}
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<RecipeEntry />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/edit/:id" element={<RecipeEntry isEditMode />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
