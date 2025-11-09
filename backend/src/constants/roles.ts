// roles.ts
export const ROLES = {
  ALUMNO: "alumno",
  MENTOR: "mentor",
  ADMIN: "admin",
} as const;

// Opcional: array de todos los roles
export const TODOS_LOS_ROLES = Object.values(ROLES);
