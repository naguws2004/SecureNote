const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const ServerRegister = require('./serverRegister');
const ServerLogin = require('./serverLogin');
const ServerNotes = require('./serverNotes');
const ServerUsers = require('./serverUsers');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Use the cors middleware

const serverRegister = new ServerRegister(app, port);
const serverLogin = new ServerLogin(app, port);
const serverNotes = new ServerNotes(app, port);
const serverUsers = new ServerUsers(app, port);

function setupSwagger() {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Secure Note API', // Updated title
                description: 'This is the API documentation for the Secure Note application.', // Updated description
                version: '1.0.0',
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
        apis: ['./src/serverRegister.js', './src/serverLogin.js', './src/serverNotes.js', './src/serverUsers.js'], // Path to the API docs
    };

    const specs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

setupSwagger();
serverRegister.start();
serverLogin.start();
serverNotes.start();
serverUsers.start();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
