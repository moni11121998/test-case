const express = require('express');
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

// const app = express();

// app.use(express.json());
function ApiRoutes(app){

app.use('/api/employees', employeeRoutes);
}
module.exports = {ApiRoutes};
