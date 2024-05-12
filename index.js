import express, { json } from 'express';
import { connect } from 'mongoose';
import authRoutes from './src/routes/auth.js';
import profileRoutes from './src/routes/profile.js';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://mohammadfahadalim:VG8VvrkSIkalTNpL@cluster0.gxhjimw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB connection URI

// Connect to MongoDB
connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start listening for requests after successful connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(json());

// Routes

app.get('/', (req, res) => {
  res.send('Welcome');
})

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
