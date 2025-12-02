import React from "react";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import { Inicio } from "../components/layout/pages/Inicio";
import { Articulos } from "../components/layout/pages/Articulos";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Crear } from "../components/layout/pages/Crear";

export const Rutas = () => {
    return (
        <BrowserRouter>
        {/*LAYOUT*/}
        <Header/>
        <Nav/>

        {/*contenido central y rutas*/}
        <section id="content" className="content">
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/articulos" element={<Articulos />} />
                <Route path="/crear-articulos" element={<Crear />} />


                </Routes>
                </section>

                <Sidebar/>
                <Footer/>
        
        </BrowserRouter>
    )


}