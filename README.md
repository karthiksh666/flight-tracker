# Flight Lookup App

A premium, Next.js-based flight tracking application that allows users to search for flight details using flight numbers. It features a modern dark-mode UI, real-time data integration (via Aviationstack), and Google Calendar support.

## 📂 Project Structure & File Explanation

Here is a detailed breakdown of every file in the source code:

### Core Application (`src/app`)
- **`page.tsx`**: The main entry point of the application. It contains the search form logic, state management (loading, results, errors), and renders the `FlightCard` components.
- **`layout.tsx`**: The root layout that wraps the entire application. It handles global font settings (Inter) and metadata.
- **`globals.css`**: Contains all global styles, CSS variables for the theme (colors, fonts), and utility classes for the premium glassmorphism design.
- **`api/flights/route.ts`**: The backend API route handler.
    - It first attempts to fetch real data from the **Aviationstack API**.
    - If the API fails or returns no data, it gracefully falls back to a **Mock Data** set for demonstration purposes.
    - It handles data mapping from the external API format to our internal `Flight` interface.

### Components (`src/components`)
- **`FlightCard.tsx`**: A reusable UI component that displays a single flight's details.
    - Shows origin, destination, times, status (On Time/Delayed), and gate info.
    - Includes the "Add to Calendar" button logic.

### Libraries & Utilities (`src/lib`)
- **`aviationstack.ts`**: Contains the logic for making HTTP requests to the Aviationstack API. It handles the API key and URL construction.
- **`calendar.ts`**: A utility function `generateGoogleCalendarUrl` that takes flight data and generates a direct link to create a Google Calendar event.

### Types (`src/types`)
- **`aviationstack.ts`**: TypeScript interfaces defining the shape of the response expected from the Aviationstack API. This ensures type safety across the app.

---

## 🚀 CI/CD Setup (Continuous Integration / Continuous Deployment)

CI/CD allows you to automatically test and deploy your application whenever you make changes. We recommend using **GitHub Actions**.

### How it works
1.  **CI (Continuous Integration)**: Every time you push code, a "workflow" runs to check for errors (Linting) and verify the build succeeds.
2.  **CD (Continuous Deployment)**: If the CI passes, the code is automatically deployed to Vercel (configured via Vercel's dashboard).

### Setting up the CI Pipeline

I have created a workflow file for you at `.github/workflows/ci.yml`. Here is what it does:

1.  **Trigger**: Runs on every push to the `main` branch or pull requests.
2.  **Job**:
    - Checks out your code.
    - Installs dependencies (`npm ci`).
    - Runs Linting (`npm run lint`) to catch code style issues.
    - Runs the Build (`npm run build`) to ensure the app compiles correctly.

### How to Enable
1.  Initialize a git repository (if you haven't):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Push to GitHub.
3.  Go to the **Actions** tab in your GitHub repository to see the workflow running!

## 🛠 Local Development

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Set up Environment Variables**:
    Create a `.env.local` file in the root:
    ```env
    AVIATIONSTACK_API_KEY=your_api_key_here
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000).
