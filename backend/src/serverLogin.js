const express = require('express');
const db = require('./db');

class ServerLogin {
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
         * /api/login:
         *   get:
         *     summary: Log in a user
         *     parameters:
         *       - in: query
         *         name: email
         *         schema:
         *           type: string
         *         required: true
         *         description: The user's email
         *       - in: query
         *         name: password
         *         schema:
         *           type: string
         *         required: true
         *         description: The user's password
         *     responses:
         *       200:
         *         description: User retrieved successfully
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
         *         description: User not found
         *       500:
         *         description: An error occurred while retrieving the user
         */
        this.app.get('/api/login', (req, res) => {
            const { email, password } = req.query;
            const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
            const params = [email, password];
            
            // Use db.format to see the complete query
            const formattedQuery = db.format(query, params);
            console.log('Executing query:', formattedQuery);
            
            db.query(query, params, (err, results) => {
                if (err) {
                    console.error('Error fetching from MySQL:', err);
                    return res.status(500).send('An error occurred while logging in the user');
                }
                if (results.length === 0) {
                    return res.status(404).send('User not found');
                }
                res.json(results[0]);
            });
        });
    }
    
    start() {}
}

module.exports = ServerLogin;