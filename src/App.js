import { useState } from 'react';
import { register, login, verifyEmail } from './services/auth';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (isLogin) {
        const res = await login({ email, password });
        setMessage(`Вход успешен! Токен: ${res.data.token}`);
      } else {
        await register({ email, password });
        setMessage('Проверь почту! Ссылка для верификации отправлена.');
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Ошибка');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ color: '#00C4B4' }}>Swaptrix</h1>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{ width: '100%', padding: '12px', background: '#00C4B4', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}
        >
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#00C4B4', textDecoration: 'underline', cursor: 'pointer' }}>
          {isLogin ? 'Нет аккаунта? Зарегистрируйся' : 'Уже есть аккаунт? Войди'}
        </button>
      </p>
      {message && <p style={{ marginTop: '20px', padding: '10px', background: message.includes('успешно') ? '#d4edda' : '#f8d7da', borderRadius: '8px' }}>{message}</p>}
    </div>
  );
}

export default App;