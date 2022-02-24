const { optionsSQLite } = require('../options/SQLlite3.js')
const knex = require('knex')(optionsSQLite)

const { promises: fs } = require('fs')

class contenedor {

    
    async getAll() {
        try {
            let row = []
            
            knex.from('messages').select('*')
            .then((rows)=> {
                for (row of rows){
                    console.log(`${row.id}  ${row.autor}  `);	
                }
            })
            .catch((err)=>{ console.log(err);  throw err})
            .finally(()=>{
                knex.destroy()
            })

            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async save(obj) { 

        knex('messages').insert(obj)
            .then(()=> console.log('datos insertados'))
            .catch((err)=>{ console.log(err);  throw err})
            .finally(()=>{
                knex.destroy()
          })            
  
        let data = 'ok'
        
        return data  
 
    }

    
}

module.exports = contenedor