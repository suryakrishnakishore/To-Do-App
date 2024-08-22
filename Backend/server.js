import express, { response } from "express";
import env from "dotenv";
import cors from "cors";
import Pg from "pg";
import BodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

const app = express();
env.config(); 

app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());

const db = new Pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();
// Get all todos...
app.get("/todos/:userEmail", async (req, res) => {
    console.log(req);
    const { userEmail } = req.params;
    try {
        const todos = await db.query(`SELECT * FROM todos WHERE user_email=$1`, [userEmail]);
        res.status(200).send(todos.rows);
    } catch (err) {
        console.log(err);
    }
});

// Make new todos...
app.post("/todos", async (req, res) => {
    console.log(req);
    const { user_email, title, progress, date} = req.body;
    const id = uuidv4();
    try {
        const responce = await db.query(`INSERT INTO todos VALUES ($1, $2, $3, $4, $5) RETURNING *`, [
            id,
            user_email,
            title,
            progress,
            date,
        ]);
        console.log(responce);
    } catch (err) {
        console.log(err);
    }
});

// Editing a todo...
app.put("/todos/:user_id", async (req, res) => {
    console.log("This is the Body of req ; ", req.body);
    console.log("This is the paramenter: ", req.params);
    const { user_id } = req.params;
    console.log(user_id);
    const { user_email, title, progress, date} = req.body;
    const id = uuidv4();
    try {
        const responce = await db.query(`UPDATE todos SET title = $1, progress =  $2 WHERE id = $3 RETURNING *`, [
            
            title,
            progress,
            user_id,
        ]);
        console.log(responce);
    } catch (err) {
        console.log(err);
    }
});

// Delete a todo...
app.delete("/todos/:user_id", async (req, res) => {
    const {user_id} = req.params;
    try {
        const response = await db.query(`DELETE FROM todos WHERE id = $1`, [user_id]);

    } catch (err) {
        console.log(err);
    }
});

// SignUp a USER...
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { user_email, password } = req.body;

    try {
        const response = await db.query(`INSERT INTO users VALUES ($1, $2)`, [
            user_email, 
            password,
        ]);
    } catch (err) {
        console.log(err);
    }
});

// LogIn a USER...
app.post("/login", async (req, res) => {
    console.log(req.body);
    const {user_email, password} = req.body;
    try {
        const responce = await db.query(`SELECT (hashed_pass) FROM users WHERE email = $1`, [user_email]);
        console.log(responce.rows[0].hashed_pass);
        if(password === responce.rows[0].hashed_pass){
            res.status(200).send({
                status: true,
            })
        } else {
            res.status(403).send({
                status: false,
            })
        }
    } catch (err) {
        console.log(err);
    }
})
app.listen(process.env.R_PORT, ()=> {
    console.log(`Server is running on port ${process.env.R_PORT}...`);
});