# AI-Powered Recipe Finder

## Overview

AI-Powered Recipe Finder is a web application that leverages AI to help users find recipes based on their preferences and available ingredients. The application is built using Svelte, a modern JavaScript framework, and utilizes various APIs for recipe suggestions and AI functionalities.

## Project Structure

The project is organized into several key directories and files:

- **.env**: Environment variables, including API keys for external services.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **.vscode/**: Contains VS Code specific settings.
  - **extensions.json**: Recommended extensions for the project.
- **index.html**: The main HTML file for the application.
- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **postcss.config.js**: Configuration file for PostCSS.
- **public/**: Contains public assets that can be served directly.
  - **vite.svg**: Example SVG file.
- **README.md**: Documentation for the project.
- **src/**: Contains the source code for the application.
  - **app.css**: Global styles for the application.
  - **App.svelte**: The main Svelte component that serves as the root of the application.
  - **assets/**: Contains static assets like images.
    - **svelte.svg**: Example SVG file.
  - **lib/**: Contains utility files such as API calls, Svelte components, stores, and TypeScript types.
    - **api.ts**: API utility functions.
    - **Counter.svelte**: Example Svelte component.
    - **stores.ts**: Svelte stores.
    - **types.ts**: TypeScript types.
  - **main.ts**: Entry point of the application.
  - **vite-env.d.ts**: Type definitions for Vite.
- **svelte.config.js**: Configuration file for Svelte.
- **tailwind.config.js**: Configuration file for Tailwind CSS.
- **tsconfig.json**: TypeScript configuration file.
- **tsconfig.node.json**: TypeScript configuration file for Node.js.
- **vite.config.ts**: Configuration file for Vite.

## Setup Instructions

1. Clone the repository:

```sh
git clone https://github.com/yourusername/ai-powered-recipe-finder.git
cd project
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the root directory and add your API keys:

```env
VITE_SPOONACULAR_API_KEY=<your-spoonacular-api-key>
VITE_OPENAI_API_KEY=<your-openai-api-key>
```

4. Start the development server:

```sh
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Features

- Search for recipes based on ingredients.
- AI-powered suggestions for meal planning.
- User-friendly interface built with Svelte.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.
