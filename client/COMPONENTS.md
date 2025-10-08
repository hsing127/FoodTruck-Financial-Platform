# Food Truck Financial Platform - Component Documentation

## Component Architecture Overview

The application follows a feature-based component organization pattern, with reusable components grouped by functionality and purpose.

## Core Layout Components

### DashboardWrapper

**Location**: `src/app/dashboard/DashboardWrapper.tsx`

Central layout component that provides consistent structure for all dashboard pages.

**Features**:

- Responsive sidebar integration
- Dark/light theme support
- Global state management for UI preferences
- Automatic layout adjustment based on sidebar state

**Usage**:

```tsx
import DashboardLayout from "./DashboardWrapper";

const DashboardPage = () => (
  <DashboardLayout>
    <PageContent />
  </DashboardLayout>
);
```

### Sidebar

**Location**: `src/app/(components)/Sidebar/Sidebar.tsx`

Collapsible navigation sidebar with animated transitions.

**Features**:

- Animated collapse/expand functionality
- Active route highlighting
- Icon-based navigation with labels
- Responsive design with overflow handling
- Framer Motion animations

**Navigation Structure**:

- Dashboard (Home)
- Purchases
- Sales
- Menu
- Inventory
- Metrics
- Budget
- Settings
- Logout

## Common Utility Components

### ActionButtons

**Location**: `src/app/(components)/Common/ActionButtons.tsx`

Reusable button components with consistent styling and behavior.

### Pagination

**Location**: `src/app/(components)/Common/Pagination.tsx`

Handles data pagination across tables and lists.

### SearchInput

**Location**: `src/app/(components)/Common/SearchInput.tsx`

Standardized search input component with filtering capabilities.

### ConfirmModal

**Location**: `src/app/(components)/Common/ConfirmModal.tsx`

Modal component for user action confirmations.

### Dropdown

**Location**: `src/app/(components)/Common/Dropdown.tsx`

Customizable dropdown component for selections.

### EditableCell

**Location**: `src/app/(components)/Common/EditableCell.tsx`

Inline editing functionality for table cells.

## Dashboard Feature Components

### Home Dashboard Components

**Location**: `src/app/(components)/DashboardHomeComponents/`

#### DashAreaChart

Real-time area chart visualization for trend analysis.

#### DashBarChart

Bar chart component for comparative data visualization.

#### DashCardLong & DashCardSmall

Dashboard card components for displaying KPIs and metrics.

#### FoodDistributionRadarChart

Specialized radar chart for food distribution analysis.

#### SalesOverview

Comprehensive sales analytics display component.

### Inventory Management Components

**Location**: `src/app/(components)/DashboardInventoryComponents/`

Components for inventory tracking, stock management, and supply chain visualization.

### Menu Management Components

**Location**: `src/app/(components)/DashboardMenuComponents/`

Components for menu item management, pricing, and recipe handling.

### Sales Components

**Location**: `src/app/(components)/DashboardSalesComponents/`

Sales tracking, revenue analysis, and transaction management components.

### Purchase Components

**Location**: `src/app/(components)/DashboardPurchasesComponents/`

Components for expense tracking, receipt management, and purchase analytics.

### Settings Components

**Location**: `src/app/(components)/DashboardSettingsComponents/`

User preferences, system configuration, and account management components.

## Authentication Components

### FormLayout

**Location**: `src/app/(components)/LoginComponents/formLayout.tsx`

Wrapper component providing consistent styling for authentication forms.

### FormInput

**Location**: `src/app/(components)/LoginComponents/formInput.tsx`

Standardized input component with validation styling.

### SubmitButton

**Location**: `src/app/(components)/LoginComponents/submitButton.tsx`

Submit button with loading states and disabled functionality.

## Landing Page Components

### Hero

Marketing hero section with call-to-action elements.

### Features

Product feature showcase with icons and descriptions.

### ProductShowcase

Interactive product demonstration section.

### FAQs

Frequently asked questions with expandable sections.

### ContactUs

Contact form and company information display.

### Footer

Site footer with links and company information.

### Navbar

Main navigation for the landing page.

## Component Design Patterns

### 1. Compound Component Pattern

Used for complex components that work together:

