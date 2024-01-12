"use client";
import React, { useEffect, useState } from "react";
import User from "./api/models/User";
import UserCard from "@/components/UserCard";

export type User = {
  _id: string | number | any;
  name: string;
  lastName: string;
  DOB: string;
  gender: string;
};

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users/`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 mediumSize-width xl:grid-cols-4 gap-5">
        {currentUsers &&
          currentUsers.map((user) => <UserCard user={user} key={user._id} />)}
      </div>
      <div className="flex justify-center items-center mt-4">
        <span className="mr-3">
          Página {currentPage} de {totalPages}
        </span>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <style jsx>{`
        @media (min-width: 1150px) and (max-width: 1370px) {
          .mediumSize-width {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            margin-left: 110px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
