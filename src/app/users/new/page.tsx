"use client";

import { useRouter, useParams } from "next/navigation";
import React, { ChangeEvent, useState, useEffect } from "react";

type User = {
  _id?: string | number | any;
  name: string;
  lastName: string;
  DOB: string;
  gender: string;
};
function FormPage() {
  const [usuario, setUsuario] = useState<User>({
    name: "",
    lastName: "",
    DOB: "",
    gender: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<User>>({
    name: "",
    lastName: "",
    DOB: "",
    gender: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();
  const params = useParams();

  const getUser = async () => {
    const res = await fetch(`/api/users/${params.id}`);
    const data = await res.json();
    console.log(data[0]);
    setUsuario({
      name: data[0].name,
      lastName: data[0].lastName,
      DOB: data[0].DOB,
      gender: data[0].gender,
    });
  };

  const updateUser = async () => {
    try {
      const res = await fetch(`/api/users/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      const data = await res.json();
      console.log(data);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newFormErrors: User | { [key: string]: string } = {};

    Object.keys(usuario).forEach((key) => {
      if (usuario[key as keyof User].trim() === "") {
        newFormErrors[key] = "Este campo es obligatorio";
        isValid = false;
      }
    });

    setFormErrors(newFormErrors);
    setIsFormValid(isValid);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm() && !params.id) {
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        });
        const data = await res.json();
        if (res.status === 200) {
          router.push("/");
          router.refresh();
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else if (validateForm()) {
      updateUser();
    }
  };

  useEffect(() => {
    if (params.id) {
      try {
        getUser();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <nav className=" h-[calc(100vh-2rem)] bg-gray-100 border-2 border-black">
      <div className="h-full flex justify-center items-center ">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-2xl w-96"
        >
          <h2 className="text-3xl font-bold text-black-800 mb-6">
            {!params.id ? "Nuevo Usuario" : "Modificar usuario"}
          </h2>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombres del nuevo usuario
          </label>
          <input
            name="name"
            type="text"
            placeholder="Escribe los nombres"
            onChange={handleChange}
            value={usuario.name}
            className="bg-blue-100 border border-gray-300 px-3 py-2 rounded-md w-full mb-4 focus:outline-none focus:ring focus:border-gray-500"
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm">{formErrors.name}</p>
          )}
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Apellidos del nuevo usuario
          </label>
          <input
            name="lastName"
            type="text"
            placeholder="Escribe los apellidos"
            onChange={handleChange}
            value={usuario.lastName}
            className="bg-blue-100 border border-gray-300 px-3 py-2 rounded-md w-full mb-4 focus:outline-none focus:ring focus:border-gray-500"
          />
          {formErrors.lastName && (
            <p className="text-red-500 text-sm">{formErrors.lastName}</p>
          )}
          <div className="flex justify-between">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Fecha de nacimiento
            </label>
            <input
              name="DOB"
              type="date"
              onChange={handleChange}
              value={usuario.DOB}
              className="bg-blue-100 border border-gray-300 px-3 py-2 rounded-md w-2/3 focus:outline-none focus:ring focus:border-gray-500"
            />
            {formErrors.DOB && (
              <p className="text-red-500 text-sm">{formErrors.DOB}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Género <sup>*</sup>
            </label>
            <select
              value={usuario.gender}
              name="gender"
              onChange={handleChange}
              className="bg-blue-100 border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-gray-500"
            >
              <option disabled value="" selected={!usuario.gender}>
                Seleccione un género
              </option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            {formErrors.gender && (
              <p className="text-red-500 text-sm">{formErrors.gender}</p>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className={
                "bg-white border border-blue-500 hover:bg-blue-600 text-black font-bold px-4 py-2 rounded-md"
              }
            >
              {!params.id ? "Agregar" : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        nav {
          border-top-left-radius: 2rem;
          border-bottom-left-radius: 2rem;
          border-top-right-radius: 3rem;
          border-bottom-right-radius: 3rem;
        }

        @media (max-width: 768px) {
          nav {
            height: calc(100vh - 7rem /* 32px */);
          }
          form {
            padding: 4rem 1rem;
          }

          .text-3xl {
            font-size: 1.5rem;
          }

          .text-sm {
            font-size: 0.875rem;
          }

          input,
          select {
            padding: 0.5rem;
          }

          button {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </nav>
  );
}

export default FormPage;
