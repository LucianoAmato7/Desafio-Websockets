// import fs from 'fs'

// const dataJSON = fs.readFileSync('./mensajes.txt', 'utf-8');
// const msjTxt = JSON.parse(dataJSON)

class MensajesRecord {

    constructor() {
        this.mensajes = [
            {email: "prueba", fyh: "DD/MM/YYYY HH:MM:SS", mensaje: "hola que tal"}
        ]
    }

    guardarMsj( data ) {
        
        this.mensajes.push(data)

        return this.mensajes

        // async function guardarMsj_()  {

        //     try{

        //         await fs.promises.writeFile('./mensajes.txt', JSON.stringify( msjTxt, null, '\t'))

        //         console.log(`mensaje guardado en archivo`);


        //     }catch (err) {

        //         console.log(`Se ha producido un error: ${err}`);

        //     } 
            
        // }

        // guardarMsj_()

    }


    MsjTodos(){
        
        if(this.mensajes){

            return this.mensajes

        } else {

            return []

        }

    }

}


export default MensajesRecord