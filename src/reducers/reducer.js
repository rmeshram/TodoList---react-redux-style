const reducer = (state, action) => {
  switch (action.type) {
      case "INIT":
          return { ...state };
      case "ADD_TODO":
          return {
              ...state,
              todos: state.todos.concat(action.data)
          };
      case "REMOVE_TODO":
          return { ...state, todos: state.todos.filter(todo => todo.id != action.data.id) };
      case "PAGINATION":
          return { ...state, currPageNo: action.data.id };
      case "FILTER_TODO":
          state = {
              ...state,
              filteredData: state.todos.filter(todo => {
                  return Object.values(todo).some(element =>
                      String(element)
                          .toLowerCase()
                          .includes(action.data.searchTerm)
                  );
              })
          };
          return state;
      case "SORT_TODO":
          return {
              ...state,
              todos: state.todos.sort((a, b) => (a["text"] > b["text"] ? 1 : -1))
          };
      case "TOGGLE_COMPLETED":
          state = {
              ...state,
              todos: state.todos.map(todo => {
                  if (todo.id == action.data.id) {
                      todo.completed = !todo.completed;
                  }
                  return todo;
              })
          };
          return state;
      default:
          return state;
  }
};

export default reducer;
