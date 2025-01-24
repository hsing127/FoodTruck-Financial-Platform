├── /src
│   ├── /app
│   │   ├── /components
│   |   │   ├── /Common
│   │   │   │   ├── EditableCell.tsx            # Reusable component for editable table cells.
│   │   │   │   ├── ActionButtons.tsx                # Action buttons for rows (edit, save, delete, etc.).
│   │   │   │   ├── ContextMenu.tsx                  # Context menu for row actions (edit, delete, duplicate).
│   │   │   │   ├── ConfirmModal.tsx                 # Modal for confirming deletion actions.
│   │   │   │   ├── Pagination.tsx                   # Pagination component for tables.
│   │   │   │   ├── SearchInput.tsx                  # Search input with actions like sorting and filtering.
│   │   │   │   ├── UploadLogic.tsx                  # Logic for handling file uploads (images, documents, spreadsheets).
│   │   │   │   ├── SortingLogic.tsx                 # Hook for implementing sorting logic.
│   │   │   │   ├── Animations.tsx                   # Framer Motion animation variants for various UI components.
│   │   │   ├── DashboardHomeComponents         # Components for Dashboard Home
│   │   │   │   ├── areaData.tsx                     # Contains mock data for weekly, monthly, and yearly sales volume and food items.
│   │   │   │   ├── DashAreaChart.tsx                # Displays an interactive area chart for sales volume with a timeframe dropdown.
│   │   │   │   ├── DashBarChart.tsx                 # Renders a bar chart for monthly revenue with dark mode support.
│   │   │   │   ├── DashCardLong.tsx                 # A long card component for displaying high-level metrics with styled decorative elements.
│   │   │   │   ├── DashCardSmall.tsx                # A compact card component with dynamic toggle buttons for weekly, monthly, and yearly data.
│   │   │   │   ├── FoodDistributionRadarChart.tsx   # Displays a radar chart for food distribution quantities.
│   │   │   │   ├── FoodItemsModal.tsx               # A modal that lists detailed information about food items with profit/loss indicators.
│   │   │   │   ├── salesData.tsx                    # Mock data for weekly, monthly, and yearly sales, used for chart visualizations.
│   │   │   │   ├── SalesOverview.tsx                # Renders a line chart to showcase sales trends over different timeframes.
│   │   │   ├── DashboardInventoryComponents    # Components for Dashboard Inventory
│   │   │   │   ├── AddInventoryItemModal.tsx        # Modal for adding new inventory items.
│   │   │   │   ├── InventoryAPI.tsx                 # API logic for CRUD operations on inventory.
│   │   │   │   ├── InventoryDetails.tsx             # Details table for inventory items.
│   │   │   │   ├── InventoryDetailsRow.tsx          # Editable row component for inventory details.
│   │   │   │   ├── InventoryTable.tsx               # Main table interface for inventory management.
│   │   │   │   ├── InventoryTableRow.tsx            # Row component for individual inventory items.
│   │   │   │   ├── INVENTORY_DATA.tsx               # Mock data for inventory items.
│   │   │   ├── DashboardMenuComponents         # Components for Dashboard Menu
│   │   │   │   ├── AddMenuItemModal.tsx             # Modal for adding new menu items.
│   │   │   │   ├── IngredientTable.tsx              # Table for managing ingredients in menu items.
│   │   │   │   ├── IngredientRow.tsx                # Editable row for individual ingredients.
│   │   │   │   ├── MenuAPI.tsx                      # API logic for menu data, including ingredients and menu items.
│   │   │   │   ├── MenuCard.tsx                     # Card component displaying individual menu items with actions.
│   │   │   │   ├── MenuTable.tsx                    # Main table interface for viewing and managing menu items.
│   │   │   │   ├── ViewMenuItemDetailsModal.tsx     # Modal for viewing and editing menu item details.
│   │   │   │   ├── MENU_DATA.tsx                    # Mock data for menu items and their details.
│   │   │   ├── DashboardPurchasesComponents    # Components for Dashboard Purchases
│   │   │   │   ├── AddReceiptEntryModal.tsx         # Modal for adding new receipts.
│   │   │   │   ├── AddReceiptIngredientRow.tsx      # Row component for adding receipt details.
│   │   │   │   ├── ReceiptAPI.tsx                   # API logic for CRUD operations on receipts.
│   │   │   │   ├── ReceiptDetails.tsx               # Details table for individual receipt items.
│   │   │   │   ├── ReceiptDetailsRow.tsx            # Editable row component for receipt details.
│   │   │   │   ├── ReceiptTable.tsx                 # Main table interface for receipts.
│   │   │   │   ├── ReceiptTableRow.tsx              # Row component for individual receipts.
│   │   │   │   ├── RECEIPT_DATA.tsx                 # Mock data for receipts and their details.
│   │   │   ├── DashboardSalesComponents        # Components for Dashboard Sales Management
│   │   │   │   ├── AddSaleEntryModal.tsx            # Modal for adding a new sale entry, with menu item details.
│   │   │   │   ├── AddSaleMenuItemRow.tsx           # Row component for adding/editing menu items in the sale entry.
│   │   │   │   ├── SaleDetails.tsx                  # Component for displaying and managing sale item details.
│   │   │   │   ├── SaleDetailsRow.tsx               # Editable row component for each sale item in the details view.
│   │   │   │   ├── SaleTable.tsx                    # Main table interface for managing sales, including pagination and filtering.
│   │   │   │   ├── SaleTableRow.tsx                 # Row component for individual sales, with expandable details and context menu.
│   │   │   │   ├── SalesAPI.tsx                     # API logic for fetching, adding, editing, and deleting sales and sale items.
│   │   │   │   ├── SALE_DATA.tsx                    # Mock data for sales and associated menu items for development/testing.
│   │   ├── /dashboard                          # Dashboard-specific components (structure placeholder)
│   │   ├── /hooks                              # Custom React hooks for state management and utilities
│   │   ├── /login                              # Login-related functionality (structure placeholder)
│   │   ├── /state                              # State management (e.g., Redux configuration)
│   │   ├── /types                              # Type definitions for TypeScript
│   │   ├── ClientWrapper.tsx                  # Wrapper component for client-side rendering.
│   │   ├── globals.css                        # Global CSS file for styling.
│   │   ├── layout.tsx                         # Main layout component.
│   │   ├── page.tsx                           # Default page component.
│   │   ├── providers.tsx                      # Context providers for the application.
│   │   ├── redux.ts                           # Redux setup and configuration.
│   ├── /assets                                # Assets such as images
│   ├── /pages                                 # Application pages (structure placeholder)
│   ├── .eslintrc.json                         # ESLint configuration file
│   ├── .gitignore                             # Specifies files to ignore in Git
│   ├── next-env.d.ts                          # TypeScript declarations for Next.js
│   ├── next.config.mjs                        # Next.js configuration
│   ├── package-lock.json                      # Dependency lock file
│   ├── package.json                           # Project dependencies and scripts
│   ├── postcss.config.mjs                     # PostCSS configuration
│   ├── README.md                              # Project documentation
│   ├── tailwind.config.ts                     # Tailwind CSS configuration
│   ├── tsconfig.json                          # TypeScript configuration
├── /server                                    # Server-side code
│   ├── .gitignore                             # Specifies files to ignore in server
│   └── package-lock.json                      # Dependency lock file for the server
└── README.md                                  # Server documentation
