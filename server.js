const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Import body-parser
const port = 3000;

// Prisma client configurations 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

// Check if there are any users in the database
async function checkUsers() {
  const users = await prisma.user.findMany();
  return users.length === 0;
}

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

// Check if there are no users, then create users
checkUsers()
  .then(async (noUsers) => {
    if (noUsers) {
      await createUsers();
      console.log('Users created successfully.');
    } else {
      console.log('Users already exist in the database.');
    }
  })
  .catch((error) => console.error('Error checking users:', error))
  .finally(() => prisma.$disconnect());

// Getting all the users
app.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Fout bij het ophalen van gebruikers:', error);
    res.status(500).json({ error: 'Er is een serverfout opgetreden.', details: error.message });
  }
});

// Endpoint to add a new user via a POST request
app.post('/add-user', async (req, res) => {
  try {
    const userData = req.body; // Assuming request body contains user data
    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        age: userData.age
      }
    });
    res.json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Error adding user', details: error.message });
  }
});

// Endpoint to delete a user via a DELETE request
app.delete('/delete-user/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    // Use Prisma to delete the user by ID
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user', details: error.message });
  }
});


// App is working on port 3000 
app.listen(port, () => {
  console.log('Luisteren op poort: ' + port);
});
