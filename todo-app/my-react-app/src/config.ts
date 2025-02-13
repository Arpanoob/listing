const backendUrl = import.meta.env.VITE_API_BASE_URL;
const SOCKET_URL = import.meta.env.VITE_API_WS_URL;

const settings = { backendUrl, SOCKET_URL };

export default settings;
