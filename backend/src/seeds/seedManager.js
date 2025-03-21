const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/garace-agency', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  seedDatabase();
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

async function seedDatabase() {
  try {
    const manager = new User({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      role: 'manager',  
      password: await bcrypt.hash('password123', 10), 
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await manager.save();
    console.log('Manager seed created successfully!');
    mongoose.connection.close(); 
  } catch (error) {
    console.error('Error seeding the database', error);
    mongoose.connection.close();
  }
}
