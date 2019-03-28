import express from 'express'
import db from './db/db'
import bodyParser from 'body-parser'
import HomeRoute from './routes/index'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/',HomeRoute)

app.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
        success: 'true',
        todos: db
    })
})

app.post('/api/v1/todos', (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        })
    }
    else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        })
    }
    const todo = {
        id: db.length + 1,
        title: req.body.title,
        description: req.body.description
    }
    db.push(todo)
    return res.status(201).send({
        success: 'true',
        message: 'todo added',
        todo
    })
})

app.get('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    db.map((todo) => {
        if (todo.id === id) {
            return res.status(200).send({
                success: 'true',
                todo
            })
        }
    })
    return res.status(404).send({
        success: 'false',
        message: 'to do not exists'

    })
})

app.delete('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    db.map((todo, index) => {
        if (todo.id === id) {
            db.splice(index, 1)
            return res.status(200).send({
                success: 'true',
                message: 'deleted'
            })
        }
    })
    return res.status(404).send({
        success: 'failed',
        message: 'not found'
    })
})

app.put('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
        if (todo.id === id) {
            todoFound = todo;
            itemIndex = index;
        }
    });

    if (!todoFound) {
        return res.status(404).send({
            success: 'false',
            message: 'todo not found',
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required',
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required',
        });
    }

    const updatedTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        description: req.body.description || todoFound.description,
    };

    db.splice(itemIndex, 1, updatedTodo);

    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        updatedTodo,
    });
});

const port = 5000
app.listen(port, () => {
    console.log('run')
})