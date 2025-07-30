const taskForm = document.getElementById('task-form')
const taskList = document.getElementById('task-list')

const url = "https://crud-task-three.vercel.app/api"

let tasks = []


taskForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  try {
    const data = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      taskName: taskForm['taskname'].value,
      status: taskForm['status'].checked,
      date: taskForm['date'].value
    }
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const finalURL = `${url}/create`
    const response = await fetch(finalURL, options)
    const responseData = await response.json()
    if (response.ok) {
      getAllTasks()
      taskForm.reset()
    } else {
      throw new Error(responseData.message)
    }
  } catch (err) {
    alert(err.message)
  }
})

const editTask = (id) => {
  window.location = `https://crud-task-three.vercel.app/update-form/${id}`
}

const deleteTask = async (id) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const finalURL = `${url}/delete/${id}`
    const response = await fetch(finalURL, options)
    const responseData = await response.json()
    if (response.ok) {
      getAllTasks()
    } else {
      throw new Error(responseData.message)
    }
  } catch (err) {
    alert(err.message)
  }
}

const changeStatus = async (id, status) => {
  try {
    const options = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    }
    const finalURL = `${url}/change-status/${id}`
    const response = await fetch(finalURL, options)
    const responseData = await response.json()
    if (response.ok) {
      getAllTasks()
    } else {
      throw new Error(responseData.message)
    }
  } catch (err) {
    alert(err.message)
  }

}

const getAllTasks = async () => {
  tasks = []
  try {
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const finalURL = `${url}/list`
    const response = await fetch(finalURL, options)
    const responseData = await response.json()
    if (response.ok) {
      tasks = responseData
      renderTasks()
    } else {
      throw new Error(responseData.message)
    }
  } catch (err) {
    alert(err.message)
  }
}

const renderTasks = () => {
  taskList.innerHTML = ""
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const section=document.createElement('section')
      section.classList.add('task')
      const input = document.createElement('input')
      input.type = "checkbox"
      input.checked = task.status
      input.onchange = () => changeStatus(task.id, input.checked)
      section.appendChild(input)
      const div1 = document.createElement('div')
      div1.innerText = task.taskName
      section.appendChild(div1)
      const div2 = document.createElement('div')
      div2.innerText = task.date
      section.appendChild(div2)
      const div3 = document.createElement('div')
      div3.classList.add('btn-group')
      const editBtn = document.createElement('button')
      editBtn.innerText = "edit"
      editBtn.onclick = () => editTask(task.id)
      div3.appendChild(editBtn)
      const deleteBtn = document.createElement('button')
      deleteBtn.innerText = "delete"
      deleteBtn.onclick = () => deleteTask(task.id)
      div3.appendChild(deleteBtn)
      section.appendChild(div3)
      taskList.appendChild(section)
    })

  } else {
    taskList.innerText = "No tasks"
  }
}

getAllTasks()
