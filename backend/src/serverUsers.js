const express = require('express');
const db = require('./db');

class ServerUsers {
    constructor(app, port) {
        this.app = app;
        this.port = port || 5000;
        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(express.json());
    }

    setupRoutes() {
        /**
         * @swagger
         * /api/users:
         *   get:
         *     summary: Retrieves all users
         *     responses:
         *       200:
         *         description: A list of users
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   id:
         *                     type: integer
         *                   name:
         *                     type: string
         *                   email:
         *                     type: string
         *                   password:
         *                     type: string
         *       500:
         *         description: An error occurred while fetching the users
         */
        this.app.get('/api/users', (req, res) => {
            db.query('SELECT * FROM users', (err, results) => {
                if (err) {
                    console.error('Error fetching from MySQL:', err);
                    return res.status(500).send('An error occurred while fetching the users');
                }
                res.json(results);
            });
        });

        /**
         * @swagger
         * /api/users/{id}:
         *   get:
         *     summary: Retrieves a user by id
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: The id to retrieve
         *     responses:
         *       200:
         *         description: user retrieved successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                   id:
         *                     type: integer
         *                   name:
         *                     type: string
         *                   email:
         *                     type: string
         *                   password:
         *                     type: string
         *       404:
         *         description: user not found
         *       500:
         *         description: An error occurred while retrieving the user
         */
        this.app.get('/api/users/:id', (req, res) => {
            const { id } = req.params;
            db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
                if (err) {
                    console.error('Error fetching from MySQL:', err);
                    return res.status(500).send('An error occurred while retrieving the user');
                }
                if (results.length === 0) {
                    return res.status(404).send('user not found');
                }
                res.json(results[0]);
            });
        });

        /**
         * @swagger
         * /api/users:
         *   post:
         *     summary: Create a new user
         *     parameters:
         *       - in: body
         *         name: user
         *         schema:
         *           type: object
         *           properties:
         *                   name:
         *                     type: string
         *                   email:
         *                     type: string
         *                   password:
         *                     type: string
         *         required: true
         *         description: The user to create
         *     responses:
         *       201:
         *         description: user created successfully
         *       500:
         *         description: An error occurred while creating the user
         */
        this.app.post('/api/users', (req, res) => {
            const { name, email, password } = req.body;
            db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
                if (err) {
                    console.error('Error inserting into MySQL:', err);
                    return res.status(500).send('An error occurred while creating the user');
                }
                res.status(201).send('user created successfully');
            });
        });

        /**
         * @swagger
         * /api/users/{id}:
         *   put:
         *     summary: Update an existing user
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The id of the user to update
         *       - in: body
         *         name: user
         *         schema:
         *           type: object
         *           properties:
         *                   name:
         *                     type: string
         *                   email:
         *                     type: string
         *                   password:
         *                     type: string
         *         required: true
         *         description: The user data to update
         *     responses:
         *       200:
         *         description: user updated successfully
         *       500:
         *         description: An error occurred while updating the user
         */
        this.app.put('/api/users/:id', (req, res) => {
            const { id } = req.params;
            const { name, email, password } = req.body;
            db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id], (err, results) => {
                if (err) {
                    console.error('Error updating MySQL:', err);
                    return res.status(500).send('An error occurred while updating the user');
                }
                res.send('user updated successfully');
            });
        });

        /**
         * @swagger
         * /api/users/{id}:
         *   delete:
         *     summary: Deletes a user by id
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The id to delete
         *     responses:
         *       200:
         *         description: user deleted successfully
         *       500:
         *         description: An error occurred while deleting the user
         */
        this.app.delete('/api/users/:id', (req, res) => {
            const { id } = req.params;
            db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
                if (err) {
                    console.error('Error deleting from MySQL:', err);
                    return res.status(500).send('An error occurred while deleting the user');
                }
                res.send('user deleted successfully');
            });
        });
    }
    
    start() {
        console.log(`Users routes ready`);
    }
}

module.exports = ServerUsers;