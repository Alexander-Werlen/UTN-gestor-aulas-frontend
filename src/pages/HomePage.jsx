import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginService from '../services/loginService';
import Alert from '../components/general/Alert';
import styles from "../styles/homePageStyles/homePage.module.css"; // Importa los estilos.

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({
    open: false,
    text: '',
    severity: 'warning',
    positionX: 'center',
    positionY: 'bottom',
    autoCloseDuration: undefined
  });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginService.login({ id: username, password: password })
      .then(response => {
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('type', response.data.type);
        if (response.data.type === 'Bedel') {
          navigate('/user/reserve/book');
        } else if (response.data.type === 'Administrador') {
          navigate('/admin/bedel/search');
        }
      })
      .catch(error => {
        setAlert({
          open: true,
          text: 'Usuario o contraseña incorrectos',
          severity: 'error',
          positionX: 'center',
          positionY: 'bottom',
          autoCloseDuration: 5000
        });
        console.log(error);
      })
  }


    


  return (
    <main className={styles.loginContainer}>
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
        <button type="submit">Ingresar</button>
      </form>
      {alert.open && <Alert
        text={alert.text}
        severity={alert.severity}
        positionX={alert.positionX}
        positionY={alert.positionY}
        autoCloseDuration={alert.autoCloseDuration}
        onClose={() => setAlert({ ...alert, open: false })}
      />}
    </main>
  );
};

export default HomePage;
