import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, Typography, Box } from '@mui/material';
import { AdminPanelSettings, Delete, Edit } from '@mui/icons-material';

const API = axios.create({
  baseURL: 'https://swaptrix-backend.onrender.com/api',
  withCredentials: true
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      alert('Доступ запрещён или ошибка');
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id, role) => {
    await API.patch(`/admin/users/${id}/role`, { role });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (window.confirm('Удалить пользователя?')) {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto', fontFamily: 'Inter' }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#00C4B4', display: 'flex', alignItems: 'center', gap: 1 }}>
        <AdminPanelSettings /> Админ-панель
      </Typography>

      <TableContainer component={Paper} sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#00C4B4' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Роль</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Дата</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id} sx={{ '&:hover': { bgcolor: '#2a2a2a' } }}>
                <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => changeRole(user._id, e.target.value)}
                    size="small"
                    sx={{ color: user.role === 'admin' ? '#00C4B4' : 'white' }}
                  >
                    <MenuItem value="user">user</MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
                  </Select>
                </TableCell>
                <TableCell sx={{ color: '#aaa' }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteUser(user._id)} color="error" size="small">
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminPanel;