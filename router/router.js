// Función para renderizar usuarios
const renderUsers = () => {
  const fakeUsersData = [
    {
      userId: 1,
      id: 2,
      name: "Diego López",
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      name: "María García",
      completed: false,
    },
    {
      userId: 1,
      id: 4,
      name: "Alejandro Rodríguez",
      completed: true,
    },
    {
      userId: 2,
      id: 5,
      name: "Andrea González",
      completed: false,
    },
    {
      userId: 2,
      id: 6,
      name: "Pablo Martín",
      completed: true,
    },
    {
      userId: 2,
      id: 7,
      name: "Laura Pérez",
      completed: false,
    },
    {
      userId: 2,
      id: 8,
      name: "Lucía Sánchez",
      completed: false,
    },
    {
      userId: 3,
      id: 9,
      name: "Carlos Fernández",
      completed: true,
    },
    {
      userId: 3,
      id: 10,
      name: "Marta Jiménez",
      completed: false,
    },
  ];

  const userCardsContainer = document.querySelector(".cards-container");
  userCardsContainer.innerHTML = ""; // Limpia el contenido existente
  fakeUsersData.forEach((user) => {
    const card = createUserCard(user);
    userCardsContainer.appendChild(card);
  });
};

// Función para crear una tarjeta de usuario
const createUserCard = (user) => {
  const card = document.createElement("div");
  card.classList.add("user-card");

  card.innerHTML = `
    <h2>User ID: ${user.userId}</h2>
    <p>ID: ${user.id}</p>
    <p>Nombre: ${user.name}</p>
    <p>Completedo: ${user.completed ? "Si" : "No"}</p>
  `;

  if (user.completed) {
    card.classList.add("completed");
  } else {
    card.classList.add("not-completed");
  }

  return card;
};

/*Lorem Picsum API*/

const renderImages = async () => {
  const imageContainer = document.querySelector(".image-container");
  const loader = document.getElementById("loader");

  try {
    // Muestra el loader
    loader.style.display = "block";

    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=30"
    );
    const imagesData = await response.json();

    imagesData.forEach((image) => {
      const imageElement = createImageElement(image);
      imageElement.classList.add("fadeIn");
      imageContainer.appendChild(imageElement);
    });

    // Oculta el loader después de cargar las imágenes
    loader.style.display = "none";
  } catch (error) {
    console.error("Error al obtener imágenes de la API:", error);
    // Oculta el loader en caso de error
    loader.style.display = "none";
  }
};

// Función para crear un elemento de imagen con la imagen de la API
const createImageElement = (image) => {
  const img = document.createElement("img");
  img.src = image.download_url;
  img.alt = "Imagen";
  img.classList.add("api-image");

  return img;
};

/*TODOLIST*/
const renderTodoList = () => {
  const todoContainer = document.querySelector(".todo-container");
  todoContainer.innerHTML = ""; // Limpia el contenido existente

  const todoForm = document.createElement("div");
  todoForm.className = "todo-form";
  todoForm.innerHTML = `
    <input type="text" id="todo-input" placeholder="Escribe una tarea..." />
    <button id="add-todo">Agregar</button>
  `;
  todoContainer.appendChild(todoForm);

  const todoListContainer = document.createElement("div");
  todoListContainer.className = "todo-list";
  todoListContainer.innerHTML = `<ul id="todo-list"></ul>`;
  todoContainer.appendChild(todoListContainer);

  const todoInput = document.getElementById("todo-input");
  const addTodoBtn = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");
  // Agrega un nuevo elemento a la lista de tareas
  addTodoBtn.addEventListener("click", function () {
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      const todoItem = document.createElement("li");
      todoItem.textContent = todoText;
      todoItem.className = "todo-item";
      todoItem.addEventListener("click", function () {
        // Elimina el elemento de la lista al hacer clic en él
        this.parentNode.removeChild(this);
      });
      todoList.appendChild(todoItem);
      todoInput.value = "";
    }
  });
};

/* Código para el router */
const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);

  handleLocation();
};

const routes = {
  404: "/pages/404.html",
  "/": "../pages/index.html",
  "/about": "../pages/about.html",
  "/users": "../pages/users.html",
  "/todo": "../pages/todo.html",
};
// Función para manejar la ubicación de la página
const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());

  document.getElementById("main-page").innerHTML = html;
  switch (path) {
    case "/":
      document.title = "Home";
      break;
    case "/about":
      document.title = "About";
      renderImages();
      break;
    case "/users":
      document.title = "Users";
      renderUsers();
      break;
    case "/todo":
      document.title = "Todo";
      renderTodoList();
      break;
    default:
      document.title = "404";
      break;
  }
};
// Maneja el evento de cambio de ubicación
window.onpopstate = handleLocation;
window.route = route;

handleLocation();
