import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from "../styles/homePageStyles/homePage.module.css"; // Importa los estilos.

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Estado para seleccionar entre usuario o administrador.
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Lógica de autenticación simple.
    if (role === 'user') {
      navigate('/user/reserve/book'); // Redirigir si es usuario.
    } else if (role === 'admin') {
      navigate('/admin/bedel/search'); // Redirigir si es administrador.
    } else {
      alert('Selecciona un rol válido.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <label>
          Usuario:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </label>
        <label>
          Contraseña:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </label>
        <label>
          Rol:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <button type="submit">Ingresar</button>
        {/* Links para redirigir al usuario o administrador */}
        {role === 'user' && <Link to="/user/reserve/book" className={styles.hiddenLink}></Link>}
        {role === 'admin' && <Link to="/admin/bedel/search" className={styles.hiddenLink}></Link>}
      </form>
    </div>
  );
};

export default HomePage;
