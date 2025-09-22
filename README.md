# Recipe Cost Calculator

This is a privacy-first PWA for tracking and optimizing recipe costs. Built with React, TypeScript, Vite, and Chakra UI.

## Features

- Save recipes with ingredients, servings, and costs
- View all saved recipes in a card layout
- Edit and delete recipes
- Search and filter recipes by name and max cost per serving
- Navigation and routing for add, view, edit, and list
- Clean, modern UI with Chakra UI
- Only one "+ Add Recipe" button in the recipe list for a clear, consistent user experience

## Roadmap & Next Steps

See [ROADMAP.md](./ROADMAP.md) for the full, multi-phase roadmap and current progress.


### Immediate Priorities

- ~~Polish mobile UX & responsive layout~~ (done)
- ~~Add recipe import/export (JSON)~~ (done)
- ~~Build a basic analytics dashboard~~ (done)
- ~~Add recipe organization (categories/tags)~~ (done)
- Complete full PWA support

Premium and advanced features will follow after these core improvements.

---

## Recipe Organization (Categories/Tags)

You can now add categories/tags to recipes, see them in the recipe list, and filter recipes by tag/category.

---

## Analytics Dashboard

You can now view your most/least expensive recipes, average cost per serving, and top ingredients by usage. Click the "Analytics" button in the main navigation.

---

## Development

This project uses Vite, React, and Chakra UI. See below for original Vite/React/TypeScript setup notes.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
