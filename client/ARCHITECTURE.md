# Food Truck Financial Platform - Architecture Documentation

## Overview

The Food Truck Financial Analysis Project (FTFA) is a comprehensive web application designed as an internal tool for the Food Trucks Association of Canada (FTAC). The platform enables food truck companies to manage their financial operations, track sales and expenses, monitor inventory, and analyze business performance through various analytics and reporting features.

## Technology Stack

### Core Technologies

- **Framework**: Next.js 15.0.2 (React 18.3.1)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Redux Toolkit 2.2.8 with Redux Persist
- **Routing**: Next.js App Router + React Router DOM
- **Authentication**: JWT (JSON Web Tokens)

### Key Libraries

- **UI Components**: Lucide React (icons), Framer Motion (animations)
- **Charts & Visualization**: Chart.js, React Chart.js 2, Recharts
- **HTTP Client**: Axios
- **Theme Management**: next-themes
- **Utility**: clsx (conditional classes)

## Project Structure

```
client/
├── src/
│   ├── app/                          # Next.js App Router directory
│   │   ├── (components)/             # Reusable components organized by feature
│   │   │   ├── Common/               # Shared utility components
│   │   │   ├── DashboardHomeComponents/     # Home dashboard specific components
│   │   │   ├── DashboardInventoryComponents/ # Inventory management components
│   │   │   ├── DashboardMenuComponents/     # Menu management components
│   │   │   ├── DashboardMetrics/           # Analytics & metrics components
│   │   │   ├── DashboardPurchasesComponents/ # Purchase tracking components
│   │   │   ├── DashboardSalesComponents/    # Sales tracking components
│   │   │   ├── DashboardSettingsComponents/ # Settings & configuration
│   │   │   ├── LandingPageComponents/       # Marketing landing page
│   │   │   ├── LoginComponents/            # Authentication components
│   │   │   ├── NavBar/                     # Navigation components
│   │   │   └── Sidebar/                    # Sidebar navigation
│   │   ├── dashboard/                # Dashboard pages & layouts
│   │   ├── login/                    # Authentication pages
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── state/                    # Redux store & API configuration
│   │   └── types/                    # TypeScript type definitions
│   ├── assets/                       # Static assets (images, icons)
│   └── pages/                        # Additional page components
├── public/                           # Public static files
└── Configuration files (package.json, tailwind.config.ts, etc.)
```

## Architecture Patterns

### 1. Component-Based Architecture

The application follows a modular component-based architecture with clear separation of concerns:

- **Page Components**: Handle routing and high-level layout
- **Feature Components**: Implement specific business functionality
- **Common Components**: Provide reusable UI elements
- **Layout Components**: Manage application structure and navigation

### 2. State Management Pattern

- **Redux Toolkit**: Centralized state management for global application state
- **Redux Persist**: State persistence across browser sessions
- **RTK Query**: API state management and caching
- **Local State**: Component-level state for UI interactions

### 3. Authentication Architecture

- **JWT-based Authentication**: Secure token-based authentication system
- **Protected Routes**: Route guards for authenticated access
- **Token Storage**: Secure token management with persistence

### 4. Responsive Design Pattern

- **Mobile-First**: Tailwind CSS mobile-first responsive design
- **Adaptive Layouts**: Components adapt to different screen sizes
- **Theme Support**: Light/dark mode toggle functionality

## Core Features & Modules

### 1. Landing Page Module

- **Purpose**: Marketing and user acquisition
- **Components**: Hero, Features, Product Showcase, FAQs, Contact
- **Features**:
  - Lazy loading for performance optimization
  - Responsive design
  - Dark theme support

### 2. Authentication Module

- **Login/Registration**: User account management
- **Password Recovery**: Forgot password functionality
- **Token Management**: JWT token handling and validation
- **Route Protection**: Authenticated route access control

### 3. Dashboard Module

The core business functionality is organized into specialized dashboard sections:

#### Home Dashboard

- **Overview Analytics**: Key performance indicators
- **Visual Charts**: Sales trends, revenue analysis
- **Quick Actions**: Common task shortcuts

#### Financial Management

- **Purchases**: Receipt scanning and expense tracking
- **Sales**: Revenue tracking and analysis
- **Budget**: Budget planning and monitoring
- **Metrics**: Financial performance analytics

#### Operations Management

- **Inventory**: Stock tracking and management
- **Menu**: Menu item management and pricing
- **Settings**: User preferences and configuration

### 4. Data Visualization Module

