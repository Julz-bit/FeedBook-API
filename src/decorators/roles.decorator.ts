import { SetMetadata } from '@nestjs/common';
import { Role } from '../users/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);