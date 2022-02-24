const { options } = require('../options/SQLlite3.js')
const knex = require('knex')(options)

const { promises: fs } = require('fs')

class contenedor {

    constructor(ruta) {
        this.ruta = ruta;
    }

   

    async getAllUsers() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async getAll() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
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

        /*const objs = await this.getAll()

        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }

        const newObj = { ...obj, id: newId }
        objs.push(newObj)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }*/
    }

    
}

module.exports = contenedor