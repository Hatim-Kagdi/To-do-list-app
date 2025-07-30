const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("Please write something!!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click" , function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

//Edit task
listContainer.addEventListener("dblclick", function (e) {
    if (e.target.tagName === "LI" && !e.target.classList.contains("checked")) {
        const li = e.target;
        const currentText = li.childNodes[0].nodeValue.trim(); // task text only
        const input = document.createElement("input");

        input.type = "text";
        input.value = currentText;
        input.className = "edit-input";
        input.style.padding = "5px";
        input.style.fontSize = "16px";
        input.style.width = "90%";

        li.innerHTML = ""; // clear existing li
        li.appendChild(input);

        input.focus();

        input.addEventListener("blur", () => finishEdit(li, input.value));
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                finishEdit(li, input.value);
            }
        });
    }
});

function finishEdit(li, newText) {
    if (newText.trim() === "") {
        alert("Task cannot be empty!");
        showTask(); // Reload saved data
        return;
    }

    li.textContent = newText;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();