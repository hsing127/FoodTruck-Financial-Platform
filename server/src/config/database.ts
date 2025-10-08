import { PrismaClient } from "@prisma/client";

// Database configuration based on environment
const getDatabaseConfig = () => {
  const nodeEnv = process.env.NODE_ENV || "development";

  const config = {
    development: {
      log: ["query", "info", "warn", "error"] as const,
    },

    production: {
      log: ["error"] as const,
      // Production-optimized connection pool
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    },

    test: {
      log: ["error"] as const,
    },
  };

  return config[nodeEnv as keyof typeof config] || config.development;
};

// Single Prisma instance with environment-based config
export const prisma = new PrismaClient({
  log: getDatabaseConfig().log,
});

// Connection management
export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log(`✅ Database connected successfully (${process.env.NODE_ENV})`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  await prisma.$disconnect();
  console.log("Database disconnected");
};
