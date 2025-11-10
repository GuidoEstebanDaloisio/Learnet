export const ROLES = {
  ALUMNO: "alumno",
  MENTOR: "mentor",
  ADMIN: "admin",
} as const;

export type Rol = typeof ROLES[keyof typeof ROLES];

export const TODOS_LOS_ROLES: Rol[] = Object.values(ROLES);
