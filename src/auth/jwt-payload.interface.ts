import { Role } from "../users/role.enum"

export interface JwtPayload {
    sub: number,
    email: string,
    name: string,
    address: string,
    roles: Role
}