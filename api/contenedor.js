 
const { options } = require('../options/mariaDB.js')
const knex = require('knex')(options)
 
 
/*CLASES*/

class product{
    constructor(title,price,thumb) {
        this.id = 0;
        this.title = title; 
        this.price = price;  
        this.thumb = thumb;          
    }
}

module.exports =  class contenedor{
    
    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    save(title,price,thumb){  
        let producto = new product(title,price,thumb)

        knex('products').insert(producto)
            .then(()=> console.log('datos insertados'))
            .catch((err)=>{ console.log(err);  throw err})
            .finally(()=>{
                knex.destroy()
          })            
  
        let data = 'ok'
        
        return data  
    }
     

    //getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    getAll(){ 
        let data = []
        let row
        knex.from('products').select('*')
        .then((rows)=> {
            data = JSON.stringify(rows)
            /*for (row of rows){
                c += JSON.stringify(row) ;	
            }*/
            console.log(data);
            return JSON.parse(data)  
        })
  
       /* let row
        knex.from('products').select('*')
        .then((rows)=> {
            for (row of rows){
                console.log(row);	
            }
        })
        .catch((err)=>{ console.log(err);  throw err})
        .finally(()=>{
            knex.destroy()
        })*/

 
        /*try {          
            
            let items 
            knex.from('products').select('*')
            .then((rows)=> {
                items = rows;   
                console.log(rows);         
            })
            .catch((err)=>{ console.log(err);  throw err})
            .finally(()=>{
                knex.destroy()
            })
            console.log(items);

            data = JSON.parse(items)
        } catch (err) {
            data = 'Esta vacio'
        }*/
         
    }
  
}
/*FIN CLASES*/
 