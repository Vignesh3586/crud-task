const editForm = document.getElementById('update-form')
const url = "https://crud-task-three.vercel.app/api"
const paths=window.location.pathname.split('/')
const id=paths[paths.length - 1]

 let task;

 const getPost=async()=>{
  try {
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const finalURL = `${url}/list/${id}`
    const response = await fetch(finalURL, options)
    const responseData = await response.json()
    if (response.ok) {
      task = responseData
      renderTask()
    } else {
      throw new Error(responseData.message)
    }
  } catch (err) {
    alert(err.message)
  }
 }
  
getPost()

const renderTask=()=>{
     editForm['update-id'].value=task.id
     editForm['update-taskname'].value=task.taskName
     editForm['update-status'].checked=task.status
     editForm['update-date'].value=task.date
}

editForm.addEventListener('submit', async () => {
    try {
      const data = {
        taskName: editForm['update-taskname'].value,
        status: editForm['update-status'].checked,
        date: editForm['update-date'].value
      }
      const options = {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      const finalURL = `${url}/edit/${String(task.id)}`
      const response = await fetch(finalURL, options)
      const responseData = await response.json()
      if (response.ok) {
         window.location="https://crud-task-three.vercel.app"
      } else {
        throw new Error(responseData.message)
      }
    } catch (err) {
      alert(err.message)
    }
  })