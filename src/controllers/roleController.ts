import { Request, Response } from 'express';
import { RoleService } from '../application/roleService';

const roleService = new RoleService();

export const createRole = async (req: Request, res: Response) => {
  const roleData = req.body;
  try {
    const role = await roleService.createRole(roleData);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error creating role' });
  }
};

export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching roles' });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  try {
    const role = await roleService.getRoleById(id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching role' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  const roleData = req.body;
  try {
    const updatedRole = await roleService.updateRole(id, roleData);
    if (updatedRole) {
      res.json(updatedRole);
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating role' });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  try {
    const deletedRole = await roleService.deleteRole(id);
    if (deletedRole) {
      res.json({ message: 'Role deleted' });
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting role' });
  }
};
