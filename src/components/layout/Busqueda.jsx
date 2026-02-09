import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Listado } from './pages/Listado';


export const Busqueda = () => {

  const [articulos, setArticulos] = useState([]); //useState guarda datos dentro del componente y set cambia esos datos
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    
    conseguirArticulos();
  }, []);

  useEffect(() => {
    
    conseguirArticulos(); //Se ejecuta cada vez que cambian los parámetros de la URL
  }, [params]); //Params (valores dinamicos de la URL)

  const conseguirArticulos = async () => {
    try {
      const url = Global.url + "buscar/" + params.busqueda;

      let peticion   = await fetch(url, {
        method: "GET"
      });

      let datos = await peticion.json();

      if (datos.status === "success") {
        setArticulos(datos.articulos) //Toma el array de articulos que mando el servidor y los guarda en el estado

      }else{
        setArticulos([]);//Limpia la lista, la deja en un array vacio
      }
      setCargando(false);//Ya termino de cargar y puede quitar el mensaje de carga

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



