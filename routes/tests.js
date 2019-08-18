const router = require('express').Router();
const Test = require('../db/models/test')
const Student = require('../db/models/student')

router.get('/', async (req,res,next)=>{
    try{
        let tests = await Test.findAll({
    })
        if(tests){
            res.send(tests)
        }

    }
    catch(error){
        next(error)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        let test = await Test.findOne({
            where:{
                id: req.params.id
            }
        })
        if(test){
            res.send(test)
        }
    }
    catch(error){
        next(error)
    }
})

router.post('/student/:studentId', async(req,res,next)=>{
    try{
    let student = await Student.findOne({
        where:{
            id: req.params.studentId
        }
    })
    let newTest = await Test.create(req.body)

    if(student){
        await newTest.setStudent(student)
        res.status(201).send(newTest)
    }
}
    catch(error){
        next(error)
    }
})

router.delete('/:id', async (req,res,next)=>{
    await Test.destroy({
        where:{
            id:req.params.id
        }
    })
    res.sendStatus(204)
})
module.exports = router;
