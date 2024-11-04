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
        console.log(error.response);
        return error.response;
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
        console.log(error.response);
        return error.response;
    }
};

// getAllUsers();
const registerUser = async () => {};
const loginUser = async (req) => {
    try {
        const data = await axios.post('/auth/login', req);
        console.log(data);
        // console.log(data.data.data.accessToken);
        accessToken = `Bearer ${data.data.data.accessToken}`;
        LS.reset('accessToken');
        LS.save('accessToken', accessToken);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
const resetPasswordEmail = async (req) => {
    console.log(req);
    try {
        const response = await axios.post('/auth/send-reset-email', {
            email: req,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};
const handleError = ({ status, statusText }) => {
    let message = '';
    if (status === 401) {
        message = ': You need to login!';
    }
    return `<div class="alert alert-danger" role="alert">Error ${status} - ${statusText}${message}</div>`;
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
    lists: {
        contacts_list: document.querySelector('.contacts-content ul'),
        users_list: document.querySelector('.users-content ul'),
    },
    form: {
        login_form: document.querySelector('#login-form'),
        reset_form: document.querySelector('#reset-form'),
    },
};

const list = Object.values(refs.panels);

const renderContacts = (data) => {
    console.log(data);
    if (data.status === 401) {
        return handleError(data);
    }

    const list = data.map(({ _id, name, email, phoneNumber, photo }) => {
        return `<li>
                <p><b>ID</b>: ${_id}</p>
                <p><b>Name</b>: ${name}</p>
                <p><b>Email</b>: ${email}</p>
                <p><b>Phone</b>: ${phoneNumber ?? 'no phone'}</p>
                <p><b>Photo</b></p>
                ${photo ? `<img src="${photo}" class="avatar">` : 'no photo'}
            </li>`;
    });
    return list.join('');
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
    refs.lists.contacts_list.innerHTML = renderContacts(data);
};
const showUser = async () => {
    const data = await getAllUsers();
    refs.lists.users_list.innerHTML = renderContacts(data);
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

refs.form.login_form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
    };
    const result = await loginUser(user);
    if (result.status === 200) {
        refs.form.login_form.insertAdjacentHTML(
            'afterend',
            '<span class="alert alert-success">You are logged in Successfully</span>',
        );
        refs.form.login_form.remove();
    }
});
refs.form.reset_form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.currentTarget.email.value);
    resetPasswordEmail(e.currentTarget.email.value);
});
