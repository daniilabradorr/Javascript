import {getUsers, deleteUser, updateUser} from './api.js';

let editUser = null;
const form = document.getElementById('user-form'); // Obtener el formulario
const userList = document.getElementById('user-list');
//render de usuaRIOS

const renderUsers = async () => {
    const users = await getUsers();
    userList.innerHTML = '';
  
    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${user.name} (${user.email})</span>
        <button type="button" class="edit" data-id="${user.id}">Editar</button>
        <button type="button" class="delete" data-id="${user.id}">Eliminar</button>
      `;
      userList.appendChild(li);
    });
  };


// 2) Envío del formulario: crea o actualiza
const handleSubmit = async (e) => {
    e.preventDefault();
    const name  = form.elements['name'].value;
    const email = form.elements['email'].value;
  
    // Si editUser tiene id, lo envía; si no, crea
    await updateUser({ id: editUser?.id, name, email });
    editUser = null;
    form.reset();
    renderUsers();
};
  
// 3) Rellenar formulario para editar
const handleEdit = (id, name, email) => {
    editUser = { id, name, email };
    form.elements['name'].value  = name;
    form.elements['email'].value = email;
};
  
// 4) Eliminar
const handleDelete = async (id) => {
    await deleteUser(id);
    renderUsers();
};
  
// 5) Delegación de eventos en la lista
userList.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('edit')) {
      const id = target.dataset.id;
      // Leer nombre y email desde el <span>
      const text = target.parentElement.querySelector('span').innerText;
      const [name, emailWithParen] = text.split(' (');
      const email = emailWithParen.replace(')', '');
      handleEdit(id, name, email);
    }
    if (target.classList.contains('delete')) {
      handleDelete(target.dataset.id);
    }
});
  
// 6) Asignar submit y arrancar
form.addEventListener('submit', handleSubmit);
renderUsers();