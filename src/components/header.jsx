import React from "react";

export default function Header({ onLogout }) {
  const email = sessionStorage.getItem("userEmail");
  const role = sessionStorage.getItem("userRole");

  return (
    <div id="header">
      <div className="container">
        <div className="header flex justify-between items-center">
          <a href="/">
            <img src="/logo.svg" alt="Logo" />
          </a>

          <div className="tabs flex gap-4">
            <a href="#">Статистика</a>
            <a href="#">Ұсыныс</a>
            <a href="#">AI кеңес</a>
          </div>

          <div className="flex items-center gap-4">
            {email && role && (
              <p>
                {role === "student" ? "Студент" : "Куратор"}: <b>{email}</b>
              </p>
            )}

            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Выйти
            </button>

            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
              Файлды жүктеу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
