# MoneyMoov for Business

Welcome to the MoneyMoov for Business repo, a centralized monorepo for managing several interconnected applications and packages. Our goal is to maximize code reusability and maintain a consistent coding style across all projects.

## 💻 Requirements

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## 🚀 How to Get Started

Before you begin, there's a few preconditions to be aware of:

### Precondition:

- You need the BFF .NET project running locally. This is available in the `./bff` folder.
- Locate the file at `bff/NoFrixion.Bff/appsettings.json`.
- Create a local development `appsettings.json` file called `appsettings.development.json` and copy the contents into the file.
- Change the `ClientId` and `ClientSecret` to match your specific development environment.

### Setup and Launch:

0. **Environment Variables**:

   - Locate the file at `apps/business/.env.example`.
   - Create a copy of this file.
   - Rename your copied file to `apps/business/.env.local`.
   - Adjust the variables in `apps/business/.env.local` to match your specific development environment.

1. **Install Dependencies**:

   ```bash
   npm i
   ```

2. **Start Development Environment**:

   ```bash
   npm run dev
   ```

   Wait until you see a message indicating that the local server is up and running at `https://localhost:3001/`.

3. **All Set!**:
   You're now ready to develop! 🚀

## 🛠 Useful Commands

Here are some useful commands for navigating and working with the monorepo:

- **`npm lint`**: Lint all packages and apps using ESLint.
- **`npm format`**: Format files across all packages and apps using Prettier.
- **`npm dev`**: Run all packages and apps locally in development mode.
- **`npm build`**: Build all packages and apps.
- **`npm clean`**: Remove all `node_modules` and `dist` folders for a clean slate.

## 📂 Structure

Here's a breakdown of the apps and packages contained within this monorepo:

### Packages:

1. **`packages/clients`**

   - **Purpose**: Handle API calls and provide reusable code for API operations.
   - **Features**: Contains hooks for easy integration with React codebase projects.
   - **Distribution**: Currently for internal use, but potential to be exposed to npm.

2. **`packages/components`**

   - **Purpose**: A comprehensive library containing all the UI and functional React components essential for our applications.
   - **Features**: All major React components for the UI and functionality are housed here. As a side note, this package does contain Storybook stories. However, there's no official Storybook support currently. Future plans involve creating a separate `storybook` package for streamlined management of these stories.
   - **Distribution**: Primarily for internal use, with potential exposure to npm in the future.

3. **`packages/eslint-config`**
   - **Purpose**: Provide shared ESLint configuration for consistent linting across projects.
4. **`packages/tsconfig`**
   - **Purpose**: Share TypeScript configuration across different apps and packages.
5. **`packages/web-components`**
   - **Purpose**: Convert selected React components into web components.
   - **Features**: Generates a .js file upon build, which can be imported to use the specified web components.

### Apps:

1. **`apps/business`** - MoneyMoov for Business
   - **Aim**: Utilize the various packages in the monorepo to maximize code reusability.

## ⚙️ Development Tools

- **Formatting & Code Quality**: To ensure that all developers adhere to the same coding style, we've integrated `Prettier` and `ESLint`. This promotes consistency and helps in identifying and fixing issues early.

## 🌐 Future Enhancements

- Integrate official support for Storybook, likely with a dedicated package for managing stories.
- Evaluate and decide on exposing certain packages to npm for wider distribution.

---

We hope you find this monorepo setup efficient for the development and maintenance of projects. If you have any feedback or encounter issues, please open a ticket, and we'll address it promptly. Happy coding! 🚀👩‍💻👨‍💻
