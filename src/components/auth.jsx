import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔹 Статичные пользователи
  const users = [
    { email: "student@test.com", password: "123456", role: "student" },
    { email: "curator@test.com", password: "123456", role: "curator" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (user) {
      sessionStorage.setItem("userRole", user.role);
      sessionStorage.setItem("userEmail", user.email);
      setError("");
      onLogin(); // уведомляем App, что пользователь вошёл
    } else {
      setError("Неверный email, пароль или роль");
    }
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
      </form>
    </div>
  );
}
