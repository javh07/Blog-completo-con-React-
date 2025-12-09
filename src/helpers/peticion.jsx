

export const peticion = async (url, metodo, datosGuardar = "") => {

  
  let cargando = true; //una variable booleana para saber si esta cargando o no




  
  try {
    await new Promise(resolve => setTimeout(resolve, 1200)); 
    //Hasta que la promesa no se resuelva, pausa la ejecucion 1.2 segundos



    let opciones = { //opcion premeditada
      method: "GET"

    }

    if (metodo == "GET" || metodo == "DELETE") {
      opciones = {
        method: metodo,
      }
    }


    if (metodo == "POST" || metodo == "PUT") { //Datos cuando llega una peticion con post o put
      opciones = {
        method: metodo,
        body: JSON.stringify(datosGuardar), //pasar como parametro para convertir a JSON
        headers: {
          "Content-Type": "application/json" //Formato que recibe el api
        }
      }

    }

    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    
    cargando = false;

    return {
      datos,
      cargando
    }

  } catch (err) {
    console.error('Error fetching:', err);
    return {
      datos: null,
      cargando: false
    }



  }
}