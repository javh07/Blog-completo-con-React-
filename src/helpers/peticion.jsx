

export const peticion = async (url, metodo, datosGuardar = "") => {

  let cargando = true;

  // Configuración de la petición (metodo GET por defecto si no es POST/PUT)
  let opciones = {
    method: "GET"
  }

  if (metodo === "GET" || metodo === "DELETE") {
    opciones = {
      method: metodo,
    }
  }

  if (metodo === "POST" || metodo === "PUT") {
    opciones = {
      method: metodo,
      body: JSON.stringify(datosGuardar),
      headers: {
        "Content-Type": "application/json"
      }
    }
  }


  try {
    // Pausa la ejecución para simular latencia (opcional, pero mantenida)
    await new Promise(resolve => setTimeout(resolve, 1200));

    const respuesta = await fetch(url, opciones);

    // --- CAMBIO CLAVE 1: VERIFICAR LA RESPUESTA HTTP ---
    // Si la respuesta no es 2xx (ej. 404 o 500), lanzamos un error
    if (!respuesta.ok) {
      // Obtenemos el texto del error si no es un JSON válido
      const errorText = await respuesta.text();

      // Creamos un error más informativo, incluyendo el status de la API
      throw new Error(`Error HTTP: ${respuesta.status} - ${errorText}`);
    }

    // El servidor respondió OK. Intentamos parsear el JSON
    const datos = await respuesta.json();

    cargando = false;

    return {
      datos,
      cargando
    }

  } catch (err) {
    // --- CAMBIO CLAVE 2: DEVOLVER SIEMPRE LA ESTRUCTURA ESPERADA ---
    // Aquí caemos por error de red o error HTTP que lanzamos arriba.
    console.error('Error en peticion:', err);

    return {
      // Devolvemos una estructura que el componente Listado pueda leer
      datos: {
        status: "error", // Indicamos explícitamente el estado de error
        mensaje: err.message || "Error de conexión o del servidor"
      },
      cargando: false
    }
  }
}