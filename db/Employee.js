const conn = require('./conn');
const { Sequelize } = conn;

const Employee = conn.define("employee", {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    nicknames: Sequelize.ARRAY(Sequelize.STRING)
},
{   
    getterMethods:{
        fullName(){
            return `${this.firstName} ${this.lastName}`
        }
    },
    setterMethods:{
        nicknames: function(value){
            
            if(!Array.isArray(value)){
                console.log(value)
                const nicks = value.split(',');
                this.setDataValue('nicknames', nicks)
            }else{
                this.setDataValue('nicknames', value)
            }

        }
    }
});

module.exports = Employee;