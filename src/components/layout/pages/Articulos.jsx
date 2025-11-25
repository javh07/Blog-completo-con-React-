import React from 'react'
import { useState, useEffect } from 'react'
import { Global } from '../../../helpers/Global';

export const Articulos = () => {

  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    conseguirArticulos();
  }, [])

  const conseguirArticulos = async () => {
    try {
      const url = Global.url + "articulos";

      let peticion = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();

      if (datos.status === "success") {
        setArticulos(datos.articulos)
      }
    } catch (error) {
      console.error("Error al obtener artículos:", error);
    }
  }

  return (
    <>
      {
        articulos.length >= 1 ? (
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
                  <button className="delete">Borrar</button>
                </div>
              </article>
            );
          })
        ) : (
          <p>No hay artículos</p>
        )
      }
    </>
  )
}
