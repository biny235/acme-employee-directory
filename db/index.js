const conn = require('./conn')
const Employee = require("./Employee");

const seed = ()=>{
    return Promise.all([
        Employee.create( {firstName: "Joe", lastName: "Johnson", nicknames: ['joe', 'joey']}),
        Employee.create( {firstName: "John", lastName: "Joeson", nicknames: ['john', 'joey']}),
        Employee.create( {firstName: "Jack", lastName: "Jackson", nicknames: ['jack', 'jacky'] }),
        Employee.create( {firstName: "Joe", lastName: "Joeson", nicknames: 'jack,jacky' })
    ])
};
const sync = ()=>{
    return conn.sync({ force: true })
};
module.exports = {
    seed,
    sync,
    models: {
        Employee
    }
};