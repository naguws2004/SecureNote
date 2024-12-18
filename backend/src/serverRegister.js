const express = require('express');
const db = require('./db');

class ServerRegister {
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
         * /api/register:
         *   post:
         *     summary: Registers a new user
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
         *         description: The user to register
         *     responses:
         *       201:
         *         description: user registered successfully
         *       500:
         *         description: An error occurred while registering the user
         */
        this.app.post('/api/register', (req, res) => {
            const { name, email, password } = req.body;
            db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
                if (err) {
                    console.error('Error inserting into MySQL:', err);
                    return res.status(500).send('An error occurred while registering the user');
                }
                res.status(201).send('user Registered successfully');
            });
        });
    }
    
    start() {}
}

module.exports = ServerRegister;