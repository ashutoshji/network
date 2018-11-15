import { observable, computed, toJS, action } from "mobx";
import { getTodosForUser } from "../services/API";

class TodoStore {
  @observable
  rawTodoList = [];

  /**
   * Retrieve user list from backend and save to store
   */
  @action
  loadTodoList = userId => {
    getTodosForUser(userId).then(todos => {
      this.rawTodoList = todos;
    });
  };

  @action
  clearData() {
    this.rawTodoList = [];
  }

  @computed
  get todoList() {
    return toJS(this.rawTodoList);
  }
}
const todoStore = new TodoStore();
export default todoStore;
