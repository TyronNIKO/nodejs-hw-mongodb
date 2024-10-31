import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const LS = {
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    load(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    reset(key) {
        localStorage.removeItem(key);
    },
};

let accessToken = LS.load('accessToken') ?? '';

const getAllContacts = async () => {
    try {
        axios.defaults.headers = { Authorization: accessToken };
        const response = await axios.get('/contacts');
        console.log(response);

        return response.data.data.data;
    } catch (error) {
        console.log(error);
    }
};
// getAllContacts();
const getAllUsers = async () => {
    try {
        axios.defaults.headers = { Authorization: accessToken };
        const response = await axios.get('/users');
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

// getAllUsers();
const registerUser = async () => {};
const loginUser = async (req) => {
    try {
        const data = await axios.post('/auth/login', req);
        // console.log(data);
        // console.log(data.data.data.accessToken);
        accessToken = `Bearer ${data.data.data.accessToken}`;
        LS.reset('accessToken');
        LS.save('accessToken', accessToken);
    } catch (error) {
        console.log(error);
    }
};
const resetPasswordEmail = async (req) => {
    console.log(req);

    try {
        const response = await axios.post('/auth/send-reset-email', {
            email: req,
        });
        console.log(response);
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
        reset_form: document.querySelector('#reset-form'),
    },
};

const list = Object.values(refs.panels);

const renderContacts = (data) => {
    try {
        const list = data.map(({ name, email, phone }) => {
            return `<li>
                <p><b>Name</b>: ${name}</p>
                <p><b>Email</b>: ${email}</p>
                <p><b>Phone</b>: ${phone}</p>
            </li>`;
        });
        return list.join('');
    } catch (error) {
        console.log(error);
    }
};
const removeHidden = (el) => {
    refs.content[el].classList.remove('hidden');
};
const addHidden = (el) => {
    const keys = Object.keys(refs.content);
    keys.forEach((name) => {
        if (name !== el) {
            refs.content[name].classList.add('hidden');
        }
    });
};
const showContacts = async () => {
    const data = await getAllContacts();
    refs.content.contacts.innerHTML = renderContacts(data);
};
const showUser = async () => {
    const data = await getAllUsers();
    refs.content.users.innerHTML = renderContacts(data);
};

list.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e.target.id);
        const key = e.target.id;
        switch (key) {
            case 'contacts':
                showContacts();
                break;
            case 'register':
                console.log(key);
                break;
            case 'login':
                console.log(key);
                break;
            case 'users':
                showUser();
                break;
            default:
                break;
        }
        removeHidden(key);
        addHidden(key);
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
refs.form.reset_form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.currentTarget.email.value);
    resetPasswordEmail(e.currentTarget.email.value);
});
