"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
function Navbar() {
  const [activeView, setActiveView] = useState<String>("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const handleSetActiveView = (view: string) => {
    setActiveView(view);
    setIsMenuOpen(false); //
  };

  useEffect(() => {
    if (pathname === "/") {
      setActiveView("Home");
    } else if (pathname.startsWith("/users/new")) {
      setActiveView("Crear Usuario");
    }
  }, [pathname]);

  return (
    <nav className="bg-black py-28 fixed left-0 ml-5 h-[calc(100vh-2rem)]">
      <div className="flex justify-center items-center px-6 py-2">
        {/* Botón de menú para dispositivos móviles */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white md:hidden p-2 rounded text-sm"
        >
          Menú
        </button>
      </div>

      <div
        className={`flex flex-col justify-center h-full px-6 py-4 ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="my-10">
          <Link href="/">
            <h1
              className={`text-white text-xl font-bold cursor-pointer ${
                activeView === "Home" ? "active" : ""
              }`}
              onClick={() => handleSetActiveView("Home")}
            >
              Usuario consulta
            </h1>
          </Link>
        </div>
        <ul className="flex flex-col gap-y-4">
          <li>
            <Link href="/users/new">
              <h1
                className={`text-white text-xl font-bold cursor-pointer ${
                  activeView === "Crear Usuario" ? "active" : ""
                }`}
                onClick={() => handleSetActiveView("Crear Usuario")}
              >
                Crear Usuario
              </h1>
            </Link>
          </li>
        </ul>
      </div>
      <style jsx>{`
        nav {
          width: 160px;
          border-top-left-radius: 3rem;
          border-bottom-left-radius: 3rem;
          border-top-right-radius: 2rem;
          border-bottom-right-radius: 2rem;
          z-index: 10;
          background-color: rgb(0, 0, 0, 5);
        }
        .active {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
          color: black;
          border-radius: 30px;
          padding: 30px 30px;
        }
        @media (max-width: 768px) {
          nav {
            width: 60px; // Ajustando el ancho para móviles
            height: 60px; // Ajustando la altura para móviles
            padding: 0; // Eliminando el padding
            border-radius: 50%; // Haciendo la navbar circular
            top: 10px; // Ajustando la posición vertical
            left: 0px; // Ajustando la posición horizontal
          }
          .flex-col {
            display: ${isMenuOpen ? "flex" : "none"};
            position: fixed; // Usando fixed para posicionar sobre otros elementos
            top: 80px; // Colocando debajo del botón de menú
            left: 0;
            width: 100%; // Ajustando el ancho a pantalla completa
            background-color: #000; // Manteniendo el fondo negro
            flex-direction: column; // Asegurando que los elementos estén en columna
            align-items: center; // Centrando los elementos
            padding-top: 10px; // Agregando un poco de espacio en la parte superior
          }
          button {
            font-size: 1rem; // Ajustando el tamaño de la fuente
            padding: 10px; // Ajustando el padding
            border-radius: 50%; // Haciendo el botón circular
          }
          .text-xl {
            font-size: 1rem; // Ajustando el tamaño de la fuente para los enlaces
          }
          .my-10 {
            margin-top: 1rem; // Ajustando los márgenes
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
