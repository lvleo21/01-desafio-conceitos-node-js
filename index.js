const express = require('express');
const server = express();

server.use(express.json());

const projects = [
    { id: "1", title: 'Novo projeto', tasks: [] }
];


function findById(id){
    return projects.findIndex(p => p.id == id);
}

function userHasExist(req, res, next){
    const { id } = req.params;
    let index = findById(id);

    if (index == -1){
        return res.status(404).json({
            error: "User not found, try again."
        });
    }

    req.index = index;
    return next();
}

server.post("/projects", (req, res) => {
    const { id, title } = req.body;

    projects.push({
        id,
        title,
        tasks : []
    })

    return res.json(projects);
});

server.get("/projects", (req, res) => {
    return res.json(projects);
});

server.put("/projects/:id", userHasExist, (req, res) =>{
    const { title } = req.body;
    projects[req.index]['title'] = title;
    return res.json(projects[req.index]);
});

server.delete("/projects/:id", userHasExist, (req, res) =>{
    projects.splice(req.index, 1);
    return res.send();
});

server.post("/projects/:id/tasks", userHasExist, (req, res) => {
    const { titleTask } = req.body;
    projects[req.index]['tasks'].push(titleTask);
    return res.json(projects[index]);
});


server.listen(8000);

