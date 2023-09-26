const express = require('express');
const app = express();
const port = 3000;  // Change port to 3000 or another available port

// Prisma client configurations 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Retrieving all users
app.get('/', async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error('Fout bij het ophalen van gebruikers:', error);
      res.status(500).json({ error: 'Er is een serverfout opgetreden.' });
    }
  });

app.listen(port, () => {
    console.log('listening on port: ' + port)
})
