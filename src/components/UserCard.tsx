import { User } from "@/app/page";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import trashcan from "../../public/assets/trashcan.png";
import profile from "../../public/assets/profile.png";
import edit from "../../public/assets/edit.png";

interface UserCardProps {
  user: User;
}
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const userId = user._id;
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        window.location.reload();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white text-black rounded-3xl border border-gray-400 shadow-lg p-8 max-w-md mx-auto md:min-w-72">
      <div className="bg-stone-800 p-2 rounded-t-2xl">
        <div className="flex justify-center">
          <div className="rounded-full border overflow-hidden bg-white">
            <Image
              src={profile}
              alt="Imagen de perfil"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center md:items-start lg:items-center ">
        <div>
          <h2 className="font-bold my-1">
            Nombre: <span className="font-normal">{user.name}</span>
          </h2>
          <h2 className="font-bold my-1">
            Apellido: <span className="font-normal">{user.lastName}</span>
          </h2>
        </div>
        <div>
          <h3 className="font-bold my-1 mediumSize-dob">
            Fecha de nacimiento: <span className="font-normal">{user.DOB}</span>
          </h3>
        </div>
        <h3 className="font-bold my-1">
          Género: <span className="font-normal">{user.gender}</span>
        </h3>
      </div>
      <div className="flex justify-evenly mt-4 pb-2">
        <button
          className="bg-white border-2 border-black rounded-full p-2 hover:bg-red-500 transition-transform duration-300 ease-out"
          onClick={handleDelete}
        >
          <Image src={trashcan} alt="Eliminar" width={15} height={15} />
        </button>
        <button
          className="bg-white border-2 border-black rounded-full p-2 hover:bg-blue-500 transition-transform duration-300 ease-out"
          onClick={() => {
            router.push(`/users/${user._id}`);
          }}
        >
          <Image src={edit} alt="Editar" width={15} height={15} />
        </button>
      </div>
      <style jsx>{`
        @media (min-width: 768px) and (max-width: 1370px) {
          .mediumSize-dob {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default UserCard;