- **Chart Components**: Bar charts, area charts, radar charts
- **Dashboard Cards**: KPI displays and quick stats
- **Interactive Elements**: Filterable and sortable data views

## Data Models

### Core Business Entities

```typescript
// Receipt Management
interface Receipt {
  localReceiptId: number;
  location: string;
  completeDateTime: string;
  cost: string;
  details: ReceiptItem[];
}

// Sales Tracking
interface Sale {
  localSaleId: number;
  startDate: string;
  endDate: string;
  revenue: string;
  details: SaleItem[];
}

// Menu Management
interface MenuItem {
  id: number;
  name: string;
  price: number;
  ingredients: Ingredient[];
}

// Inventory Management
interface Ingredient {
  ingredient: string;
  quantity: number;
  units: string;
  price: string;
}
```

## Component Design Patterns

### 1. Compound Components Pattern

Used in complex UI components like modals and forms:

```tsx
// Form components work together as a compound
<FormLayout>
  <FormInput />
  <SubmitButton />
</FormLayout>
```

### 2. Higher-Order Component Pattern

Dashboard wrapper provides common layout and functionality:

```tsx
const DashboardWrapper = ({ children }) => {
  // Common dashboard logic
  return <div>{children}</div>;
};
```

### 3. Custom Hooks Pattern

Reusable logic encapsulation:

```tsx
// useEditable hook for inline editing functionality
const useEditable = () => {
  // Editable state logic
};
```

## Performance Optimizations

### 1. Code Splitting

- **Lazy Loading**: Landing page components are lazy-loaded
- **Dynamic Imports**: Reduces initial bundle size
- **Route-based Splitting**: Each dashboard section loads independently

### 2. Component Optimization

- **React.memo**: Prevents unnecessary re-renders
- **useMemo/useCallback**: Optimizes expensive calculations and event handlers
- **Component Virtualization**: For large data lists

### 3. State Management Optimization

- **Selective Updates**: Components subscribe only to relevant state slices
- **Normalized State**: Efficient data structure for complex entities
- **Persistent Storage**: Redux Persist for state hydration

## Security Considerations

### 1. Authentication Security

- **JWT Tokens**: Secure token-based authentication
- **Token Expiration**: Automatic session management
- **Route Protection**: Authenticated access control

### 2. Data Security

- **Input Validation**: Client-side and server-side validation
- **XSS Prevention**: Proper data sanitization
- **CSRF Protection**: Token-based request validation

## API Integration

### 1. RESTful API Pattern

- **Base URL Configuration**: Environment-based API endpoints
- **Axios Integration**: HTTP client with interceptors
- **Error Handling**: Centralized error management

### 2. RTK Query Pattern

- **API Slice**: Centralized API endpoint definitions
- **Caching Strategy**: Automatic response caching
- **Background Updates**: Optimistic updates and refetching

## Development Guidelines

### 1. Code Organization

- **Feature-based Structure**: Components grouped by functionality
- **Type Safety**: Comprehensive TypeScript usage
- **Consistent Naming**: Clear, descriptive component and file names

### 2. Styling Guidelines

- **Tailwind CSS**: Utility-first CSS framework
- **Component Variants**: Reusable style patterns
- **Responsive Design**: Mobile-first approach

### 3. Testing Strategy

- **Component Testing**: Unit tests for component functionality
- **Integration Testing**: Feature-level testing
- **E2E Testing**: User journey validation

## Deployment Architecture

### 1. Build Process

- **Next.js Build**: Optimized production builds
- **Static Generation**: Pre-rendered pages where applicable
- **Asset Optimization**: Image and bundle optimization

### 2. Environment Configuration

- **Environment Variables**: Configuration management
- **API Endpoints**: Environment-specific backend URLs
- **Feature Flags**: Conditional feature deployment

## Future Considerations

### 1. Scalability

- **Micro-frontend Architecture**: Component isolation for larger teams
- **Service Worker**: Offline functionality and caching
- **Progressive Web App**: Mobile app-like experience

### 2. Analytics & Monitoring

- **User Analytics**: Behavior tracking and insights
- **Performance Monitoring**: Application performance metrics
- **Error Tracking**: Automated error reporting and debugging

### 3. Enhanced Features

- **Real-time Updates**: WebSocket integration for live data
- **Advanced Reporting**: Enhanced analytics and business intelligence
- **Mobile Optimization**: Dedicated mobile experience

This architecture supports the current requirements while providing flexibility for future enhancements and scaling as the Food Truck Financial Platform grows.
