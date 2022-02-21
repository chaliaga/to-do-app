import {Component} from '@angular/core';
import {DataStore} from "aws-amplify";
import {Todo} from "../models";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do-app';
  models: Todo[] | undefined;
  taskTitle = '';
  taskDescription: string | undefined = '';
  id = '';
  currentAction = 'Add New';
  taskToUpdate: Todo | undefined;
  totalTask = '';
  currentDateTime: string | null = '';

  constructor(public datepipe: DatePipe) {
    this.currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
  }


  async ngOnInit() {
    await this.getTask();
  }

  async addTask() {
    if (this.taskTitle && this.taskDescription) {
      if (!this.id) {
        await DataStore.save(
          new Todo({
            "name": this.taskTitle,
            "description": this.taskDescription
          })
        );
      } else {
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
 to apply updates to the item’s fields rather than mutating the instance directly */
        await DataStore.save(Todo.copyOf(this.taskToUpdate, item => {
          item.name = this.taskTitle;
          item.description = this.taskDescription;
        }));
      }

      this.cleanForm();
      await this.getTask();
    }
  }

  async getTask() {
    this.models = await DataStore.query(Todo);
    this.totalTask = this.models.length.toString() + " Tasks for today";
  }

  async deleteTask(id: string) {
    const taskToDelete = <Todo>await DataStore.query(Todo, id);
    await DataStore.delete(taskToDelete);
    await this.getTask();
  }

  cleanForm() {
    this.id = '';
    this.taskTitle = '';
    this.taskDescription = '';
    this.currentAction = 'Add New';
  }

  async updateTask(id: string) {
    this.currentAction = 'Edit Task';
    this.taskToUpdate = <Todo> await DataStore.query(Todo, id);
    this.id = this.taskToUpdate.id;
    this.taskTitle = this.taskToUpdate.name;
    this.taskDescription = this.taskToUpdate.description;
  }
}
