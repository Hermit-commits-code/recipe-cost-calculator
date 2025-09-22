
## [0.5.0] - 2025-09-22

### Changed

- Updated ROADMAP.md to reflect the full, multi-phase project vision and current progress.
- Added a prioritized feature list for both free and premium tiers.
- Updated README.md to clarify next steps and immediate priorities.
# [0.4.1] - 2025-09-22

### Changed

- Removed duplicate "+ Add Recipe" button from the top of the app for a cleaner, less confusing user experience. The button is now only in the recipe list/filter area.

# Changelog

## [0.4.0] - 2025-09-22

### Added

- Users can now search recipes by name and filter by max cost per serving in the recipe list.

## [0.3.0] - 2025-09-22

### Added

- Users can now delete recipes from the detail view, with a confirmation dialog.

## [0.2.0] - 2025-09-22

### Added

- Users can now view all saved recipes in a card layout (RecipeList).
- Click a recipe to see full details (RecipeDetail).
- Edit recipes from the detail view with a pre-filled form.

## [0.1.0] - 2025-09-22

### Added

- Users can now save recipes to localStorage from the RecipeEntry form.

## [0.0.0] - Initial scaffolding

### Added

- Scaffolded project folders: components (with recipe, analytics, premium, ui), hooks, utils, contexts.
- Created initial component files: RecipeEntry, IngredientEntry, RecipeCard (placeholders).

### Changed

- Switched project styling from Tailwind CSS to Chakra UI for easier setup and modern component-based styling.
- Removed all Tailwind CSS and PostCSS configuration and dependencies.
- Added Chakra UI and peer dependencies. Updated `App.tsx` to use Chakra UI components for a test banner.
