export default (props, context) => {
  const { TODOS_PER_PAGE } = context || {};
  const { todos } = props || {};
  if (todos.length <= TODOS_PER_PAGE) {
      return `<noscript/>`;
  }
  const totalButtons = todos.length / TODOS_PER_PAGE;
  let buttonsString = "";
  for (let i = 1; i <= totalButtons; i++) {
      buttonsString = buttonsString + `<button id="${i}" class="pagination-button">${i}</button>`;
  }
  return `${buttonsString}`;
};