```tsx
// Form components working as a compound
<FormLayout>
  <FormInput
    type="email"
    placeholder="Email"
    value={email}
    onChange={setEmail}
  />
  <FormInput
    type="password"
    placeholder="Password"
    value={password}
    onChange={setPassword}
  />
  <SubmitButton isLoading={isSubmitting} text="Login" />
</FormLayout>
```

### 2. Render Props Pattern

Used for sharing logic between components:

```tsx
<EditableCell
  value={cellValue}
  render={({ isEditing, value, handleSave }) =>
    isEditing ? (
      <input value={value} onBlur={handleSave} />
    ) : (
      <span onClick={handleEdit}>{value}</span>
    )
  }
/>
```

### 3. Higher-Order Component Pattern

Used for cross-cutting concerns like authentication:

```tsx
const withAuth = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = useAppSelector(
      (state) => state.auth.isAuthenticated
    );

    if (!isAuthenticated) {
      return <LoginPage />;
    }

    return <WrappedComponent {...props} />;
  };
};
```

## State Management in Components

### Local State

Components use React hooks for local UI state:

```tsx
const [isModalOpen, setIsModalOpen] = useState(false);
const [formData, setFormData] = useState(initialData);
const [isLoading, setIsLoading] = useState(false);
```

### Global State

Components connect to Redux store for shared state:

```tsx
const dispatch = useAppDispatch();
const isSidebarCollapsed = useAppSelector(
  (state) => state.global.isSidebarCollapsed
);
const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
```

### API State

Components use RTK Query for server state:

```tsx
const { data, isLoading, error } = useGetInventoryQuery();
const [updateItem] = useUpdateInventoryItemMutation();
```

## Component Performance Optimization

### 1. Memoization

Components use React.memo to prevent unnecessary re-renders:

```tsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  // Component implementation
});
```

### 2. Callback Optimization

Event handlers are optimized with useCallback:

```tsx
const handleItemClick = useCallback(
  (itemId) => {
    dispatch(selectItem(itemId));
  },
  [dispatch]
);
```

### 3. Computed Values

Expensive calculations are memoized:

```tsx
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.date.localeCompare(b.date));
}, [data]);
```

## Responsive Design Patterns

Components use Tailwind CSS for responsive behavior:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid layout */}
</div>

<div className="hidden md:block">
  {/* Desktop only content */}
</div>

<div className="block md:hidden">
  {/* Mobile only content */}
</div>
```

## Animation Patterns

Components use Framer Motion for smooth animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {content}
</motion.div>
```

## Accessibility Features

Components implement accessibility best practices:

```tsx
<button
  aria-label="Close modal"
  aria-expanded={isModalOpen}
  onClick={handleClose}
>
  <CloseIcon aria-hidden="true" />
</button>

<input
  aria-describedby="email-error"
  aria-invalid={hasError}
  type="email"
/>
{hasError && (
  <div id="email-error" role="alert">
    Please enter a valid email address
  </div>
)}
```

## Error Handling Patterns

Components implement error boundaries and graceful degradation:

```tsx
const ComponentWithError = () => {
  const { data, error, isLoading } = useQuery();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;

  return <DataDisplay data={data} />;
};
```

## Component Testing Patterns

Components are designed for testability:

```tsx
// Testable component structure
const TestableComponent = ({ onAction, data, testId }) => (
  <div data-testid={testId}>
    <button onClick={() => onAction(data.id)}>Action</button>
  </div>
);

// Test example
test("calls onAction with correct id", () => {
  const mockAction = jest.fn();
  render(
    <TestableComponent
      data={{ id: "123" }}
      onAction={mockAction}
      testId="test-component"
    />
  );

  fireEvent.click(screen.getByRole("button"));
  expect(mockAction).toHaveBeenCalledWith("123");
});
```

## Component Documentation Standards

Each component should include:

1. **Purpose**: Clear description of component functionality
2. **Props Interface**: TypeScript interface with prop descriptions
3. **Usage Examples**: Code examples showing typical usage
4. **Accessibility Notes**: ARIA labels and keyboard navigation support
5. **Performance Considerations**: Optimization techniques used

This component architecture provides a scalable, maintainable foundation for the Food Truck Financial Platform while ensuring consistency and reusability across the application.
