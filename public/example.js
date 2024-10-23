import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
const getAllContacts = async () => {
    try {
        const data = await axios.get('/contacts');
        console.log(data.response);
    } catch (error) {
        console.log(error);
    }
};
// getAllContacts();
const getAllUsers = async () => {
    try {
        const data = await axios.get('/users');
        console.log(data.response);
    } catch (error) {
        console.log(error);
    }
};
// getAllUsers();

const refs = {
    panels: {
        register: document.getElementById('register'),
        login: document.getElementById('login'),
        contacts: document.getElementById('contacts'),
        users: document.getElementById('users'),
    },
};

const list = Object.values(refs.panels);

console.log(list);

list.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e.target);
    });
});
