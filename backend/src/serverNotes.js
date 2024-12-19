const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');

class ServerNotes {
    constructor(app, port) {
        this.app = app;
        this.port = port || 5000;
        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(express.json());
    }

    // Middleware to validate JWT token
    validateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.sendStatus(401); // Unauthorized
        }

        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            next();
        });
    }

    setupRoutes() {
        /**
         * @swagger
         * /api/notes:
         *   get:
         *     summary: Retrieves all notes
         *     responses:
         *       200:
         *         description: A list of notes
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   id:
         *                     type: integer
         *                   email:
         *                     type: string
         *                   note:
         *                     type: string
         *       500:
         *         description: An error occurred while fetching the notes
         */
        this.app.get('/api/notes', this.validateToken, (req, res) => {
            db.query('SELECT * FROM notes', (err, results) => {
                if (err) {
                    console.error('Error fetching from MySQL:', err);
                    return res.status(500).send('An error occurred while fetching the notes');
                }
                res.json(results);
            });
        });

        /**
         * @swagger
         * /api/notes/{id}:
         *   get:
         *     summary: Retrieves a note by id
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: The id to retrieve
         *     responses:
         *       200:
         *         description: note retrieved successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                   id:
         *                     type: integer
         *                   email:
         *                     type: string
         *                   note:
         *                     type: string
         *       404:
         *         description: note not found
         *       500:
         *         description: An error occurred while retrieving the note
         */
        this.app.get('/api/notes/:id', this.validateToken, (req, res) => {
            const { id } = req.params;
            db.query('SELECT * FROM notes WHERE id = ?', [id], (err, results) => {
                if (err) {
                    console.error('Error fetching from MySQL:', err);
                    return res.status(500).send('An error occurred while retrieving the note');
                }
                if (results.length === 0) {
                    return res.status(404).send('note not found');
                }
                res.json(results[0]);
            });
        });

        /**
         * @swagger
         * /api/notes:
         *   post:
         *     summary: Create a new note
         *     parameters:
         *       - in: body
         *         name: note
         *         schema:
         *           type: object
         *           properties:
         *                   email:
         *                     type: string
         *                   note:
         *                     type: string
         *         required: true
         *         description: The note to create
         *     responses:
         *       201:
         *         description: Note created successfully
         *       500:
         *         description: An error occurred while creating the note
         */
        this.app.post('/api/notes', this.validateToken, (req, res) => {
            const { email, note } = req.body;
            db.query('INSERT INTO notes (email, note) VALUES (?, ?)', [email, note], (err, results) => {
                if (err) {
                    console.error('Error inserting into MySQL:', err);
                    return res.status(500).send('An error occurred while creating the note');
                }
                res.status(201).send('Note created successfully');
            });
        });

        /**
         * @swagger
         * /api/notes/{id}:
         *   put:
         *     summary: Update an existing note
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The id of the note to update
         *       - in: body
         *         name: note
         *         schema:
         *           type: object
         *           properties:
         *                   email:
         *                     type: string
         *                   note:
         *                     type: string
         *         required: true
         *         description: The note data to update
         *     responses:
         *       200:
         *         description: Note updated successfully
         *       500:
         *         description: An error occurred while updating the note
         */
        this.app.put('/api/notes/:id', this.validateToken, (req, res) => {
            const { id } = req.params;
            const { email, note } = req.body;
            db.query('UPDATE notes SET email = ?, note = ? WHERE id = ?', [email, note, id], (err, results) => {
                if (err) {
                    console.error('Error updating MySQL:', err);
                    return res.status(500).send('An error occurred while updating the note');
                }
                res.send('Note updated successfully');
            });
        });

        /**
         * @swagger
         * /api/notes/{id}:
         *   delete:
         *     summary: Deletes a note by id
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The id to delete
         *     responses:
         *       200:
         *         description: note deleted successfully
         *       500:
         *         description: An error occurred while deleting the note
         */
        this.app.delete('/api/notes/:id', this.validateToken, (req, res) => {
            const { id } = req.params;
            db.query('DELETE FROM notes WHERE id = ?', [id], (err, results) => {
                if (err) {
                    console.error('Error deleting from MySQL:', err);
                    return res.status(500).send('An error occurred while deleting the note');
                }
                res.send('note deleted successfully');
            });
        });
    }

    start() {
        console.log(`Notes routes ready`);
    }
}

module.exports = ServerNotes;