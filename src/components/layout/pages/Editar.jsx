import React, { useState } from 'react';
import { useForm } from "../../../hooks/useForm";
import { peticion } from '../../../helpers/peticion';
import { Global } from '../../../helpers/Global';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Editar = () => {

  // 1. Desestructuramos 'serializarFormulario' para uso directo
  // La función 'enviado' ya no es necesaria si manejamos la petición aquí
  const { formulario, cambiado, serializarFormulario } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState(null); //useState guarda datos dentro del componente y set cambia esos datos
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, [params.id])

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
    } catch (error) {
      console.error("Error al obtener artículos:", error);
    }
  }

  const editarArticulo = async (e) => {
    e.preventDefault();

    // 2. Serializar el formulario directamente al hacer submit, usando e.target
    let articuloActualizado = serializarFormulario(e.target);

    console.log("mostrar articulo");
    console.log(articuloActualizado); // ✅ Aquí verás los datos correctos (título, contenido, etc.)

    // 3. Actualizar el artículo en el backend con PUT
    const { datos } = await peticion(Global.url + "editar/" + params.id, "PUT", articuloActualizado);

    if (datos && datos.status === "success") {
      // Subir imagen si se selecciona una nueva
      const fileInput = document.querySelector("#file");

      if (fileInput.files && fileInput.files[0]) {
        const formData = new FormData();
        formData.append("file0", fileInput.files[0]);

        const subida = await peticion(Global.url + "subir-imagen/" + params.id, "POST", formData, true);

        if (subida && subida.datos && subida.datos.status === "success") {
          setResultado("guardado");
        } else {
          console.error("Error al subir la imagen:", subida);
          setResultado("error");
        }
      } else {
        // Si no hay nueva imagen, consideramos como éxito
        setResultado("guardado");
      }
    } else {
      console.error("Error al actualizar el artículo", datos);
      setResultado("error");
    }
  }

  return (
    <div className='jumbo'>
      <h1>Editar articulo</h1>
      {articulo ? (
        <>
          <p>Formulario para editar: {articulo.titulo}</p>

          {/* Mostrar el estado actual del formulario (Opcional, para depuración) */}
          <pre>{JSON.stringify(formulario)}</pre>

          {/* Mensajes de resultado */}
          <strong>{resultado === "guardado" ? "Articulo actualizado con éxito" : ""}</strong>
          <strong>{resultado === "error" ? "Error al actualizar el articulo" : ""}</strong>

          {/* Montar Formulario */}
          {/* Usamos 'editarArticulo' como handler del submit */}
          <form className='formulario' onSubmit={editarArticulo}>

            <div className='form-group'>
              <label htmlFor='titulo'>Titulo</label>
              <input type="text" name="titulo" onChange={cambiado} defaultValue={articulo.titulo} /> {/* 'cambiado' mantiene actualizado el estado 'formulario' */}
            </div>

            <div className='form-group'>
              <label htmlFor='contenido'>Contenido</label>
              <textarea name="contenido" onChange={cambiado} defaultValue={articulo.contenido} /> {/* 'cambiado' mantiene actualizado el estado 'formulario' */}
            </div>

            <div className='form-group'>
              <div className='mascara'>
                          {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen}/>}
                          {!articulo.imagen == "default.png" && <img src="https://cdn.sanity.io/images/3do82whm/next/a69e3ba2441d35dd1a7945e826064708f30c10a9-1000x667.jpg?w=1000&h=667&fit=clip&auto=format" alt={articulo.titulo} />}
                        </div>
              <label htmlFor='file0'>Imagen</label>
              <input type="file" name="file0" id="file" />
            </div>

            <input type="submit" value="Guardar" className="btn btn-success" />

          </form>
        </>
      ) : (
        <p>Cargando datos del artículo...</p>
      )}
    </div>
  )
}