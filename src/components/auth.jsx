import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Введите email и пароль");
      return;
    }

    // сохраняем данные в sessionStorage
    sessionStorage.setItem("userRole", role);
    sessionStorage.setItem("userEmail", email);
    
    setError("");
    onLogin(); // уведомляем App, что пользователь вошёл
  };

  const handleLogout = () => {
    // очищаем sessionStorage
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userEmail");
    window.location.reload(); // перезагрузка для возврата на форму входа
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">Авторизация</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />

        <div className="flex justify-between">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="student"
              checked={role === "student"}
              onChange={(e) => setRole(e.target.value)}
            />
            Студент
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="curator"
              checked={role === "curator"}
              onChange={(e) => setRole(e.target.value)}
            />
            Куратор
          </label>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
        >
          Войти
        </button>

        {/* Кнопка выхода (можно показывать после входа, если нужно) */}
        {sessionStorage.getItem("userRole") && (
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 text-white rounded-lg py-2 hover:bg-red-600 transition mt-2"
          >
            Выйти
          </button>
        )}
      </form>
    </div>
  );
}