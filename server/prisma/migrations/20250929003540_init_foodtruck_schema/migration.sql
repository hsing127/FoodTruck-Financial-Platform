-- AlterTable
ALTER TABLE "public"."Sale" ADD COLUMN     "HoursOpened" DECIMAL(8,2),
ADD COLUMN     "OpenLocation" VARCHAR(50),
ADD COLUMN     "Weather" VARCHAR(50);

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "Province" VARCHAR(50);

-- CreateTable
CREATE TABLE "public"."Code" (
    "Email" VARCHAR(50) NOT NULL,
    "ExpireAt" TIMESTAMPTZ NOT NULL,
    "Code" INTEGER NOT NULL,
    "Used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("Email")
);

-- CreateTable
CREATE TABLE "public"."OtherCost" (
    "Email" VARCHAR(50) NOT NULL,
    "CostDate" DATE NOT NULL,
    "CostName" VARCHAR(50) NOT NULL,
    "CostCategory" VARCHAR(50) NOT NULL,
    "Cost" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "OtherCost_pkey" PRIMARY KEY ("Email","CostDate","CostName")
);

-- CreateIndex
CREATE UNIQUE INDEX "OtherCost_Email_CostDate_CostName_key" ON "public"."OtherCost"("Email", "CostDate", "CostName");

-- AddForeignKey
ALTER TABLE "public"."Code" ADD CONSTRAINT "Code_Email_fkey" FOREIGN KEY ("Email") REFERENCES "public"."User"("Email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OtherCost" ADD CONSTRAINT "OtherCost_Email_fkey" FOREIGN KEY ("Email") REFERENCES "public"."User"("Email") ON DELETE CASCADE ON UPDATE CASCADE;
