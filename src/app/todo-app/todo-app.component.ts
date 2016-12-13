// Imports
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {Todo} from '../todo';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css'],
  providers: [TodoService]
})

export class TodoAppComponent implements OnInit {
  // These will be used to subscribe to the Observable collection
  todos: Observable<Todo[]>;
  singleTodo$: Observable<Todo>;

  newTodo: Todo = new Todo();

  constructor(private todoService: TodoService) { 
  }

  // initialise component
  ngOnInit() {
    // Subscribe to the observable collection
    this.todos = this.todoService.todos;

    // subscribe to only one todo (example only)
    this.singleTodo$ = this.todoService.todos.map(todos => todos.find(item => item.id == 'l'));

    //load all todos
    this.todoService.loadAll();
    // load only todo with id of 'l'
    this.todoService.load('l');
  }

  addTodo() {
    // set date and convert to correct format
    this.newTodo.createdAt = new Date().toJSON();

    // Pass to service to create
    this.todoService.create(this.newTodo);

    // Create a newTodo - required as old object will still be bound
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoService.toggleTodoComplete(todo);
  }

  deleteTodo(todo) {
    this.todoService.remove(todo.id);
  }
  
}
