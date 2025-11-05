// Utilitário centralizado para configuração da API
export const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  // Remove barra final se houver
  return apiUrl.replace(/\/$/, "");
};

export const API_URL = getApiUrl();

