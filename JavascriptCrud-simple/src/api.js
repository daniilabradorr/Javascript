// This file contains the API URL for fetching user data
const API_URL = 'https://jsonplaceholder.typicode.com/users';

//getUsers 
export const getUsers = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
};
  
//deleleteUser
export const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

//editUser => addUser
export const updateUser = async (user) => {
    const url = user.id ? `${API_URL}/${user.id}` : API_URL;
    const method = user.id ? 'PUT' : 'POST'; // PUT para editar, POST para agregar

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    return await response.json();
};

// Una condicion si estoy editando o no un usuario
