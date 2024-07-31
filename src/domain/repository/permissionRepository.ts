import { Permission } from '../permission';
import prismaClient from '../../infrastructure/prismaClient';

export class PermissionRepository {
  async create(permissionData: Omit<Permission, 'id'>) {
    return prismaClient.permission.create({
      data: {
        name: permissionData.name,
        role: {
          connect: { id: permissionData.roleId },
        },
      },
    });
  }

  async findAll() {
    return prismaClient.permission.findMany();
  }

  async findById(id: number) {
    return prismaClient.permission.findUnique({
      where: { id },
    });
  }

  async update(id: number, permissionData: Partial<Omit<Permission, 'id'>>) {
    return prismaClient.permission.update({
      where: { id },
      data: {
        ...(permissionData.name && { name: permissionData.name }), // Asigna solo si `name` está definido
        ...(permissionData.roleId && {
          role: {
            connect: { id: permissionData.roleId },
          },
        }), // Conecta solo si `roleId` está definido
      },
    });
  }

  async delete(id: number) {
    return prismaClient.permission.delete({
      where: { id },
    });
  }
}
