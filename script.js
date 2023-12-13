const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')


const listToDo = [];

function newTodo() {
  const id = listToDo.length === 0 ? 0 : parseInt(listToDo[listToDo.length - 1].id) + 1;

  listToDo.push({
    id,
    isChecked: false,
    text: "",
  });

  itemCountSpan.innerHTML = listToDo.length;
  updateUnchecked();
  showList();
}

function showList() {
  let listHTML = "";
  listToDo.forEach((obj, index) => {
    listHTML += `
      <li class="${classNames.TODO_ITEM}" data-id="${obj.id}">
        <p>${index + 1}.</p>
        <input type="checkbox" ${obj.isChecked ? "checked" : ""} class="${classNames.TODO_CHECKBOX}" onclick="clickCheckBox(event)">
        <input type="text" class="${classNames.TODO_TEXT}" value="${obj.text}" onchange="changeText(event)">
        <button class="${classNames.TODO_DELETE}" onclick="deleteToDo(event)">X</button>
      </li>`;
  });
  list.innerHTML = listHTML;
}

function clickCheckBox(event) {
  const toDoItemId = event.target.parentNode.getAttribute("data-id");
  const item = listToDo.find((obj) => obj.id === parseInt(toDoItemId));
  item.isChecked = !item.isChecked;
  updateUnchecked();
}
function deleteToDo(event) {
  const idToDelete = event.target.parentNode.getAttribute("data-id");
  const indexToDelete = listToDo.findIndex((obj) => obj.id === parseInt(idToDelete));

  if (indexToDelete !== -1) {
    listToDo.splice(indexToDelete, 1);
    itemCountSpan.innerHTML = listToDo.length;
    updateUnchecked();
    showList();
  }
}

function changeText(event) {
  const toDoItemId = event.target.parentNode.getAttribute("data-id");
  const inputText = event.target;

  const item = listToDo.find((obj) => obj.id === parseInt(toDoItemId));
  item.text = inputText.value;
}

function updateUnchecked() {
  const countUnchecked = listToDo.filter((obj) => !obj.isChecked).length;
  uncheckedCountSpan.innerHTML = countUnchecked;
}
