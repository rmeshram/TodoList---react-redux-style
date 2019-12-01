export default (props, context) => {
    if (props.todos.length <= 0) {
        return `<div> No Todo Found </div>`;
    }

    const getTemplate = (id, text, completed) => {
        return `
			<li class="todo-list" key=${id}>
				<label for="${id}">
				<input type="checkbox"  ${completed ? "checked" : ""} class= "completed" id="${id}"> 
				<span class="todo-text ${completed ? "completed" : ""}">${text} </span>
				</label> 
				<button id=${id} class="remove">
					Remove
				</button>
			</li>`;
    };

    const getList = () => {
        const { todos, currPageNo, filteredData } = props;
        const { TODOS_PER_PAGE } = context || {};

        const lastRow = TODOS_PER_PAGE * currPageNo;
        const firstRow = lastRow - TODOS_PER_PAGE;
        const between = (first, last) => {
            return (todo, index) => {
                if (index >= first && last >= index) {
                    const { id, text, completed } = todo || {};
                    return getTemplate(id, text, completed);
                }
            };
		};
		
        const data = filteredData || todos;
        const todoList = data.map(between(firstRow, lastRow)).join("");
        return `<button id="sort"> Sort </button> ${todoList}`;
    };
    return `<div id="todo-list-container"><ol> ${getList()}</ol></div>`;
};
