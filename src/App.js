import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import AdminPanel from './pages/AdminPanel';
// ... (твой код авторизации)

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = async (data) => {
    const res = await login(data);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm onLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={token ? <AdminPanel /> : <Navigate to="/" />}
        />
      </Routes>
      {token && (
        <button onClick={logout} style={{ position: 'fixed', top: 10, right: 10 }}>
          Выйти
        </button>
      )}
    </Router>
  );
}