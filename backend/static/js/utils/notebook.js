// CONSTS
const API_URL = "http://localhost:3000/api/notebook";

export const getAllNotebooks = async () => {
  const notebooks = await fetch(API_URL);
  return await notebooks.json();
};

export const getNotebookById = async (id) => {
  const notebook = await fetch(`${API_URL}/${id}`);
  return await notebook.json();
};

export const createNotebook = async (reqBody) => {
  const newNotebook = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  return newNotebook;
};

export const updateNotebook = async (notebook) => {
  const updatedNotebook = await fetch(`${API_URL}/${notebook._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notebook),
  });
  return updatedNotebook;
};

export const deleteNotebook = async (id) => {
  const deleted = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return deleted;
};
