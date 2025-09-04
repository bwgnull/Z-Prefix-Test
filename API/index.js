const express = require('express');
const cors = require('cors');
const knex = require('knex')(
    require('./knexfile.js')[process.env.NODE_ENV || 'development']
);

const app = express();
const PORT = 8000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send(`Please Navigate to /users, /inventory, or /cart`)
});

//users

app.get('/inventory', (req, res) => {
    knex
        .select('*')
        .from('item')
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
});

app.get('/inventory/:id', (req, res) => {
    knex
        .select('*')
        .from('item')
        .where('id', '=', `${req.params.id}`)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
});

app.get('/inventory/users/:id', (req, res) => {
    knex
        .select('*')
        .from('item')
        .where('UserId', '=', `${req.params.id}`)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
});

app.post('/inventory', (req, res) => { //create
    let newItem = req.body;

    if (!Object.hasOwn(newItem, 'Item_name')) {
        return res.status(400).json({ error: 'Must provide Item_name property' });
    }
    if (!Object.hasOwn(newItem, 'Description')) {
        return res.status(400).json({ error: 'Must provide Description property' });
    }
    if (!Object.hasOwn(newItem, 'Quantity')) {
        return res.status(400).json({ error: 'Must provide Quantity property' });
    }
    if (!Object.hasOwn(newItem, 'UserId')) {
        return res.status(400).json({ error: 'Must provide UserId property' });
    }

    knex('item')
        .insert(newItem)
        .then((data) => res.status(200).send(data));
});

app.put('/inventory/:id', async (req, res) => { //update
    let updatedItem = req.body;

    try {
        const updated = await knex('item')
            .where({ id: req.params.id })
            .update(req.body)
            .returning('*'); 
        if (updated.length === 0) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(updated[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/inventory/:id', async (req, res) => { //delete
    try {
        const deleted = await knex('item').where({ id: req.params.id }).del();
        if (deleted) {
            res.json({ message: 'deleted' })
        } else {
            res.json({ message: 'could not delete' })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//users

app.get('/users', (req, res) => {
    knex
        .select()
        .from('users')
        .then(users => res.status(200).send(users))
        .catch(err => res.status(404).send(err))
})

app.post('/users', (req, res) => { //create
    let newUser = req.body;

    if (!Object.hasOwn(newUser, 'First_Name')) {
        res.status(400).send('Must provide First_Name property');
    }
    if (!Object.hasOwn(newUser, 'Last_Name')) {
        res.status(400).send('Must provide Last_Name property');
    }
    if (!Object.hasOwn(newUser, 'Username')) {
        res.status(400).send('Must provide Username property');
    }
    if (!Object.hasOwn(newUser, 'Password')) {
        res.status(400).send('Must provide Password property');
    }

    knex('users')
        .insert(newUser)
        .then((data) => res.status(200).send(data));
});

app.get('/users/:username', (req, res) => {
    const { username } = req.params
    knex
        .select("id")
        .from('users')
        .where("Username", username)
        .first()
        .then(userid => res.json(userid))
        .catch(err => res.status(500).json({ error: err.message }));
})

app.get('/users/:username/inventory', (req, res) => {
    const { username } = req.params;

    knex('users')
        .join('item', 'item.UserId', 'users.id')
        .where('users.Username', username)
        .select('item.id as ItemId', 'item.UserId', 'item.Item_name', 'item.Description', 'item.Quantity', 'users.id')
        .then(items => res.json(items))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/users/:username/:password', (req, res) => {
    const { username, password } = req.params;

    knex('users')
        .where({ Username: username, Password: password })
        .first()
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(401).json({ error: "Invalid creds" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});