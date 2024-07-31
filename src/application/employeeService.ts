import { Employee } from '@prisma/client';
import { EmployeeRepository } from '../domain/repository/employeeRepository';

export class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  async createEmployee(employeeData: Omit<Employee, 'id'>): Promise<Employee> {
    return await this.employeeRepository.create(employeeData);
  }

  async getEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.findAll();
  }

  async getEmployeeById(id: number): Promise<Employee | null> {
    return await this.employeeRepository.findById(id);
  }

  async updateEmployee(
    id: number,
    employeeData: Partial<Omit<Employee, 'id'>>,
  ): Promise<Employee> {
    return await this.employeeRepository.update(id, employeeData);
  }

  async deleteEmployee(id: number): Promise<Employee> {
    return await this.employeeRepository.delete(id);
  }
}
