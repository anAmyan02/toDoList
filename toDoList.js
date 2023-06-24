let storedItems = localStorage.getItem("toDoItems");
let toDoItems = [];

if (storedItems) {
  toDoItems = JSON.parse(storedItems);
}

let div = document.createElement("div");
document.body.appendChild(div);
div.classList.add("div");

let p = document.createElement("p");
p.classList.add("p");
p.textContent = "Напоминания";
div.appendChild(p);

let div2 = document.createElement("div");
div.appendChild(div2);
div2.classList.add("div2");

let addList = document.createElement("div");
addList.id = "addList";
div.appendChild(addList);

let circle = document.createElement("div");
circle.id = "circle";
addList.appendChild(circle);
circle.textContent = "+";

let circleText = document.createElement("p");
circleText.id = "circleText";
addList.appendChild(circleText);
circleText.textContent = "Напоминания";

appendToDoList();

addList.addEventListener("click", function () {
  let toDoDiv = document.createElement("div");
  div2.appendChild(toDoDiv);
  toDoDiv.classList.add("toDoDiv");

  let radio = document.createElement("input");
  radio.setAttribute("type", "checkbox");
  radio.classList.add("radio");

  toDoDiv.appendChild(radio);
  let toDoText = document.createElement("input");
  toDoDiv.appendChild(toDoText);
  toDoText.classList.add("toDoText");

  toDoText.addEventListener("blur", function () {
    toDoItems.push(toDoText.value);

    localStorage.setItem("toDoItems", JSON.stringify(toDoItems));

  });

  radio.addEventListener("change", function () {
    
    if (this.checked) {
      toDoText.classList.add("completed");
    } else {
      toDoText.classList.remove("completed");
    }
  });

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete";
  toDoDiv.appendChild(deleteButton);
  deleteButton.addEventListener("click", deleteItem);
});

function appendToDoList() {
  for (let i = 0; i < toDoItems.length; i++) {
    let toDoDiv = document.createElement("div");
    div2.appendChild(toDoDiv);
    toDoDiv.classList.add("toDoDiv");

    let radio = document.createElement("input");
    radio.setAttribute("type", "checkbox");
    radio.classList.add("radio");
    toDoDiv.appendChild(radio);

    let toDoText = document.createElement("input");
    toDoDiv.appendChild(toDoText);
    toDoText.classList.add("toDoText");
    toDoText.value = toDoItems[i];

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";
    toDoDiv.appendChild(deleteButton);
    deleteButton.addEventListener("click", deleteItem);
  }
}

function deleteItem(event) {
  let toDoDiv = event.target.parentNode;
  let index = Array.from(div2.children).indexOf(toDoDiv);

  toDoDiv.remove();

  toDoItems.splice(index, 1);

  localStorage.setItem("toDoItems", JSON.stringify(toDoItems));
}

let select = document.querySelector(".select");
select.addEventListener("change", function () {
  let option = select.value;
  let toDoDivs = div2.querySelectorAll(".toDoDiv");

  toDoDivs.forEach(function (toDoDiv) {
    if (option === "All") {
      toDoDiv.style.display = "flex";
    } else if (option === "Complated" && toDoDiv.querySelector(".radio").checked) {
      toDoDiv.style.display = "flex";
    } else if (option === "Uncomplated" && !toDoDiv.querySelector(".radio").checked) {
      toDoDiv.style.display = "flex";
    } else {
      toDoDiv.style.display = "none";
    }
  });
});
