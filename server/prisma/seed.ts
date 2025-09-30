import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

// async function deleteAllData(orderedFileNames: string[]) {
//   const modelNames = orderedFileNames.map((fileName) => {
//     const modelName = path.basename(fileName, path.extname(fileName));
//     return modelName.charAt(0).toUpperCase() + modelName.slice(1);
//   });

//   for (const modelName of modelNames) {
//     const model: any = prisma[modelName as keyof typeof prisma];
//     if (model) {
//       await model.deleteMany({});
//       console.log(`Cleared data from ${modelName}`);
//     } else {
//       console.error(
//         `Model ${modelName} not found. Please ensure the model name is correctly specified.`
//       );
//     }
//   }
// }

async function main() {
  const dataDirectories = [
    path.join(__dirname, "seedData"),
    path.join(__dirname, "additionalData"),
    path.join(__dirname, "additionalData2"),
    path.join(__dirname, "additionalData3")
  ];

  const orderedFileNames = [
    "user.json",
    "purchase.json",
    "ingredient.json",
    "includes.json",
    "menuItem.json",
    "uses.json",
    "sale.json",
    "sold.json",
    "otherCost.json",
  ];

  //await deleteAllData(orderedFileNames);

  for (const dataDirectory of dataDirectories) {
    console.log(`Processing directory: ${path.basename(dataDirectory)}`);
    
    for (const fileName of orderedFileNames) {
      const filePath = path.join(dataDirectory, fileName);
      
      if (!fs.existsSync(filePath)) {
        continue;
      }
      
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const modelName = path.basename(fileName, path.extname(fileName));
      const model: any = prisma[modelName as keyof typeof prisma];

      if (!model) {
        console.error(`No Prisma model matches the file name: ${fileName}`);
        continue;
      }

      for (const data of jsonData) {
        try {
          await model.create({
            data,
          });
        } catch (error) {
          continue;
        }
      }

      console.log(`Seeded ${modelName} with data from ${fileName}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
