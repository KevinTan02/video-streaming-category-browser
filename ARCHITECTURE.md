# Architecture Notes

My main consideration for the setup of this application was to create reusable React components that each have their own separate concern. Each component has a single responsibility, which makes it easy to modify or extend different parts of the application.

## Components

- **App** – Main application container
- **CategoryList** – Category navigation
- **SearchBar** – Search input handling
- **SearchResults** – Search results display
- **VideoCarousel** – Video grid navigation
- **VideoDetailsModal** – Video information overlay

## Reusability

Components are designed to be reusable and modular. For example, `VideoCarousel` can be used for different video lists without modification, and the `useScrollable` hook can handle any horizontally scrollable list to determine whether scrolling buttons are needed. This structure supports adding new features with minimal changes to existing code.

## State

State is kept at the lowest level possible to avoid unnecessary prop drilling. The only App-level states are:

- `searchQuery` – used for conditional rendering on the home page
- `selectedVideoId` – shared between `SearchResults` and `CategoryList` to manage the currently selected video

These are both needed by App-level components

## Responsive Design

Left and right arrows appear when a component's content overflows its container, making horizontal scrolling intuitive. Styling uses `rem` units to maintain consistent spacing and font scaling across different screen sizes.
