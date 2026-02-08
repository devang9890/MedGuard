import API from "./axios";

export const addSupply = (data) => API.post("/supplies", data);
export const getSupplies = () => API.get("/supplies");
