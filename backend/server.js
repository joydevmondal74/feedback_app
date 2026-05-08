import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import 'dotenv/config';


const app = express();

/* Middleware */

app.use(cors({
  origin: [
    "https://feedback-app-alpha-wine.vercel.app" //Vercel URL
  ],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

/* MySQL Connection */

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

/* API */

app.post("/submit", (req, res) => {

  const { name, phone, email, feedback } = req.body;

  const sql =
    "INSERT INTO users_info (name, phone, email, feedback) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, phone, email, feedback], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Error inserting data");
    } else {
      res.send("Feedback Submitted Successfully");
    }

  });
});

/* Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});