# Food Truck Financial Platform - Developer Guide

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Git

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd FoodTruck-Financial-Platform/client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code analysis

## Development Workflow

### Component Development

1. **Create new components** in the appropriate feature directory under `src/app/(components)/`
2. **Follow naming conventions**: PascalCase for components, camelCase for utilities
3. **Use TypeScript** for all new code with proper type definitions
4. **Implement responsive design** using Tailwind CSS classes

### State Management

1. **Global State**: Use Redux Toolkit for application-wide state
2. **Local State**: Use React hooks for component-specific state
3. **API State**: Use RTK Query for server state management

### Adding New Dashboard Pages

1. Create page component in `src/app/dashboard/`
2. Add corresponding route in `src/pages/dashboard/`
3. Update sidebar navigation in `Sidebar.tsx`
4. Implement using `DashboardWrapper` layout

Example:

```tsx
// src/app/dashboard/DashboardNewFeature.tsx
import React from "react";
import DashboardLayout from "./DashboardWrapper";

export const DashboardNewFeature: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1>New Feature</h1>
        {/* Feature content */}
      </div>
    </DashboardLayout>
  );
};
```

### Authentication Integration

1. **Protected Routes**: Wrap components with authentication checks
2. **Token Management**: Use `tokenAuth.tsx` utilities for token handling
3. **User State**: Store user information in Redux global state

### API Integration

1. **Define API endpoints** in `src/app/state/api.ts`
2. **Use RTK Query** for data fetching and caching
3. **Handle errors** with proper user feedback

Example:

```tsx
// Add new API endpoint
export const api = createApi({
  // ... existing config
  endpoints: (build) => ({
    getNewData: build.query<DataType, void>({
      query: () => "new-endpoint",
    }),
  }),
});
```

## Code Standards

### TypeScript Guidelines

1. **Define interfaces** for all data structures in `src/app/types/types.tsx`
2. **Use strict typing** - avoid `any` type
3. **Export types** for reuse across components

### Component Structure

```tsx
// Component template
import React, { useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux";

interface ComponentProps {
  // Define props with proper types
}

const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State declarations
  const [localState, setLocalState] = useState("");

  // Redux hooks
  const globalState = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  // Event handlers
  const handleAction = useCallback(() => {
    // Handler logic
  }, []);

  return <div className="component-container">{/* Component JSX */}</div>;
};

export default ComponentName;
```

### Styling Guidelines

1. **Use Tailwind CSS** for all styling
2. **Follow mobile-first** responsive design principles
3. **Create reusable style patterns** using component variants
4. **Support dark mode** using theme-aware classes

### File Organization

```
src/app/(components)/FeatureName/
├── index.tsx              # Main component
├── ComponentA.tsx         # Sub-components
├── ComponentB.tsx
├── types.ts              # Feature-specific types
└── utils.ts              # Feature utilities
```

## Common Patterns

### 1. Data Fetching Pattern

```tsx
const { data, isLoading, error } = useGetDataQuery();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <DataDisplay data={data} />;
```

### 2. Form Handling Pattern

```tsx
const [formData, setFormData] = useState(initialState);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await submitData(formData);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### 3. Modal Pattern

```tsx
const [isModalOpen, setIsModalOpen] = useState(false);

const toggleModal = useCallback(() => {
  setIsModalOpen((prev) => !prev);
}, []);
```

## Performance Best Practices

### 1. Component Optimization

- Use `React.memo` for expensive components
- Implement `useCallback` for event handlers
- Use `useMemo` for expensive calculations

### 2. Bundle Optimization

- Implement lazy loading for large components
- Use dynamic imports for code splitting
- Optimize images and assets

### 3. State Optimization

- Normalize complex state structures
- Use selectors for derived state
- Implement proper cache invalidation

## Testing Guidelines

### Unit Testing

```tsx
// Component test example
import { render, screen } from "@testing-library/react";
import Component from "./Component";

test("renders component correctly", () => {
  render(<Component />);
  expect(screen.getByText("Expected Text")).toBeInTheDocument();
});
```

### Integration Testing

- Test feature workflows end-to-end
- Mock API calls appropriately
- Test user interactions and state changes

## Debugging Tips

### 1. Redux DevTools

- Install Redux DevTools browser extension
- Monitor state changes and time-travel debugging
- Track action dispatches and state updates

### 2. React Developer Tools

- Inspect component hierarchy and props
- Profile component performance
- Debug React hooks and state

### 3. Network Debugging

- Use browser DevTools Network tab
- Monitor API calls and responses
- Check for CORS and authentication issues

## Deployment

### Development Deployment

```bash
npm run build
npm run start
```

### Production Considerations

1. **Environment Variables**: Set production API URLs
2. **Performance**: Enable compression and caching
3. **Security**: Configure HTTPS and security headers
4. **Monitoring**: Set up error tracking and analytics

## Common Issues & Solutions

### 1. CORS Issues

- Configure backend CORS settings
- Check API endpoint URLs
- Verify authentication headers

### 2. State Persistence Issues

- Clear localStorage/sessionStorage if needed
- Check Redux Persist configuration
- Verify state shape compatibility

### 3. Styling Issues

- Check Tailwind CSS configuration
- Verify responsive breakpoints
- Test dark mode compatibility

### 4. Authentication Issues

- Verify JWT token format and expiration
- Check token storage and retrieval
- Test protected route access

## Contributing Guidelines

1. **Create feature branches** from main/develop
2. **Follow commit conventions**: Clear, descriptive commit messages
3. **Test thoroughly** before submitting PRs
4. **Update documentation** for new features
5. **Follow code review process** and address feedback

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Support

For development questions and issues:

1. Check existing documentation and code examples
2. Search for similar issues in the project
3. Consult team members or maintainers
4. Document solutions for future reference
