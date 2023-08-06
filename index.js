let taskIDCounter = 0
let taskList = []

const TASK_STATUS = Object.freeze({
    todo: 'todo',
    done: 'done',
})

function changeTaskList(newTaskList) {
    if(!newTaskList) {
        return
    }
    taskList = newTaskList
    renderTasks()
}

function taskFactory(text = '', status = TASK_STATUS.todo) {
    if (typeof text !== 'string') {
        return
    }

    if (status !== TASK_STATUS.todo && status !== TASK_STATUS.done) {
        return
    }
    
    const taskObject =  {
        id:`task-uuid-${taskIDCounter}`,
        text,
        status, // status: status
    }

    taskIDCounter++

    return taskObject
}


// function renderTask(taskObject) {
//     if (!taskObject || typeof taskObject !== 'object') {
//         return
//     }

//     const classes = {
//         todoListItem: ['rounded-xl', 'p-2', 'mt-1', 'flex', 'justify-between']
        // todolistItem__done = []
//     }

//     const li = document.createElement('li')
//     // li.classList.add('rounded-xl', 'p-2', 'mt-1', 'flex', 'justify-between')
//     // li.classList.add(classes.todoListItem)
//     li.classList.add('todoListItem')

//     const p = document.createElement('p')
//     p.innerHTML = taskObject.text
    
//     const div = document.createElement('div')
//     const check = document.createElement('span')
//     check.classList.add('fa', 'fa-check-circle', 'text-green-500')

//     const deleteBtn = document.createElement('span')
//     deleteBtn.classList.add('fa', 'fa-minus-circle', 'text-red-500')

//     if (taskObject.status === TASK_STATUS.todo) {
//         // li.classList.add('bg-gray-100')
//         li.classList.add('todoListItem--todo')
//     } else if (taskObject.status === TASK_STATUS.done) {
//         // li.classList.add('bg-green-100')
//         li.classList.add('todoListItem--done')
//         p.classList.add('line-through')
//     }

//     li.appendChild(p)
//     div.appendChild(deleteBtn)
//     div.appendChild(check)
//     li.appendChild(div)

//     return li
// }

function renderTask(taskObject) {
    if (!taskObject || typeof taskObject !== 'object') {
        return
    }

    let todoListStateClass = ''
    if (taskObject.status === TASK_STATUS.todo) {
        todoListStateClass = 'bg-gray-100'
    } else if (taskObject.status === TASK_STATUS.done) {
        todoListStateClass = 'bg-green-100'
    }
    return `<li class="rounded-xl p-2 mt-1 flex justify-between ${todoListStateClass}">
                <p class = ${taskObject.status === TASK_STATUS.done ? 'line-through': ''}>${taskObject.text}</p>
                <input value='${taskObject.text}' display='none'>
                <div>
                    <span class="fa fa-minus-circle cursor-pointer text-red-500" data-action="delete" data-target="${taskObject.id}"></span>
                    <!-- <span class="fa fa-minus-circle cursor-pointer text-red-500" onclick="deleteHandler('${taskObject.id}')"></span>  -->
                    <span class="fa fa-check-circle cursor-pointer text-green-500" data-action="update" data-target="${taskObject.id}"></span>
                </div>
            </li>`
}

// function renderTaskTemplate(taskObject) {
//     if (!taskObject || typeof taskObject !== 'object') {
//         return
//     }

//     const template = document.querySelector('template')
//     const clone = template.content.cloneNode(true)

//     const p = clone.querySelector('p')
//     p.innerHTML = taskObject.text
    
//     const li = clone.querySelector('li')

//     let todoListStateClass = ''
//     if (taskObject.status === TASK_STATUS.todo) {
//         li.classList.add('bg-gray-100')
//     } else if (taskObject.status === TASK_STATUS.done) {
//         li.classList.add('bg-green-100')
//         p.classList.add('line-through')
//     }

//     return clone
// }


function renderTasks() {
    const todoListElement = document.querySelector('#todo-list')
    let renederdTasks = []
    // todoListElement.innerHTML = ''
    for (let i = 0; i < taskList.length; i += 1) {
        // let renderedTask = renderTask(taskList[i])
        // todoListElement.appendChild(renderedTask)
        renederdTasks.push(renderTask(taskList[i]))
    }
    todoListElement.innerHTML = renederdTasks.join('\n')
}


