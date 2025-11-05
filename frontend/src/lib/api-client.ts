// Utilitário centralizado para configuração da API
export const getApiUrl = () => {
  let apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Remove barra final se houver
  apiUrl = apiUrl.replace(/\/$/, "");

  // Se não tiver protocolo, adiciona https:// (exceto localhost)
  if (!apiUrl.match(/^https?:\/\//)) {
    if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
      apiUrl = `http://${apiUrl}`;
    } else {
      apiUrl = `https://${apiUrl}`;
    }
  }

  return apiUrl;
};

export const API_URL = getApiUrl();
