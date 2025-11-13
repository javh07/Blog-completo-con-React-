import { useState } from 'react'
import { Inicio } from './components/layout/pages/inicio.jsx'
import { Articulos } from './components/layout/pages/Articulos.jsx'
import { Crear } from './components/layout/pages/Crear.jsx'



function App() {
  

  return (
    
      <div className="App">
        <h1>Blog con React</h1>

        <Inicio></Inicio>
        <Articulos/>
        <Crear/>

        
    </div>
  )
}

export default App
