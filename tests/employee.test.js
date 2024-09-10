const supertest  = require('supertest');
const express = require('express');
const {ApiRoutes} = require('../app');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
ApiRoutes(app)
const request = supertest(app)

const dbUri ="mongodb+srv://test123:11121998@atlascluster.s8edkac.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
describe('Employee CRUD', () => {
  beforeAll(async () => {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
 

  // create test employee
  it('should create a new employee', async () => {
    const res = await request
      .post('/api/employees')
      .send({
        name: 'Joe',
        position: 'Software Engineer',
        salary: 60000,
        department: 'IT'
      })
      .expect('Content-Type', /json/)
      .expect(201);
    
     expect(res.statusCode).toEqual(201);
 
   });

  
  afterAll(async () => {
    await mongoose.connection.close(); 
  
  });


  

 //get all employees
  it('should retrieve all employees', async () => {
    const res = await request.get('/api/employees'); 
    expect(res.statusCode).toEqual(200); 
    expect(Array.isArray(res.body)).toBe(true); 
  });
   

  it('should return an employee by ID', async () => {
    // retrive first employee by id
    const createRes = await request
      .post('/api/employees')
      .send({
        name: 'John Doe',
        position: 'Developer',
        salary: 50000,
        department: 'IT',
      })
      .expect(201);

    const employeeId = createRes.body._id;

    // Retrieve the employee by id
    const res = await request.get(`/api/employees/${employeeId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', employeeId);
    expect(res.body).toHaveProperty('name', 'John Doe');
    expect(res.body).toHaveProperty('position', 'Developer');
  });


  //  Test updating an employee
  it('should update an employee by ID', async () => {

    const createRes = await request
      .post('/api/employees')
      .send({
        name: 'Jane Doe',
        position: 'Manager',
        salary: 80000,
        department: 'HR',
      })
      .expect(201);

    const employeeId = createRes.body._id;

    // Update the employee's salary
    const updateRes = await request
      .put(`/api/employees/${employeeId}`)
      .send({ salary: 90000 })
      .expect(200);

    expect(updateRes.body).toHaveProperty('salary', 90000);
  });

  // Test deleting an employee
  it('should delete an employee by ID', async () => {
  
    const createRes = await request
      .post('/api/employees')
      .send({
        name: 'Sam Smith',
        position: 'Analyst',
        salary: 70000,
        department: 'Finance',
      })
      .expect(201);

    const employeeId = createRes.body._id;

    // Delete the employee
    const deleteRes = await request
      .delete(`/api/employees/${employeeId}`)
      .expect(200);

    expect(deleteRes.body).toHaveProperty('message', 'Employee deleted');
  });
});
