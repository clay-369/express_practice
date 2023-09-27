const express = require('express');
const app = express();
const port = 3000;

// Prisma client configurations 
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Defining data to add Users to the database
async function createUsers() {
  await Promise.all([
      prisma.user.create({
          data: {
              name: 'John Doe',
              email: 'john@example.com',
              age: 30
          }
      }),
      prisma.user.create({
          data: {
              name: 'Jane Smith',
              email: 'jane@example.com',
              age: 25
          }
      })
      // Add more users if needed
  ]);
}
// Toevoegen van gebruikers aan de database
createUsers()
  .catch((error) => console.error('Fout bij het toevoegen van gebruikers:', error))
  .finally(() => prisma.$disconnect());

// Ophalen van alle gebruikers
app.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Fout bij het ophalen van gebruikers:', error);
    res.status(500).json({ error: 'Er is een serverfout opgetreden.', details: error.message });
  }
});

app.listen(port, () => {
  console.log('Luisteren op poort: ' + port);
});
