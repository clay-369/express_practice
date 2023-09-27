const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Endpoint to retrieve all animsals via a GET request
router.get('/get-animals', async (req, res) => {
    try {
      const animals = await prisma.animal.findMany();
      res.json(animals);
    } catch (error) {
      console.error('Error retrieving animals:', error);
      res.status(500).json({ error: 'Error retrieving animals', details: error.message });
    }
  });

// Endpoint to add a new animal via a POST request
router.post('/add-animal', async (req, res) => {
  try {
    const animalData = req.body;
    const newanimal = await prisma.animal.create({
      data: {
        name: animalData.name,
        age: animalData.age
      }
    });
    res.json(newanimal);
  } catch (error) {
    console.error('Error adding animal:', error);
    res.status(500).json({ error: 'Error adding animal', details: error.message });
  }
});

// Endpoint to delete a animal via a DELETE request
router.delete('/delete-animal/:id', async (req, res) => {
  const animalId = parseInt(req.params.id);

  try {
    const deletedanimal = await prisma.animal.delete({
      where: {
        id: animalId,
      },
    });

    res.json(deletedanimal);
  } catch (error) {
    console.error('Error deleting animal:', error);
    res.status(500).json({ error: 'Error deleting animal', details: error.message });
  }
});

module.exports = router;
