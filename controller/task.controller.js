const Task = require('../model/Task');  

const taskController = {}

taskController.createTask=async(req,res)=>{
    try{
        const { task, isComplete } = req.body;
        const newTask = new Task({task, isComplete})
        await newTask.save();
        res.status(200).json({status:'ok', data:newTask});
    } catch(err) {
        res.status(400).json({status:'fail', data:err});
    }
}

taskController.getTask=async(req,res)=>{
    try{
        const taskList = await Task.find({}).select("-_v");
        res.status(200).json({status:'ok', data:taskList});
    } catch(err) {
        res.status(400).json({status:'fail', data:err});
    }
}

// updateTask - 할 일 업데이트
taskController.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, isComplete } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { task, isComplete }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ status: 'fail', message: 'Task not found' });
        }
        res.status(200).json({ status: 'ok', data: updatedTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', data: err });
    }
};

// deleteTask - 할 일 삭제
taskController.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ status: 'fail', message: 'Task not found' });
        }
        res.status(200).json({ status: 'ok', message: 'Task deleted' });
    } catch (err) {
        res.status(400).json({ status: 'fail', data: err });
    }
};
module.exports = taskController;