const router = require('express').Router();
const db = require('../db')
const { Employee } = db.models;
const bodyParser = require('body-parser');
const path = require('path')
router.use(bodyParser.urlencoded())
router.use(require('method-override')('_method'))

router.use((req, res, next)=>{
    res.locals.path = req.url;
    let nickCount, employeeCount;

    Employee.findAll()
        .then(employees =>{
            employeeCount = employees.length;
            nickCount = employees.reduce((memo, employee)=>{
                return memo += employee.nicknames.length;
            }, 0)
            res.locals.employeeCount = employeeCount;
            res.locals.nickCount = nickCount;
            next()
            
        })
        .catch(next)
});

router.get('/', (req, res, next)=>{
    res.render('index', {title: 'Home'})
});

router.get('/employees', (req,res,next)=>{
    Employee.findAll()
        .then((employees)=>{
            res.render('employees', {title:'Employees', employees })
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