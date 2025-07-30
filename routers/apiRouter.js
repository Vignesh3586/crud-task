const router=require('express').Router()
const {getAllList,createTask,editTask,deleteTask,changeStatus,getTaskById}=require("../controllers/apiControllers")

router.patch("/change-status/:id",changeStatus)
router.get("/list",getAllList)
router.get("/list/:id",getTaskById)
router.post("/create",createTask)
router.put("/edit/:id",editTask)
router.delete("/delete/:id",deleteTask)

module.exports=router
