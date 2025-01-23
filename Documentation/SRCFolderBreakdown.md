├── /src
│   ├── /app
│   │   ├── /components
│   │   │   ├── DashboardHomeComponents       # Components for Dashboard Home
│   │   │   │   ├── areaData.tsx              # Contains mock data for weekly, monthly, and yearly sales volume and food items.
│   │   │   │   ├── DashAreaChart.tsx         # Displays an interactive area chart for sales volume with a timeframe dropdown.
│   │   │   │   ├── DashBarChart.tsx          # Renders a bar chart for monthly revenue with dark mode support.
│   │   │   │   ├── DashCardLong.tsx          # A long card component for displaying high-level metrics with styled decorative elements.
│   │   │   │   ├── DashCardSmall.tsx         # A compact card component with dynamic toggle buttons for weekly, monthly, and yearly data.
│   │   │   │   ├── FoodDistributionRadarChart.tsx # Displays a radar chart for food distribution quantities.
│   │   │   │   ├── FoodItemsModal.tsx        # A modal that lists detailed information about food items with profit/loss indicators.
│   │   │   │   ├── salesData.tsx             # Mock data for weekly, monthly, and yearly sales, used for chart visualizations.
│   │   │   │   ├── SalesOverview.tsx         # Renders a line chart to showcase sales trends over different timeframes.
│   │   │   ├── DashboardInventoryComponents  # Components for managing inventory
│   │   │   │   ├── AddInventoryItemModal.tsx # A modal component for adding new inventory items, with validation and API integration.
│   │   │   │   ├── InventoryApi.tsx          # Custom hooks for fetching, adding, and editing inventory data via API.
│   │   │   │   ├── InventoryData.tsx         # Contains mock inventory data for testing purposes.
│   │   │   │   ├── InventoryTable.tsx        # Main inventory table component with search, sorting, filtering, and pagination features.
│   │   │   │   ├── InventoryTableRow.tsx     # Component for rendering individual rows in the inventory table, supporting editing and deletion.
│   │   ├── /dashboard                        # Dashboard-specific components (structure placeholder)
│   │   ├── /hooks                            # Custom React hooks for state management and utilities
│   │   ├── /login                            # Login-related functionality (structure placeholder)
│   │   ├── /state                            # State management (e.g., Redux configuration)
│   │   ├── /types                            # Type definitions for TypeScript
│   │   ├── ClientWrapper.tsx                # Wrapper component for client-side rendering.
│   │   ├── globals.css                      # Global CSS file for styling.
│   │   ├── layout.tsx                       # Main layout component.
│   │   ├── page.tsx                         # Default page component.
│   │   ├── providers.tsx                    # Context providers for the application.
│   │   ├── redux.ts                         # Redux setup and configuration.
│   ├── /assets                              # Assets such as images
│   ├── /pages                               # Application pages (structure placeholder)
│   ├── .eslintrc.json                       # ESLint configuration file
│   ├── .gitignore                           # Specifies files to ignore in Git
│   ├── next-env.d.ts                        # TypeScript declarations for Next.js
│   ├── next.config.mjs                      # Next.js configuration
│   ├── package-lock.json                    # Dependency lock file
│   ├── package.json                         # Project dependencies and scripts
│   ├── postcss.config.mjs                   # PostCSS configuration
│   ├── README.md                            # Project documentation
│   ├── tailwind.config.ts                   # Tailwind CSS configuration
│   ├── tsconfig.json                        # TypeScript configuration
├── /server                                  # Server-side code
│   ├── .gitignore                           # Specifies files to ignore in server
│   └── package-lock.json                    # Dependency lock file for the server
└── README.md                                # Server documentation
