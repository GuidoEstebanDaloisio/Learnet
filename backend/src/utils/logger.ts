// src/utils/logger.ts
import util from "util"; // para imprimir objetos grandes legibles

const formatJSON = (data: any) => {
  if (!data) return "";
  try {
    return "\n" + JSON.stringify(data, null, 2);
  } catch {
    return "\n" + util.inspect(data, { depth: null, colors: true });
  }
};

export const logger = {
  info: (msg: string, data?: any) => {
    console.log(`🟢 [INFO] ${new Date().toISOString()} - ${msg}`);
    if (data) console.log(formatJSON(data));
  },

  warn: (msg: string, data?: any) => {
    console.warn(`🟡 [WARN] ${new Date().toISOString()} - ${msg}`);
    if (data) console.warn(formatJSON(data));
  },

  error: (msg: string, data?: any) => {
    console.error(`🔴 [ERROR] ${new Date().toISOString()} - ${msg}`);
    if (data) console.error(formatJSON(data));
  },

  // 🔹 Para mostrar objetos completos con un título
  json: (title: string, obj: any) => {
    console.log(`📦 [JSON] ${title}:`);
    console.log(formatJSON(obj));
  },
};
