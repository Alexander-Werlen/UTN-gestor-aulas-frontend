import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../../styles/userStyles/navBar.module.css";
import { FaUserCircle } from "react-icons/fa"; // Usando react-icons para el ícono de usuario

function NavBarUser({ sectionSelected }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className={styles.header}>
      {/* Sección con el nombre de la aplicación y el menú desplegable */}
      <div className={styles.header_content}>
      <section className={styles.app_section}>
        <h1 className={styles.app_name}>Gestión de Aulas</h1>
        <div className={styles.profile_icon_container}>
          <FaUserCircle
            className={styles.profile_icon}
            onClick={toggleDropdown}
          />
          {dropdownVisible && (
            <ul className={styles.dropdown_menu}>
              <li className={styles.dropdown_item}>
                <Link to="/logout">Cerrar sesión</Link>
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* Barra de navegación */}
      <nav>
        <ul className={styles.nav_bar_list}>
          <li className={styles.nav_bar_list_item}>
            <Link
              to="/user/reserve/book"
              className={`${styles.nav_bar_section} ${
                sectionSelected === "book" ? styles.active : ""
              }`}
            >
              REGISTRAR
              <br />
              RESERVA
            </Link>
          </li>
          <li className={styles.nav_bar_list_item}>
            <Link
              to="/user/reserve/classroom"
              className={`${styles.nav_bar_section} ${
                sectionSelected === "classroom" ? styles.active : ""
              }`}
            >
              RESERVAS
              <br />
              EN AULA
            </Link>
          </li>
          <li className={styles.nav_bar_list_item}>
            <Link
              to="/user/reserve/day"
              className={`${styles.nav_bar_section} ${
                sectionSelected === "day" ? styles.active : ""
              }`}
            >
              RESERVAS
              <br />
              EN DÍA
            </Link>
          </li>
          <li className={styles.nav_bar_list_item}>
            <Link
              to="/user/reserve/subject"
              className={`${styles.nav_bar_section} ${
                sectionSelected === "subject" ? styles.active : ""
              }`}
            >
              RESERVAS
              <br />
              EN CURSO
            </Link>
          </li>
        </ul>
      </nav>
      </div>
    </header>
  );
}

export default NavBarUser;
