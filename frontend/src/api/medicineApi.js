import API from "./axios";

export const getMedicines = () => API.get("/medicines");
export const addMedicine = (data) => API.post("/medicines", data);
