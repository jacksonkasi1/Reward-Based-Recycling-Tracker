// ===================== Imports =====================

// Third-party libraries
import express from '@fastly/expressly';
import bodyParser from 'body-parser';

// Project modules
import authRoutes from './routes/authRoutes';

// ===================== App Initialization =====================

const app = express();

/**
 * Middleware to parse JSON requests.
 */
app.use(bodyParser.json());

/**
 * Authentication routes.
 */
app.use('/api/auth', authRoutes);

/**
 * Start the server.
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
