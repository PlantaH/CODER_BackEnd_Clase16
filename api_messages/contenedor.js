const { optionsSQLite } = require('../options/SQLlite3.js')
const knex = require('knex')(optionsSQLite)

const { promises: fs } = require('fs')
 

class contenedor {
    
  
    async  getAll() {
        return await knex.from('messages').select('*')
    }

    async save(obj) { 

        knex('messages').insert(obj)
            .then(()=> console.log('datos insertados'))
            .catch((err)=>{ console.log(err);  throw err})                    
                
        return 'ok'
 
    }

    close() {
        return this.knex.destroy();
    }
   

}
   

module.exports =  contenedor