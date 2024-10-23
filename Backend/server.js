import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import router from "./Router/Route.js";

const app = express();

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // Disable "X-Powered-By" header for security

// API Routes
app.use('/api', router);

// Home Route
app.get('/', (req, res) => {
  res.status(201).json("Home GET request");
});

// Start the server only if the database connection is valid
const PORT = 8080;
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected to backend on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Invalid database connection:', error);
  });

