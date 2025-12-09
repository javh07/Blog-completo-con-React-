import React, { useState } from 'react';
import { useForm } from "../../../hooks/useForm"; // Asegúrate que esta ruta sea correcta
import { peticion } from '../../../helpers/peticion';
import { Global } from '../../../helpers/Global';

export const Crear = () => {

    // 1. Desestructuramos 'serializarFormulario' para uso directo
    // La función 'enviado' ya no es necesaria si manejamos la petición aquí
    const { formulario, cambiado, serializarFormulario } = useForm({});
    const [resultado, setResultado] = useState("no_enviado");

    const guardarArticulo = async (e) => { 
        e.preventDefault();

        // 2. Serializar el formulario directamente al hacer submit, usando e.target
        let nuevoArticulo = serializarFormulario(e.target);

        console.log("mostrar articulo");
        console.log(nuevoArticulo); // ✅ Aquí verás los datos correctos (título, contenido, etc.)

        // 3. Guardar el articulo en el backend
        // Nota: Asegúrate que tu helper 'peticion' y 'Global.url' estén bien configurados
        const { datos, cargando } = await peticion(Global.url + "crear", "POST", nuevoArticulo);

        if (datos.status === "success") {
            setResultado("guardado");
        } else {
            setResultado("error");
        }

        console.log(datos);
        
        // 4. Limpiar el formulario después de guardar (Opcional)
        // e.target.reset(); 
    }

    return (
        <div className='jumbo'>
            <h1>Crear articulo</h1>
            <p>Formulario para crear un artículo</p>
            
            {/* Mostrar el estado actual del formulario (Opcional, para depuración) */}
            <pre>{JSON.stringify(formulario)}</pre>
            
            {/* Mensajes de resultado */}
            <strong>{resultado === "guardado" ? "Articulo guardado con éxito" : ""}</strong>
            <strong>{resultado === "error" ? "Error al guardar el articulo" : ""}</strong>
            
            {/* Montar Formulario */}
            {/* 5. Usamos 'guardarArticulo' como handler del submit */}
            <form className='formulario' onSubmit={guardarArticulo}>

                <div className='form-group'>
                    <label htmlFor='titulo'>Titulo</label>
                    <input type="text" name="titulo" onChange={cambiado} /> {/* 'cambiado' mantiene actualizado el estado 'formulario' */}
                </div>

                <div className='form-group'>
                    <label htmlFor='contenido'>Contenido</label>
                    <textarea name="contenido" onChange={cambiado} /> {/* 'cambiado' mantiene actualizado el estado 'formulario' */}
                </div>
                 
                 {/*
                <div className='form-group'>
                    <label htmlFor='imagen'>Imagen</label>
                    
                </div> 
                */}

                <input type="submit" value="Guardar" className="btn btn-success"/>

            </form>

        </div>
    )
}