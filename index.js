let taskIDCounter = 0
const taskList = []

const TASK_STATUS = Object.freeze({
    todo: 'todo',
    done: 'done',
})

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
                <div>
                    <span class="fa fa-minus-circle text-red-500"></span>
                    <span class="fa fa-check-circle text-green-500"></span>
                </div>
            </li>`
}

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


function createTask(text = '') {
    const task = taskFactory(text)
    taskList.push(task)
    renderTasks()
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