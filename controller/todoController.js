const express = require('express');
const route = express.Router();
const controller = require('../controller/todoController');
const uuid = require('uuid-random');
const qs = require('qs');

const toDoDatas = [];

// Get All To Do List
exports.getToDoListAll = async(req,res) => {
    res.status(201).json(toDoDatas);
}

// Get All To Do List based on url 
exports.getToDoListFilter = (req, res) => {
    /* filter with id*/
//    const idResult = toDoDatas.find(item => item.id === req.params.id);
//    console.log(toDoDatas);
//    if(!idResult) {
//     return res.status(400).json("ID doesn't exist");
//    }
//    res.status(200).json(tempResult);

    /* filter with query that pass in url but get only first match list*/
    // const urlQuery = req.query;
    // console.log("URL query : ", urlQuery);
    // const filterResult = toDoDatas.filter(item => {
    //     for(let key in urlQuery) {
    //         if(urlQuery[key] == item[key]) {
    //             return true;
    //         }
    //     }
    // })
    // if(!filterResult) {
    //     res.status(404).json("No context found");
    // }
    // res.status(200).json(filterResult);

    /* filter with querys that pass in url , get all match data*/
    const urlQuery = req.query;
    const filterResult = toDoDatas.filter(item => {
        return Object.keys(urlQuery).every(key => {
            return urlQuery[key] === item[key];
        });
    });

    if (filterResult.length === 0) {
        res.status(404).json("No context found");
    }
    res.status(200).json(filterResult);
}

// Create new To Do List
exports.createToDoList = (req , res) => {
    const tempToDOs = Array.isArray(req.body)? req.body : [req.body];
    const createdToDos = tempToDOs.map(item => {
        const newToDos = {
            id: uuid(),
            title: item.title,
            description: item.description,
            date: item.date,
            status: item.status
        };
        toDoDatas.push(newToDos);
        return newToDos;
    });
    res.status(201).json(createdToDos);
    
    // const newToDo = {
    //     id:uuid(),
    //     date: req.body.date,
    //     title: req.body.title,
    //     description: req.body.description,
    //     status: req.body.status
    // };
    // await toDoDatas.push(newToDo);
    // res.status(201).json(newToDo);
};

// Update to do list 
exports.updateToDoList = (req, res) => {
    const updatetodo = toDoDatas.find(item => item.id === req.params.id);
    if (!updatetodo) {
        return res.status(404).json("ID Doesn't exist");
    }
    updatetodo.title = req.body.title || updatetodo.title;
    updatetodo.description = req.body.description || updatetodo.description;
    updatetodo.date = req.body.date || updatetodo.date;
    updatetodo.status = req.body.status || updatetodo.status;
    
    res.status(200).json(toDoDatas);
    console.log(toDoDatas);
}

// Delete Update List 
exports.deleteToDoList = (req, res) => {
    const deleteIndex = toDoDatas.findIndex(item => item.id === req.params.id);
    if (deleteIndex === -1) {
        return res.status(404).json("ID Doesn't exist");
    }
    toDoDatas.splice(deleteIndex,1);
    res.json(toDoDatas,{message: 'Todo Deleted'});
}
