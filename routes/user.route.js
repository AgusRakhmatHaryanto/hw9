/**
 * @swagger
 * components:
 *  schemas:
 *      Users:
 *          type: object
 *          required:
 *              - email
 *              - gender
 *              - password
 *              - role
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The auto-generated id of the user
 *              email:
 *                  type: string
 *                  description: The email of the user
 *              gender:
 *                  type: string
 *                  description: The gender of the user
 *              password:
 *                  type: string
 *                  description: The password of the user
 *              role:
 *                  type: string
 *                  description: The role of the user
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time when the user was created
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time when the user was last updated
 *          example:
 *              id: 1
 *              email: "oainger0@craigslist.org"
 *              gender: "Female"
 *              password: "KcAk6Mrg7DRM"
 *              role: "Construction Worker"
 *              createdAt: "2023-10-16T13:41:18.897Z"
 *              updatedAt: "2023-10-16T13:41:18.897Z"
 */



const express= require('express');
const router = express.Router();
const users = require('../controllers/user.controller');

router.get('/user', users.getUser);

router.get('/users', users.getUsers);

router.post('/users', users.addUser);

router.put('/users/:id', users.updateUser);

router.delete('/users/:id', users.deleteUser);


module.exports= router;