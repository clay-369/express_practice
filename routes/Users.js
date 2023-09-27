const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Endpoint to retrieve all users via a GET request
router.get('/get-users', async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Error retrieving users', details: error.message });
    }
  });

// Endpoint to add a new user via a POST request
router.post('/add-user', async (req, res) => {
  try {
    const userData = req.body;
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
router.delete('/delete-user/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
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

module.exports = router;
