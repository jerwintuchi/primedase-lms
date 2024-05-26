const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Elemental Magic" },
        { name: "Illusion Arts" },
        { name: "Conjuration" },
        { name: "Abjuration" },
        { name: "Necromancy" },
        { name: "Forbidden Art" },
        { name: "Ancient Magic" },
        { name: "Arcane Studies" },
        { name: "ᛟᚾᚡᛖᚱ" },
      ],
    });
    console.log("Categories of Magic seeded");
  } catch (error) {
    console.log("Error seeing the db categories", error);
  } finally {
    await database.$disconnect();
  }
}
main();
