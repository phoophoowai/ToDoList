const express = require('express');
const router = express.Router();
const controller = require('../controller/todoController');

router.get('/',controller.getToDoListAll);
router.get('/searchList',controller.getToDoListFilter);
router.post('/addlist', controller.createToDoList);
router.put('/updateList/:id',controller.updateToDoList);
router.delete('/delete/:id', controller.deleteToDoList);

module.exports = router;