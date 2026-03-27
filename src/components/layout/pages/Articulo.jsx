import React from 'react'
import { useState, useEffect } from 'react'
import { Global } from '../../../helpers/Global';
import { Listado } from './Listado';
import { useParams } from 'react-router-dom';


export const Articulo = () => {

  const [articulo, setArticulo] = useState(null); //useState guarda datos dentro del componente y set cambia esos datos
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, [])

  const conseguirArticulo = async () => {
    try {
      const url = Global.url + "articulo/" + params.id;

      let peticion = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();

      if (datos.status === "success") {
        setArticulo(datos.articulo)

      }
      setCargando(false);

    } catch (error) {
      console.error("Error al obtener artículos:", error);
    }
  }

  return (
    <div className='jumbo'>
      {cargando ? "Cargando.." :
        
     (
        articulo && articulo.titulo ? 
        (
          <>
          <div className='mascara'>
                      {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen}/>}
                      {!articulo.imagen == "default.png" && <img src="https://cdn.sanity.io/images/3do82whm/next/a69e3ba2441d35dd1a7945e826064708f30c10a9-1000x667.jpg?w=1000&h=667&fit=clip&auto=format" alt={articulo.titulo} />}
                    </div>
          
          <h1>{articulo.titulo}</h1>
          <p>{articulo.contenido}</p>
          </>
        )
        : <h1>No hay datos en el articulo</h1>
          
        

      )
      }
    </div>
  )
}