// function renderTasksTemplate() {
//     const todoListElement = document.querySelector('#todo-list')
//     todoListElement.innerHTML = ''
//     for (let i = 0; i < taskList.length; i += 1) {
//         let renderedTask = renderTaskTemplate(taskList[i])
//         todoListElement.appendChild(renderedTask)
//         // renederdTasks.push(renderTask(taskList[i]))
//     }
//     // todoListElement.innerHTML = renederdTasks.join('\n')
// }


function createTask(text = '') {
    const task = taskFactory(text)
    // taskList.push(task)
    // renderTasks()
    // renderTasksTemplate()
    changeTaskList([...taskList, task])
}

function deleteTask(taskID) {
    if (typeof taskID !== 'string' || !taskID ) {
        return
    }
    let newTaskList = []
    for(let i = 0; i < taskList.length; i++) {
        if (taskList[i].id !== taskID)  {
            newTaskList.push(taskList[i])
        }  
    }
    // taskList = newTaskList
    // renderTasksTemplate()
    // renderTasks()
    changeTaskList(newTaskList)
}

// function deleteTaskSplice(taskID) {
//     if (typeof taskID !== 'string' || !taskID ) {
//         return
//     }
//     for(let i = 0; i < taskList.length; i++) {
//         if (taskList[i].id === taskID)  {
//             taskList.splice(i, 1)
//         }  
//     }
//     // renderTasksTemplate()
//     renderTasks()
// }

function deleteTaskFilter(taskID) {
    if (typeof taskID !== 'string' || !taskID ) {
        return
    }

    let newTaskList = taskList.filter(function(currentItem) {
        return currentItem.id !== taskID
    })

    taskList = newTaskList
    // renderTasksTemplate()
    renderTasks()
}


function updateTask(taskID, payload = {}) {
    // checking validity of taskID
    if (typeof taskID !== 'string' || !taskID ) {
        return
    }

    // code of updating tasks
    // const newTaskList = []
    const newTaskList = taskList.map(function(task){
        if (task.id === taskID) {
             let { text, status } = payload
            // let vText, vStatus 
            if (typeof text !== 'string') {
                text = task.text
            }

            if (
                typeof status !== 'string' ||
                (status !== TASK_STATUS.todo && status !== TASK_STATUS.done)
                ) {
                    status = task.status
                }

            return Object.assign({}, task, { text, status })

        } else {
            return task
        }
    })
    // for (let i = 0; i < taskList.length; i++) {
    //     let currentTask = taskList[i]
    //     if (taskID === taskList[i].id) {
    //         let { status, text } = payload
    //         // let vText, vStatus 
    //         if (typeof text !== 'string') {
    //             text = currentTask.text
    //         }

    //         if (
    //             typeof status !== 'string' ||
    //             (status !== TASK_STATUS.todo && status !== TASK_STATUS.done)
    //             ) {
    //                 status = currentTask.status
    //             }

    //         currentTask = Object.assign({}, taskList[i], { text, status })

    //         // const { id, ...other} = payload
    //         // currentTask = Object.assign({}, taskList[i], other)
    //     }
        // newTaskList.push(currentTask)
    // }
    // taskList = newTaskList

    // since we are changing a task, we are changing taskList, 
    // and should render at the end
    // renderTasks()
    changeTaskList(newTaskList)
}


function deleteHandler(taskID) {
    // deleteTask(taskID)
    // deleteTaskSplice(taskID)
    deleteTaskFilter(taskID)
}

const createTaskForm = document.querySelector('#create-todo')
const createTaskInput = createTaskForm.querySelector('input')
const createTaskButton = createTaskForm.querySelector('button')


function createTaskHandler() {
    const value = createTaskInput.value
    if (!value) {
        return
    }
    createTask(value)
    createTaskInput.value = ''
}


createTaskButton.addEventListener('click', createTaskHandler)
createTaskInput.addEventListener('keypress', function(event) {
    if (event.key ==='Enter') {
        event.preventDefault()
        createTaskButton.click()
    }
})

const todoListElement = document.querySelector('#todo-list')
todoListElement.addEventListener('click', function(event){
    const targetEl = event.target
    console.log(targetEl.dataset.action)
    if (targetEl.dataset.action === 'delete') {
        const taskID = targetEl.dataset.target
        deleteTask(taskID)
    } else if (targetEl.dataset.action === 'update') {
        console.log('update call')
        const taskID = targetEl.dataset.target
        updateTask(taskID, {status: TASK_STATUS.done})
    }
})