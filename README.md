# 🚀 React + TypeScript Starter (with pnpm)

This is a **React + TypeScript** starter pack, pre-configured to help you quickly build modern front-end applications.  
It uses **pnpm** as the package manager for faster, more efficient installations.

---

## 📂 Project Structure

```
src/
├── assets/   # Static assets (images, icons, fonts, etc.)
├── components/   # Reusable UI components
├── features/   # Modular features (scalable structure for large projects)
│   └── Feature1/   # Example feature folder
|       └── hooks/  # Custom React hooks
|       └── pages/  # Main application pages
|       └── partials/   # Reusable partial layouts/components
|       └── services/   # API services (fetch/axios)
|       └── store/  # State management (Redux/Zustand/Recoil)
├── layout/   # Layout components (Navbar, Sidebar, Footer)
├── libs/   # Global libraries/helpers
├── router/   # Routing configuration (React Router)
├── types/  # TypeScript type definitions
├── utils/  # Utility/helper functions
├── main.tsx  # Application entry point
└── index.css   # Global styling
```

---

## 🛠️ Tech Stack

- ⚛ **React 18** – UI Library
- 🟦 **TypeScript** – Static typing
- ⚡ **Vite** – Super fast build tool
- 📦 **pnpm** – Package manager (faster & disk-space efficient)
- 🎨 **Tailwind CSS** – Utility-first styling (if you have it configured)
- ✅ **ESLint + Prettier** – Code linting & formatting

---

## 📦 Installation

Make sure you have **pnpm** installed:

```bash
npm install -g pnpm
```

Clone this repository and install dependencies:

```bash
pnpm install
```

## 🚀 Development

run the development server:

```bash
pnpm run dev
```
Then open http://localhost:5173 in your browser.

## 🏗️ Build

Create a production build:

```bash
pnpm run build
```
preview the build locally:
```bash
pnpm preview
```

## 🧹 Lint & Format

Check for lint errors:
```bash
pnpm lint
```

Format code using Prettier:
```bash
pnpm format
```

## 💡 Best Practices

- Place new features inside the `features/` folder to keep the project scalable and organized.
- Store global type definitions in `types/` to avoid duplication.
- Keep reusable logic in `utils/` for cross-feature usage.


---
## 📄 License

you can use this project for anything you like: personal, commercial, or educational.  