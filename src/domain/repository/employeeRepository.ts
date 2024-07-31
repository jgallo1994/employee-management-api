import { Employee } from '@prisma/client';
import prismaClient from '../../infrastructure/prismaClient';

export class EmployeeRepository {
  private prisma = prismaClient;

  async create(
    employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Employee> {
    return this.prisma.employee.create({
      data: employeeData,
    });
  }

  async findAll(): Promise<Employee[]> {
    return this.prisma.employee.findMany();
  }

  async findById(id: number): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    employeeData: Partial<Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Employee> {
    return this.prisma.employee.update({
      where: { id },
      data: employeeData,
    });
  }

  async delete(id: number): Promise<Employee> {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
