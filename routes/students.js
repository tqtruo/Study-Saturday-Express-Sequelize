const router = require('express').Router();
const Student = require('../db/models/student');


router.get('/', async (req, res, next)=>{
    try{
        let students = await Student.findAll()
        res.send(students);
    }
    catch(error){
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    try{
        let student = await Student.findOne({
            where:{
                id: req.params.id
            }
        })
        if(student){
            res.send(student)
        }
        else {
            res.sendStatus(404)
        }
    }
    catch(error){
        next(error)
    }
})

router.post('/', async (req, res, next)=>{
    try{
        let newStudent = await Student.create(req.body)
        if(newStudent){
            res.status(201).send(newStudent)
        }
    }
    catch(error){
        next(error)
    }
})

router.put('/:id', async (req, res, next)=>{
    try{
    let updatedStudent = await Student.update(req.body, {
        where:{
            id: req.params.id
        },
        returning: true,
        plain: true
    })
    //await console.log(updatedStudent)
    res.send(updatedStudent[1])
    }
    catch(error){
        next(error)
    }
})

router.delete('/:id', async (req, res, next)=>{
    try{
    let student = Student.findOne({
        where:{
            id: req.params.id
        }
    })
    if(student){
        Student.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(204).send(Student)
    }
}
    catch(error){
        next(error)
    }
})

module.exports = router;
