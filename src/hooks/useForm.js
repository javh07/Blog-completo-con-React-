import React, { useState } from 'react'

export const useForm = (objetoInicial = {} ) => {

    const [formulario, setFormulario] = useState(objetoInicial);
    
    // Función de serialización (extraída para ser reutilizada)
    const serializarFormulario = (elemento) => {
    
        const formData = new FormData(elemento);
    
        const objetoCompleto = {};
    
        for (let [name, value] of formData) {
            objetoCompleto[name] = value;
        }
    
        return objetoCompleto;
    
    }
    
    // Función que maneja el envío (actualiza el estado del hook)
    const enviado = (e) => {
        e.preventDefault();
    
        // Serializa y guarda en el estado interno (asíncrono)
        let curso = serializarFormulario(e.target);
        setFormulario(curso);

        e.target.classList.add("enviado");
    }
    
    // Función que maneja los cambios de input (actualiza el estado campo por campo)
    const cambiado = (e) => {
        // En este caso, 'e' es el evento del input, por lo que usamos e.target
        const { name, value } = e.target;
    
        setFormulario({
            ...formulario,
            [name]: value
    
        });
    
    }

    return {
        formulario,
        enviado,
        cambiado,
        serializarFormulario // ⬅️ FUNCIÓN EXPORTADA CLAVE
    }
}