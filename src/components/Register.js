import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import { register } from '../api/auth';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      await register(form);
      setMessage('Проверьте email для подтверждения!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Ошибка сервера');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" mb={3} textAlign="center">Регистрация</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <TextField
          fullWidth
          label="Пароль"
          type="password"
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ mt: 2 }} 
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
        </Button>
      </form>
      {message && (
        <Alert severity={message.includes('Проверьте') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
}