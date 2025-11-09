import type { Rol } from "../constants/roles";

export interface BaseUser {
  email: string;
  contraseña: string;
  rol: Rol;
}

export const saveBaseUser = (baseUser: BaseUser) => {
  sessionStorage.setItem("baseUser", JSON.stringify(baseUser));
};

export const getBaseUser = (): BaseUser | null => {
  const item = sessionStorage.getItem("baseUser");
  return item ? JSON.parse(item) : null;
};

export const clearBaseUser = () => sessionStorage.removeItem("baseUser");
