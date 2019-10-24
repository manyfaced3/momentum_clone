  //toDoForm : greetings.js에 선언됨
  toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = 'toDos';
let toDos = [];


// todo 삭제
function deleteToDo(event){
  let btn = event.target;
  if(btn.classList.contains("far")){
    btn = event.target.parentNode;
  }
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

//만들어진 todo 로컬 스토리지에 저장
function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//const toDoList (ul) 안에 li 항목 삽입
//<li id = "1"><button>X</button><span>text</span></li>
function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1; //li tag id

  delBtn.addEventListener("click",deleteToDo);
  //delBtn.innerHTML = "❌";
  delBtn.innerHTML = `<i class="far fa-times-circle"></i>`;
  span.innerText = text;
  li.id = newId;
  li.appendChild(delBtn);
  li.appendChild(span);
  toDoList.append(li);
  const toDoObj = {
    text : text,
    id : newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

// toDo Form 기능
function toDoFormF(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

// toDo 목록 가져오기
function loadToDos(){
  const USER_LS = localStorage.getItem("currentUser");
  const loadedToDos = localStorage.getItem(TODOS_LS);
  // 로컬스토리지에 저장된 목록이 있다면 출력
  if(USER_LS !== null && loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(toDo => {
      paintToDo(toDo.text);
    });
  }
}


function init(){
  loadToDos();
  toDoForm.addEventListener("submit",toDoFormF);
}

init();