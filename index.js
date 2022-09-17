const express = require('express');
const app = express();
const morgan = require('morgan');

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.use(express.json());

morgan.token('personsInfo', function getName(req) {
    return JSON.stringify(
        {
            "name": req.body.name,
            "number": req.body.number
        })
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :personsInfo'));

app.get('/', (request, response) => {
    response.send(`
    <nav>
    <ul>
    <span style="float:right; margin: 0 1rem;"><a href="/api/persons" style="text-decoration: none;" target=_blank>Contact list</a></span>
    <span style="float:right; margin: 0 1rem;"><a href="/info" style="text-decoration: none;">Contact info</a></span>
    </ul>
    </nav>

    <h2>Hello and welcome to my Phonebook backend application. <br><br>

    To interact with the <u>entire</u> application, you will need to use <u><a href="https://www.postman.com/" target=_blank>Postman</a></u> or Visual Studio Code <u>REST Client Plugin</u>. <br><br>
    You may send GET requests to: <br>
    <ul><li>/</li>
    <li>/info</li>
    <li>/api/persons</li>
    <li>/api/persons/:id</li></ul> <br>

    You may send DELETE requests to: <br>
    <ul><li>/api/persons/:id</li></ul>

    You may send POST requests as JSON to: <br>
    <ul><li>/api/persons</li><br>
    example: <br>
    {<br>
        "name": "Hello world", <br>
        "number": "9876543" <br>
    }
    </h2>`);


})
app.get('/api/persons', (request, response) => {
    response.json(persons);
})
app.get('/info', (request, response) => {
    response.send(`
    <nav>
    <ul>
    <span style="float:right; margin: 0 1rem;"><a href="/api/persons" style="text-decoration: none;">Contact list</a></span>
    <span style="float:right; margin: 0 1rem;"><a href="/" style="text-decoration: none;">Home  </a></span>
    </ul>
    </nav>
    Phoneback has info for ${persons.length} people<br><br>${new Date()}`);
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = persons.find(contact => {
        console.log(`Item.id: ${contact.id} (${typeof contact.id}) // id: ${id} (${typeof id}) // item.id === id: (${contact.id === id})`)
        return contact.id === id
    })

    if (contact) {
        console.log(contact)
        response.json(contact);
    } else {
        response.status(404).end();
    }
})
const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(item => item.id)) : 0
    let randomId = maxId + Math.ceil(Math.random() * persons.length);
    return randomId;
}
app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    } else {
        persons.map((element) => {
            if (element.name.toLowerCase() === body.name.toLowerCase()) {
                return response.status(400).json({
                    error: 'contact exists'
                })
            }
        })
    }

    const contact = {
        id: generateId(),
        name: body.name,
        number: body.number,
        date: new Date(),
    }
    persons = persons.concat(contact)
    response.json(contact)
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contact = persons.filter(contact => contact.id !== id)
    
    console.log(contact);
    response.status(204).end()
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});