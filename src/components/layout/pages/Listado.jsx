import React from 'react'
import { Global } from '../../../helpers/Global';
import { peticion } from '../../../helpers/peticion';

export const Listado = ({articulos, setArticulos}) => {

  const eliminar = async (id) => {
    
    // CORRECCIÓN: Se cambió "articulo/" por "borrar/" para coincidir con la ruta del backend
    let resultado = await peticion(Global.url + "borrar/" + id, "DELETE");
    
    // Log de depuración mantenido para verificar el éxito de la API
    console.log("Resultado de la petición DELETE:", resultado); 

    // Verificación de seguridad y datos
    if (!resultado || !resultado.datos) {
        console.error("Error: La petición falló o el resultado es nulo/inválido.");
        return; 
    }

    if(resultado.datos.status === "success"){
      
      let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
      setArticulos(articulosActualizados);
    } else {
        console.error("Error al intentar eliminar el artículo. La API devolvió un estado no exitoso.", resultado.datos.mensaje);
    }
  }

  return (
    // Se mapean los artículos para mostrarlos en la lista
    articulos.map((articulo) => {
      return (
        <article key={articulo._id} className="articulo-item">
          <div className='mascara'>
            <img src="https://cdn.sanity.io/images/3do82whm/next/a69e3ba2441d35dd1a7945e826064708f30c10a9-1000x667.jpg?w=1000&h=667&fit=clip&auto=format" alt={articulo.titulo} />
          </div>
          <div className='datos'>
            <h3 className="title">{articulo.titulo}</h3>
            <p className="description">{articulo.contenido}</p>
            <button className="edit">Editar</button>
            <button 
              className="delete" 
              onClick={() => { eliminar(articulo._id) }}
            >
              Borrar
            </button>
          </div>
        </article>
      );
    })
  )
}