# Mini Sentiment Widget

A sleek and functional React application that allows users to rate their experience and provide textual feedback. This widget includes persistent tracking of submissions and displays a rolling summary.

## ✨ Features

- **Rating Selector**: Select numeric feedback values instantly.
- **Comment Support**: Capture text context alongside user ratings.
- **Submission Cooldown**: Prevents spam by temporarily disabling inputs for 3 seconds after successfully submitting.
- **Persistent Storage**: Sentiments are securely stored in LocalStorage, surviving browser restarts.
- **Live Summary**: Instantly see total submission count, aggregated average scores, and the 3 latest text comments.
- **Light & Dark Mode**: Integrated native support for dynamic themes.
- **Validation and Error Management**: Forms prevent blank submissions without direct user action.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Component Library**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Testing**: [Vitest Browser Mode](https://vitest.dev/guide/browser/) with Playwright

## 🚀 Getting Started

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Create optimized production build:
   ```bash
   npm run build
   ```

### 🧪 Running Tests

This project employs robust **browser-based tests** using Vitest and Playwright to guarantee reliability directly in a realistic headless/headed browser environment.

Run frontend integration and unit tests via:
```bash
npm run test:browser
```

### 🧹 Linting

Ensure static analysis and coding styles stay clean:
```bash
npm run lint
```
