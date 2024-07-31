import { Request, Response } from 'express';
import { EmployeeService } from '../application/employeeService';

const employeeService = new EmployeeService();

export const createEmployee = async (req: Request, res: Response) => {
  const employeeData = req.body;
  try {
    const employee = await employeeService.createEmployee(employeeData);
    res.status(201).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating employee' });
  }
};

export const getEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await employeeService.getEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  try {
    const employee = await employeeService.getEmployeeById(id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employee' });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  const employeeData = req.body;
  try {
    const updatedEmployee = await employeeService.updateEmployee(
      id,
      employeeData,
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating employee' });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  try {
    const deletedEmployee = await employeeService.deleteEmployee(id);
    if (deletedEmployee) {
      res.json({ message: 'Employee deleted' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
};
