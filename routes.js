const routes = require('express').Router();
const models = require('../models');

routes.get('/', function(req, res) {
 res.render('index');
});


const getTodoItem = function(req, res, next) {
  models.todolist.findById(req.params.id).then(function(todoitem){

  });
}

const getTodoItem = function(req, res, next) {
  models.todolist.findById(req.params.id).then(function(todoitem) {
    if (todoitem) {
      req.todoitem = todoitem;
      next();
    } else {
      res.status(404).send("Not Found");
    }
  });
}

//Post Method - 1. writing the list 2. Modifying the completed flag
routes.post("/index", function(req, res) {

    req.checkBody("todo", "Enter todo-item").notEmpty();

     const todo = {
       task: req.body.todo,
       completed: false
     };

     req.getValidationResult().then(function(result) {
       if (result.isEmpty()) {
           models.todolist.create(todo).then(function(data) {
           res.redirect("/index",{success: "Successfully added to the database"});
         });
       } else {
         res.redirect("/index");
       }
     });
}

routes.post("/index/:taskid/update", function(req, res) {

  const todo = {
    task: req.body.todo,
    completed: true
  }

  req.getValidationResult().then(function(result) {
    if (result.isEmpty()) {
        models.todolist.update(todo).then(function(data) {
        res.redirect("/index",{success: "Successfully updated to the database"});
      });
    } else {
      res.redirect("/index");
    }
  });

    res.redirect('/');
 });
}

routes.post("/index/:taskid/delete", function(req, res) {
  req.student.destroy().then(function() {
    res.redirect("/");
  });
}

module.exports = routes;
