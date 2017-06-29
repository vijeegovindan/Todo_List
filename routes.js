const routes = require('express').Router();
const models = require('./models');

const getTodoItem = function(req, res, next) {
  models.todolist.findById(req.params.taskid).then(function(todoitem) {
    if (todoitem) {
      req.todoitem = todoitem;
      next();
    } else {
      res.status(404).send("Record not found");
    }
  });
}

let getTodoList;

routes.get('/', function(req, res) {
  models.todolist.findAll().then(function(todolist){
    getTodoList = todolist;
    res.redirect('index');
  });
});

routes.get('/index', function(req, res) {
  res.render('index', {list:getTodoList});
});

//Post Method - 1. writing the list 2. Modifying the completed flag
routes.post("/index", function(req, res) {
  req.checkBody("todo", "Enter the task to add").notEmpty();
     const todo = {
       task: req.body.todo,
       completed: false
     };

     req.getValidationResult().then(function(error) {
       if (error.isEmpty()) {
           models.todolist.create(todo).then(function(data) {
           res.redirect("/");
         });
       } else {
           res.render("index",{failure: "Enter a todo item", list:getTodoList});
       }
    });
  });

routes.post("/index/:taskid/update", getTodoItem,  function(req, res) {
  const todo = {
  completed: true
  };
  req.todoitem.update(todo).then(function() {
    console.log('Marking it complete');
  res.redirect("/");
  });
});

routes.post("/index/:taskid/delete", getTodoItem,  function(req, res) {
  req.todoitem.destroy().then(function() {
  res.redirect("/");
  });
});

module.exports = routes;
