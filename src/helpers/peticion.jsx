

export const peticion = async (url, metodo, datosGuardar = "") => {

  
  let cargando = true; //una variable booleana para saber si esta cargando o no




  // Small artificial delay to show the "Cargando..." state while fetching
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

    const peticion = await fetch(url, opciones); //hace una peticion al servidor y asigna ese valor a la variable peticion
    const datos = await peticion.json(); //Asignar el valor que regrese la peticion ajax

    
    cargando = false;

  } catch (err) {
    console.error('Error fetching user:', err);
    (prev => ({ ...prev, datos: null, cargando: false }));




    return {
      datos,
      cargando
    }



  }
}