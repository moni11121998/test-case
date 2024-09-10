const express = require('express');
const { createEmployee, getAllEmployees, getEmployeeById, updateEmployeeById, deleteEmployeeById } = require('../controllers/employeeController');

const router = express.Router();

router.post('/', createEmployee); 
router.get('/', getAllEmployees); 
router.get('/:id', getEmployeeById); 
router.put('/:id', updateEmployeeById); 
router.delete('/:id', deleteEmployeeById); 

module.exports = router;
