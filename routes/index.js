const router = require('express').Router();
const db = require('../db')
const { Employee } = db.models;
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded())
router.use(require('method-override')('_method'))

router.get('/', (req, res, next)=>{
    let employeeCount, nicknameCount;
    res.render('index', {title: 'home', nickame: nicknameCount})
});

router.get('/employees', (req,res,next)=>{
    Employee.findAll()
        .then((employees)=>{
            res.render('employees', {title:'employees', employees })
        })
        .catch(next)
});

router.get('/employees/:id', (req, res, next)=>{
    Employee.findOne({where:{id: req.params.id}})
        .then(employee=>{
            res.render('employee', {title:`Employee: ${employee.fullName}`, employee })
        })
        .catch(next)
});

router.put('/employees/:id', (req, res, next)=>{
    Employee.findById(req.params.id)
        .then(employee => {
            return employee.update(req.body)
        })
        .then(()=> res.redirect('/employees'))
        .catch(next)
});

router.delete('/employees/:id', (req, res, next)=>{
    Employee.destroy({where:{id: req.params.id}})
        .then(()=>{
            res.redirect('/employees')
        })
        .catch(next)
});

router.post('/employees', (req, res, next)=>{
    Employee.create(req.body)
        .then(res.redirect('/employees'))
        .catch(next)
});

router.use((err, req, res, next)=>{
    res.render('error', {title: 'ERROR', error: err})
})


module.exports = router