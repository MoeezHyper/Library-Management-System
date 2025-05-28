import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12754296",
    password: "dhZRNCmaW2",
    database: "sql12754296",
    port: 3306,
});

app.get("/", (req, res) => {
    res.json("Hello, this is the backend");
});


app.get("/books", (req, res) => {
    const search = req.query.search;

    let query = "SELECT * FROM books";
    const queryParams = [];

    if (search) {
        query += " WHERE title LIKE ?";
        queryParams.push(`%${search}%`); 
    }

    db.query(query, queryParams, (err, data) => {
        if (err) {
            console.error("Error fetching books:", err);
            return res.status(500).json({ error: "Failed to fetch books" });
        }
        return res.json(data);
    });
});

app.delete("/books/:book_id", (req, res) => {
    const bookId = req.params.book_id;

    const deleteQuery = "DELETE FROM books WHERE book_id = ?";
    db.query(deleteQuery, [bookId], (deleteErr, data) => {
        if (deleteErr) {
            console.error("Error deleting book from database:", deleteErr);
            return res.status(500).json({ error: "Failed to delete book from database" });
        }

        return res.status(200).json({ message: "Book deleted successfully!" });
    });
});

app.post("/books", (req, res) => {
    const { title, author, description } = req.body;

    if (!title || !author || !description) {
        return res.status(400).json({ error: "All fields are mandatory!" });
    }

    const query = "INSERT INTO books (title, author, description) VALUES (?, ?, ?)";
    db.query(query, [title, author, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Book added successfully!" });
    });
});

app.get("/books/genre/:genre", (req, res) => {
    const genre = req.params.genre;
    const q = "SELECT * FROM books WHERE genre = ?";
    db.query(q, [genre], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});


app.listen(8800, () => {
    console.log("Connected to backend!");
});
