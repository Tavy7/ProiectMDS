const tasks = document.querySelector('.tasks');
var inputValue = document.querySelector('.todoinput');
const add = document.querySelector('.createtodo');
var count = window.localStorage.getItem("ind")

if (count == undefined) {
    count = 0;
}


if (window.localStorage.getItem("todos") == undefined) {
    var todos = [];
    window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);

class item {
    constructor(name, f1 = 0, f2 = 0) {
        this.createItem(name, f1, f2);
        this.name = name;
        this.check_flag = f1;
        this.star_flag = f2;
        this.prio = 99;
    }
    createItem(name, f1, f2) {
        var task = document.createElement('div');
        var check = document.createElement('i');
        var input = document.createElement('p');
        var remove = document.createElement('i');
        var editbtn = document.createElement('button');
        var star = document.createElement("i");

        //momentan prajeala mahoarca
        let d = new Date();
        console.log(d)


        //se termina aici

        //todo
        editbtn.classList.add("edit-task", "fa", "fa-edit");

        task.classList.add('task');
        input.textContent = name;
        input.classList.add('text');
        input.contentEditable = "false";

        check = this.checkIcon(check, input, this, f1);
        remove = this.removeIcon(remove, name);
        editbtn = this.editTask(editbtn, name, input);
        star = this.starIcon(star, this, f2);

        tasks.insertBefore(task, tasks.firstChild);
        task.appendChild(check);
        task.appendChild(input);
        task.appendChild(star);
        task.appendChild(remove);
        task.appendChild(editbtn);

    }

    checkIcon(check, input, obj, flag) {
        if (flag == 1) {
            check.classList.add("fa-check-circle")
        }
        else {
            check.classList.add("far", "fa-circle", "unchecked");
        }
        check.addEventListener('mouseover', function (e) {
            if (!e.currentTarget.classList.contains("fa-check-circle")) {
                e.currentTarget.classList.remove("fa-circle", "unchecked")
                e.currentTarget.classList.add("fa-dot-circle")
            }
        }, false);

        check.addEventListener("mouseout", function (e) {
            if (!e.currentTarget.classList.contains("fa-check-circle")) {
                e.currentTarget.classList.remove("fa-dot-circle")
                e.currentTarget.classList.add("fa-circle", "unchecked")
            }
        }, false);

        check.addEventListener('click', function (e) {
            //da check
            var defaultstyle = input.style;
            if (e.currentTarget.classList.contains("fa-dot-circle")) {
                e.currentTarget.classList.remove("fa-dot-circle")
                e.currentTarget.classList.add("fa-check-circle")
                input.style.cssText = "text-decoration:line-through ; color:gray; opacity: 60%";
                obj.check_flag = 1;
                //local storage
                let ind = todos.indexOf(obj.name);
                todos[ind] = obj;
                window.localStorage.setItem("todos", JSON.stringify(todos));
            }
            else {
                //nu da check
                e.currentTarget.classList.remove("fa-check-circle")
                e.currentTarget.classList.add("fa-circle", "unchecked")
                input.style.removeProperty("text-decoration", "line-through");
                input.style = defaultstyle;
                obj.check_flag = 0;
                //local storage
                let ind = todos.indexOf(obj.name);
                todos[ind] = obj;
                window.localStorage.setItem("todos", JSON.stringify(todos));
            }
        }, false);

        return check;
    }


    editTask(editbtn, name, input) {

        editbtn.addEventListener("click", function (e) {

            editbtn.addEventListener("keypress", function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                }
            });

            if (input.contentEditable == "false") {
                input.contentEditable = "true";
                input.focus();
                editbtn.classList.remove("edit-task", "fa", "fa-edit");
                editbtn.classList.add("save-edit", "fal", "fa-clipboard-check");
                input.addEventListener("keypress", function (event) {
                    if (event.keyCode == 13) {
                        editbtn.classList.add("edit-task", "fa", "fa-edit");
                        editbtn.classList.remove("save-edit", "fal", "fa-clipboard-check");
                        input.contentEditable = "false"
                    }
                });
            }
            else {
                input.contentEditable = "false";
                editbtn.classList.add("edit-task", "fa", "fa-edit");
                editbtn.classList.remove("save-edit", "fal", "fa-clipboard-check");
            }

        /*let ind = todos.indexOf(name);//nu merge
        todos[ind] = input.textContent;
        window.localStorage.setItem("todos", JSON.stringify(todos));*/ 
        })
        
        return editbtn;
    }

    removeIcon(remove, name) {
        remove.classList.add("fal", "fa-trash-alt", "delete-task");
        remove.addEventListener("click", function (e) {
            e.currentTarget.parentNode.remove();
            let ind = todos.indexOf(name);
            todos.splice(ind, 1);

            count--;
            window.localStorage.setItem("todos", JSON.stringify(todos));
            window.localStorage.setItem("ind", JSON.stringify(count));
        }, false);

        return remove;
    }

    starIcon(star, obj, flag) {
        if (flag == 1) {
            star.classList.add("fas", "fa-star")
        }
        else {
            star.classList.add("far", "fa-star");
        }

        star.addEventListener("click", function (e) {
            if (e.currentTarget.classList.contains("far")) {//daca bifeaza steluta
                e.currentTarget.classList.remove("far")
                e.currentTarget.classList.add("fas")
                obj.star_flag = 1;
                //modifica local storage
                let ind = todos.indexOf(obj.name);
                todos[ind] = obj;
                window.localStorage.setItem("todos", JSON.stringify(todos));
                console.log("S a bifat steluta pentru itemul " + obj.name + " " + obj.star_flag)
            }
            else {//daca se debiefaza steluta
                e.currentTarget.classList.add("far")
                e.currentTarget.classList.remove("fas")
                obj.star_flag = 0;
                console.log(obj.star_flag)
                //modifica local storage
                let ind = todos.indexOf(obj.name);
                todos[ind] = obj;
                console.log(todos[ind])
                window.localStorage.setItem("todos", JSON.stringify(todos));
                console.log("S a bifat steluta pentru itemul " + obj.name + " " + obj.star_flag)
            }
        })
        return star;
    }
}

function check() {
    if (inputValue.value != "") {
        var x = new item(inputValue.value);
        todos.push(x);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        count++;
        window.localStorage.setItem("ind", count);
        inputValue.value = "";

        console.log("Exista " + count + " task-uri.")
    }
}

function compare(a, b) {
    const objA = a.star_flag;
    const objB = b.star_flag;
    let comparison = 0;
    if (objA > objB) {
        comparison = 1;
    }
    else if (objA < objB) {
        comparison = -1;
    }
    return comparison;
}

function main() {
    add.addEventListener('click', check);
    window.addEventListener('keydown', (e) => {
        if (e.which == 13) {
            check();
        }
    })

    for (let i = 0; i < todos.length; i++) {
        new item(todos[i].name, todos[i].check_flag, todos[i].star_flag);
        console.log("Check " + i + ": " + todos[i].check_flag);
        console.log("Star " + i + ": " + todos[i].star_flag);
        console.log(todos[i].name);
        // todos[i].reAddStars();  
        //console.log(todos[i].prio + " ");
    }

    console.log("Exista " + count + " task-uri.")
}

main()
