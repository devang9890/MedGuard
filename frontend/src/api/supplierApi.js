import API from "./axios";

export const getSuppliers = () => API.get("/suppliers");
export const addSupplier = (data) => API.post("/suppliers", data);
export const verifySupplier = (id) => API.put(`/suppliers/verify/${id}`);
export const blacklistSupplier = (id) => API.put(`/suppliers/blacklist/${id}`);
