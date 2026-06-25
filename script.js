const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("date").textContent =
new Date().toDateString();

document.getElementById("addBtn").onclick = addTask;

input.addEventListener("keypress", function(e){
if(e.key==="Enter") addTask();
});

function addTask(){

const text=input.value.trim();

if(text==="") return;

if(tasks.some(t=>t.text.toLowerCase()===text.toLowerCase())){

alert("Task already exists.");

return;

}

tasks.push({

text:text,

completed:false

});

input.value="";

save();

}

function render(){

list.innerHTML="";

let completed=0;

tasks.forEach((task,index)=>{

const li=document.createElement("li");

const left=document.createElement("div");

left.className="left";

const check=document.createElement("input");

check.type="checkbox";

check.checked=task.completed;

check.onchange=()=>{

task.completed=!task.completed;

save();

};

const span=document.createElement("span");

span.textContent=task.text;

if(task.completed){

span.classList.add("completed");

completed++;

}

left.append(check,span);

const actions=document.createElement("div");

actions.className="actions";

const del=document.createElement("button");

del.textContent="🗑";

del.className="icon delete";

del.onclick=()=>{

tasks.splice(index,1);

save();

};

actions.appendChild(del);

li.append(left,actions);

list.appendChild(li);

});

document.getElementById("total").textContent=tasks.length;

document.getElementById("completed").textContent=completed;

document.getElementById("remaining").textContent=
tasks.length-completed;

document.getElementById("emptyMessage").style.display=
tasks.length===0?"block":"none";

}

function save(){

localStorage.setItem("tasks",JSON.stringify(tasks));

render();

}

document.getElementById("clearCompleted").onclick=()=>{

tasks=tasks.filter(t=>!t.completed);

save();

};

render();
