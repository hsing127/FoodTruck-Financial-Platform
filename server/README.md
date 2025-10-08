# FoodTruck Financial Platform - Server

A comprehensive Express.js server application that migrates all Lambda functions from the original serverless architecture to a structured MVC pattern.

## 🚀 Migration Complete

All 30+ Lambda functions from the `Documentation/` folder have been successfully migrated to a structured Express.js MVC architecture:

### 📁 Migrated Lambda Categories

All 30+ Lambda functions from the `Documentation/` folder have been successfully migrated to a structured Express.js MVC architecture:

1. **Authentication & Security** - Login, signup, password reset, token validation
2. **File Management** - Upload, download, delete, archive file operations
3. **Data Operations** - Database population, data display, row management
4. **Menu Management** - Menu population and management
5. **Inventory Management** - Inventory tracking and updates
6. **Sales Management** - Sales data processing and analytics
7. **Purchase Management** - Purchase tracking and reporting
8. **Reports & Analytics** - Financial reports and metric calculations
9. **OCR & Text Processing** - AWS Textract integration for receipt processing
10. **User Profile** - Profile management and user data
11. **Email Services** - SES integration for notifications and alerts

## 🏗️ Architecture

### MVC Structure

```
server/src/
├── config/
│   ├── database.ts          # Prisma configuration & connection management
│   ├── aws.ts               # AWS services configuration (S3, SES, Textract)
│   └── validation.ts        # Zod validation schemas & middleware
├── lib/
│   └── aws/
│       ├── s3.ts            # S3 service class for file operations
│       ├── ses.ts           # SES service class for email operations
│       └── textract.ts      # Textract service class for OCR operations
├── middleware/
│   ├── auth.ts              # JWT authentication middleware
│   ├── validation.ts        # Request validation middleware
│   └── errorHandler.ts      # Global error handling middleware
├── models/
│   └── index.ts             # Data models & interfaces (complements Prisma)
├── services/
│   ├── authService.ts       # Authentication business logic
│   ├── fileService.ts       # File operations (legacy)
│   ├── fileServiceV2.ts     # Enhanced file operations with S3
│   ├── dataService.ts       # Database operations
│   ├── menuService.ts       # Menu management
│   ├── inventoryService.ts  # Inventory tracking
│   ├── salesService.ts      # Sales processing
│   ├── purchaseService.ts   # Purchase management
│   ├── reportsService.ts    # Analytics & reporting
│   ├── ocrService.ts        # AWS Textract integration
│   └── emailService.ts      # Email operations with SES
├── controllers/
│   ├── authController.ts    # Auth HTTP handlers
│   ├── fileController.ts    # File HTTP handlers
│   ├── dataController.ts    # Data HTTP handlers
│   ├── menuController.ts    # Menu HTTP handlers
│   ├── inventoryController.ts
│   ├── salesController.ts
│   ├── purchaseController.ts
│   ├── reportsController.ts
│   └── ocrController.ts
├── routes/
│   ├── index.ts             # Main route aggregator with API docs
│   ├── authRoutes.ts        # Authentication routes
│   ├── fileRoutes.ts        # File management routes
│   ├── dataRoutes.ts        # Data operation routes
│   ├── menuRoutes.ts        # Menu routes
│   ├── inventoryRoutes.ts   # Inventory routes
│   ├── salesRoutes.ts       # Sales routes
│   ├── purchaseRoutes.ts    # Purchase routes
│   ├── reportsRoutes.ts     # Reports routes
│   └── ocrRoutes.ts         # OCR routes
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   ├── index.ts             # Utility exports
│   ├── auth.ts              # Authentication utilities
│   ├── helpers.ts           # General helper functions
│   └── calculations.ts      # Business calculation utilities
└── index.ts                 # Main server file
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (local development)
- AWS Account (for S3, SES, Textract)

### Installation Steps

1. **Install Dependencies**

   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Database Setup**

   ```bash
   # Create local PostgreSQL database
   createdb foodtruck_db

   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed initial data
   npm run seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

See `.env.example` for complete configuration options:

- **Database**: PostgreSQL connection string
- **JWT**: Secret key and expiration settings
- **AWS**: Access keys, S3 bucket, SES configuration
- **Security**: CORS origins, file upload limits

### AWS Services Required

- **S3**: File storage for receipts and documents
- **SES**: Email service for notifications
- **Textract**: OCR processing for receipts

