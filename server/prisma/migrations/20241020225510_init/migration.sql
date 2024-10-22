-- CreateTable
CREATE TABLE "User" (
    "Email" VARCHAR(50) NOT NULL,
    "Password" VARCHAR(100) NOT NULL,
    "BusinessName" VARCHAR(50),

    CONSTRAINT "User_pkey" PRIMARY KEY ("Email")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "Email" VARCHAR(50) NOT NULL,
    "DateTime" TIMESTAMP(6) NOT NULL,
    "Location" VARCHAR(50) NOT NULL,
    "Cost" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("Email","DateTime","Location")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "Email" VARCHAR(50) NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "Amount" DECIMAL(8,2) NOT NULL,
    "AmountUnits" VARCHAR(10) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("Email","Name")
);

-- CreateTable
CREATE TABLE "Includes" (
    "Email" VARCHAR(50) NOT NULL,
    "DateTime" TIMESTAMP(6) NOT NULL,
    "Location" VARCHAR(50) NOT NULL,
    "IngredientName" VARCHAR(50) NOT NULL,
    "Price" DECIMAL(8,2) NOT NULL,
    "Amount" DECIMAL(8,2) NOT NULL,
    "AmountUnits" VARCHAR(10) NOT NULL,

    CONSTRAINT "Includes_pkey" PRIMARY KEY ("Email","DateTime","Location","IngredientName")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "Email" VARCHAR(50) NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "Cost" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("Email","Name")
);

-- CreateTable
CREATE TABLE "Uses" (
    "Email" VARCHAR(50) NOT NULL,
    "MenuName" VARCHAR(50) NOT NULL,
    "IngredientName" VARCHAR(50) NOT NULL,
    "Amount" DECIMAL(8,2) NOT NULL,
    "AmountUnits" VARCHAR(10) NOT NULL,

    CONSTRAINT "Uses_pkey" PRIMARY KEY ("Email","MenuName","IngredientName")
);

-- CreateTable
CREATE TABLE "Sale" (
    "Email" VARCHAR(50) NOT NULL,
    "StartDate" DATE NOT NULL,
    "EndDate" DATE NOT NULL,
    "Revenue" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("Email","StartDate","EndDate")
);

-- CreateTable
CREATE TABLE "Sold" (
    "Email" VARCHAR(50) NOT NULL,
    "StartDate" DATE NOT NULL,
    "EndDate" DATE NOT NULL,
    "Count" INTEGER NOT NULL,
    "MenuName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Sold_pkey" PRIMARY KEY ("Email","StartDate","EndDate","MenuName")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_Email_DateTime_Location_key" ON "Purchase"("Email", "DateTime", "Location");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_Email_Name_key" ON "MenuItem"("Email", "Name");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_Email_StartDate_EndDate_key" ON "Sale"("Email", "StartDate", "EndDate");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_Email_fkey" FOREIGN KEY ("Email") REFERENCES "User"("Email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_Email_fkey" FOREIGN KEY ("Email") REFERENCES "User"("Email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Includes" ADD CONSTRAINT "Includes_Email_IngredientName_fkey" FOREIGN KEY ("Email", "IngredientName") REFERENCES "Ingredient"("Email", "Name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Includes" ADD CONSTRAINT "Includes_Email_DateTime_Location_fkey" FOREIGN KEY ("Email", "DateTime", "Location") REFERENCES "Purchase"("Email", "DateTime", "Location") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_Email_fkey" FOREIGN KEY ("Email") REFERENCES "User"("Email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Uses" ADD CONSTRAINT "Uses_Email_IngredientName_fkey" FOREIGN KEY ("Email", "IngredientName") REFERENCES "Ingredient"("Email", "Name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Uses" ADD CONSTRAINT "Uses_Email_MenuName_fkey" FOREIGN KEY ("Email", "MenuName") REFERENCES "MenuItem"("Email", "Name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_Email_fkey" FOREIGN KEY ("Email") REFERENCES "User"("Email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sold" ADD CONSTRAINT "Sold_Email_StartDate_EndDate_fkey" FOREIGN KEY ("Email", "StartDate", "EndDate") REFERENCES "Sale"("Email", "StartDate", "EndDate") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sold" ADD CONSTRAINT "Sold_Email_MenuName_fkey" FOREIGN KEY ("Email", "MenuName") REFERENCES "MenuItem"("Email", "Name") ON DELETE CASCADE ON UPDATE CASCADE;
