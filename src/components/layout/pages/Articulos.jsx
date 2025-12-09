import React from 'react'
import { useState, useEffect } from 'react'
import { Global } from '../../../helpers/Global';
import { Listado } from './Listado';


export const Articulos = () => {

  const [articulos, setArticulos] = useState([]); //useState guarda datos dentro del componente y set cambia esos datos
  const [cargando, setCargando] = useState(true);

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
      setCargando(false);

    } catch (error) {
      console.error("Error al obtener artículos:", error);
    }
  }

  return (
    <>
      {cargando ? "Cargando.." :
        
     (
        articulos.length >= 1 ? 
        <Listado articulos={articulos} setArticulos={setArticulos} /> 
        : <h1>No hay artículos</h1>
          
        

      )
      }
    </>
  )
}


