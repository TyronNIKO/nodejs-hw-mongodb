import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
const getAllContacts = async () => {
    try {
        const data = await axios.get('/contacts');
        return data.response;
    } catch (error) {
        console.log(error);
    }
};
// getAllContacts();
const getAllUsers = async () => {
    try {
        const data = await axios.get('/users');
    } catch (error) {
        console.log(error);
    }
};
// getAllUsers();
const registerUser = async () => {};
const loginUser = async (req) => {
    try {
        const data = await axios.post('/auth/login', req);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};
const refs = {
    panels: {
        register: document.getElementById('register'),
        login: document.getElementById('login'),
        contacts: document.getElementById('contacts'),
        users: document.getElementById('users'),
    },
    content: {
        register: document.querySelector('.regitration-content'),
        login: document.querySelector('.login-content'),
        contacts: document.querySelector('.contacts-content'),
        users: document.querySelector('.users-content'),
    },
    form: {
        login_form: document.querySelector('#login-form'),
    },
};

const list = Object.values(refs.panels);

const renderContacts = (data) => {
    console.log(typeof data);

    try {
        const list = data.map(({ name, email, phone }) => {
            return `<li>
                <p><b>Name</b>: ${name}</p>
                <p><b>Email</b>: ${email}</p>
                <p><b>Phone</b>: ${phone}</p>
            </li>`;
        });
        return list;
    } catch (error) {
        console.log(error);
    }
};
const showContacts = async () => {
    const data = await getAllContacts();
    refs.content.contacts.classList.remove('hidden');
    refs.content.contacts.innerHTML = renderContacts(data);
};

list.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e.target.id);
        const key = e.target.id;
        switch (key) {
            case 'contacts':
                showContacts();
                break;

            default:
                break;
        }
    });
});

refs.form.login_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
    };
    console.log(user);

    loginUser(user);
});
