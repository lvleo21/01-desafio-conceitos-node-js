const express = require('express');
const server = express();

server.use(express.json());

const PROJECTS = [
    { id: "1", title: 'Novo projeto', tasks: [] }
];


function findById(id){
    let tempIndex = -1;

    PROJECTS.forEach( (item, index) => {
        if (id === item.id){
             tempIndex = index;
        }
    });

    return tempIndex;
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

    PROJECTS.push({
        id: `${id}`,
        title : `${title}`,
        tasks : []
    })

    return res.json(PROJECTS);
});

server.get("/projects", (req, res) => {
    return res.json(PROJECTS);
});

server.put("/projects/:id", userHasExist, (req, res) =>{
    const { title } = req.body;
    PROJECTS[req.index]['title'] = title;
    return res.json(PROJECTS[req.index]);
});

server.delete("/projects/:id", (req, res) =>{
    const { id } = req.params;
    let index = findById(id);
    PROJECTS.splice(index, 1);
    return res.send();
});

server.post("/projects/:id/tasks", (req, res) => {
    const { id } = req.params;
    const { titleTask } = req.body;

    let index = findById(id);


    PROJECTS[index]['tasks'].push(titleTask);

    return res.json(PROJECTS[index]);
});


server.listen(8000);

