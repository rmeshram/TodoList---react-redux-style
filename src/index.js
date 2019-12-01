import Header from "./components/Header.js";
import TodoBody from "./components/TodoBody.js";
import Footer from "./components/Footer.js";
import Pagination from "./components/Pagination.js";
import reducer from "./reducers/reducer.js";
import createStore from "./store.js";

const TODOS_PER_PAGE = 3;

const context = {
    TODOS_PER_PAGE
};

const initialState = {
    todos: [],
    currPageNo: 1,
    searchTerm: ""
};

const store = createStore(initialState, reducer, context);

export default class App {
    constructor() {
        store.subscribe((state, context) => {
            this.renderApp(state, context);
        });
        store.dispatch({
            type: "INIT"
        });
        this.attachEvents();
    }

    attachEvents() {
        document.querySelector(".container").addEventListener("click", this.handleEvent);
        document.querySelector("#search-box").addEventListener("change", this.handleFilter);
        document.querySelector("#search-box").addEventListener("keyup", this.handleFilter);
    }

    handleFilter(event) {
        const id = event.target.id;
        if (id != "search-box") return;
        const searchTerm = event.target.value || "";
        store.dispatch({
            type: "FILTER_TODO",
            data: {
                searchTerm
            }
        });
    }

    handleEvent(event) {
        const newTodo = document.querySelector("#add-todo-text").value;
        const { id, className } = event.target;
        switch (true) {
            case id === "add-todo":
                if (!newTodo) return alert("Enter valid String");
                store.dispatch({
                    type: "ADD_TODO",
                    data: {
                        id: (Math.random() * 100).toFixed(1) * 10,
                        text: newTodo,
                        completed: false
                    }
                });
                break;
            case className.includes("remove"):
                store.dispatch({
                    type: "REMOVE_TODO",
                    data: {
                        id
                    }
                });
                break;
            case className.includes("completed"):
                store.dispatch({
                    type: "TOGGLE_COMPLETED",
                    data: {
                        id
                    }
                });
                break;
            case id === "sort":
                store.dispatch({
                    type: "SORT_TODO"
                });
                break;
            case className.includes("pagination-button"):
                store.dispatch({
                    type: "PAGINATION",
                    data: {
                        id
                    }
                });
                break;
        }
    }

    renderApp(...args) {
      const container = document.querySelector(".container");
      container.innerHTML = `
        <div>
        ${Header(...args)}
        ${TodoBody(...args)}
        ${Pagination(...args)}
        ${Footer(...args)}
        </div>
        `;
    }
}

new App();
