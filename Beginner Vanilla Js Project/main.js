//selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo')

// Event Listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo); //agregamos un escuchador de eventos a la variable donde esta guardada la referencia al elemento select, este evento se dispara cuando hagamos click sobre el elemento select y activara una funcion llamada filterTodo
//

function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<li class="fas fa-check"></li>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<li class="fas fa-trash"></li>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //append to list
  todoList.appendChild(todoDiv);
  //Crear todo input value
  todoInput.value = ""
}

function deleteCheck(e){ //en este caso el parametro e hace referencia al evento que se disparo, en este caso un click
  const item = e.target; //en la constante item vamos a guardar una referencia al elemento al cual se le dio click
  //console.log(e.target)
  //delete todo
  if(item.classList[0] === 'trash-btn') {
    //console.log(item.classList.value) // si ese elemento al cual se le dio click tiene una clase llamada 'trash-btn' entre a ejecutar el codigo del if
    const todo = item.parentElement
    todo.classList.add('fall')
    todo.addEventListener('transitionend', function(){
      todo.remove() // vamos a remover del DOM al padre del hijo que tiene la clase 'trash-btn' 
    })
  }

  // check mark
  if(item.classList[0] === 'complete-btn') { // si el elemento al cual le damos click tiene como clase 'complete-btn', entre y corramos el codigo del if
    //console.log(item.classList.value) //
    const todo = item.parentElement // en la variable todo, almacenamos la referencia al elemento padre del elemento que tiene por clase 'complete-btn' 
    //console.log(todo)
    todo.classList.toggle('completed') // al elemento almacenado en la variable todo, le agregamos una clase llamada 'completed'. Esta clase lo que hace es pintar una linea continua atravesando por el medio el texto contenido en ese elemento y dandole una opacidad de 0.5 para que se vea casi transparente. 
  }
}

function filterTodo(e) {  //al hacer click sobre el elemento select, se hace un llamado a esta funcion que recibe como parametro el event
  const todos = todoList.childNodes; //en la variable 'todos' guardamos una referencia a todos los nodos hijos del elemento (ul en este caso)
  todos.forEach(function(todo) {
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;
      case 'completed':
        if(todo.classList.contains('completed')){
          todo.style.display = "flex";
        }else {
          todo.style.display = 'none';
        }
        break;
        case 'uncompleted':
          if(!todo.classList.contains('completed')){
            todo.style.display = "flex"; 
          }else {
            todo.style.display = 'none';
          }
          break;
    }
  });

}