## 📚 API Documentation

### Available Endpoints

#### Authentication (`/auth`)

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset confirmation
- `POST /auth/verify-code` - Email verification
- `GET /auth/profile` - Get user profile
- `POST /auth/validate-token` - Token validation

#### File Management (`/files`)

- `POST /files/upload` - Upload file to S3
- `GET /files/:fileId` - Retrieve file
- `DELETE /files/:fileId` - Delete file
- `POST /files/archive` - Archive file
- `GET /files/user/:userId` - List user files

#### Data Operations (`/data`)

- `GET /data/display` - Display data with pagination
- `POST /data/populate` - Populate database
- `DELETE /data/row/:id` - Delete specific row
- `PUT /data/update` - Update table data

#### Menu Management (`/menu`)

- `GET /menu` - Get menu items
- `POST /menu` - Create menu item
- `PUT /menu/:id` - Update menu item
- `DELETE /menu/:id` - Delete menu item

#### Inventory (`/inventory`)

- `GET /inventory` - Get inventory items
- `POST /inventory` - Add inventory item
- `PUT /inventory/:id` - Update inventory
- `DELETE /inventory/:id` - Remove inventory

#### Sales (`/sales`)

- `GET /sales` - Get sales data
- `POST /sales` - Record sale
- `GET /sales/analytics` - Sales analytics

#### Purchases (`/purchases`)

- `GET /purchases` - Get purchase history
- `POST /purchases` - Record purchase
- `GET /purchases/analytics` - Purchase analytics

#### Reports (`/reports`)

- `GET /reports/financial` - Financial reports
- `GET /reports/metrics` - Key metrics
- `GET /reports/custom` - Custom report generation

#### OCR Processing (`/ocr`)

- `POST /ocr/process` - Process receipt with Textract
- `GET /ocr/results/:jobId` - Get OCR results

### API Documentation Interface

Visit `http://localhost:3001/api` when server is running for interactive API documentation.

## 🏃‍♂️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run seed` - Seed database with initial data

### Development Workflow

1. Make changes to controllers/services/routes
2. Server automatically reloads with nodemon
3. Test endpoints using the API documentation
4. Run database migrations as needed

## 🚀 Deployment

### Production Considerations

- Set `NODE_ENV=production`
- Configure AWS RDS for database
- Set up proper CORS origins
- Configure AWS IAM roles for S3/SES/Textract
- Use environment variables for all secrets
- Set up monitoring and logging

### Docker Support (Optional)

A Dockerfile can be added for containerized deployment.

## 🧪 Testing

Testing setup is pending - framework to be determined based on team preferences.

## 📝 Migration Notes

### What Was Migrated

- ✅ All authentication Lambda functions → AuthService + EmailService
- ✅ File upload/download operations → FileServiceV2 + S3Service
- ✅ Database CRUD operations → DataService + enhanced Prisma integration
- ✅ AWS S3 integration → Dedicated S3Service class with comprehensive file management
- ✅ AWS SES email service → SESService + EmailService with templates
- ✅ AWS Textract OCR processing → TextractService with receipt parsing
- ✅ User profile management → Enhanced AuthService with profile operations
- ✅ Menu, inventory, sales, purchase management → Dedicated service classes
- ✅ Reporting and analytics → ReportsService with business calculations
- ✅ Data validation and error handling → Zod schemas + comprehensive middleware

### Architecture Improvements

- 🔧 Structured MVC pattern with clear separation of concerns
- 🔧 Type safety with comprehensive TypeScript interfaces
- 🔧 Centralized error handling with Prisma-specific error mapping
- 🔧 Request validation with Zod schemas and middleware
- 🔧 Database abstraction with Prisma ORM and connection management
- 🔧 Environment-based configuration with AWS service health checks
- 🔧 Comprehensive logging and security middleware
- 🔧 Utility functions for auth, calculations, and helpers
- 🔧 AWS service abstraction with dedicated lib classes
- 🔧 Email templating system with SES integration
- 🔧 File storage with S3 presigned URLs and metadata management
- 🔧 OCR data extraction with structured receipt parsing

## 🤝 Contributing

1. Follow the established MVC pattern
2. Add proper TypeScript types
3. Include request validation
4. Update API documentation
5. Test thoroughly before committing

## 📞 Support

For questions about the migration or server setup, please refer to the original Lambda function documentation in the `Documentation/` folder for business logic reference.
