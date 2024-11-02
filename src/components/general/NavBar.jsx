import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../../styles/userStyles/navBar.module.css";
import { FaUserCircle } from "react-icons/fa"; // Usando react-icons para el ícono de usuario

function NavBar({ sectionSelected,  rol}) {
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
                        <button className={styles.profile_icon_button} onClick={toggleDropdown}>
                            <FaUserCircle
                            className={styles.profile_icon}
                            />
                        </button>
                        {dropdownVisible && (
                            <ul className={styles.dropdown_menu}>
                                <li className={styles.dropdown_item}>
                                    <Link to="/">Cerrar sesión</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </section>

                {/* Barra de navegación */}
                <nav>
                    <ul className={styles.nav_bar_list}>
                        {rol === "bedel" &&
                            <>
                            <li className={styles.nav_bar_list_item}>
                            <Link
                                to="/user/reserve/book"
                                className={`${styles.nav_bar_section} ${sectionSelected === "book" ? styles.active : ""
                                    }`}
                            >
                                REGISTRAR RESERVA
                            </Link>
                        </li>
                        <li className={styles.nav_bar_list_item}>
                            <Link
                                to="/user/reserve/classroom"
                                className={`${styles.nav_bar_section} ${sectionSelected === "classroom" ? styles.active : ""
                                    }`}
                            >
                                RESERVAS EN AULA
                            </Link>
                        </li>
                        <li className={styles.nav_bar_list_item}>
                            <Link
                                to="/user/reserve/day"
                                className={`${styles.nav_bar_section} ${sectionSelected === "day" ? styles.active : ""
                                    }`}
                            >
                                RESERVAS EN DÍA
                            </Link>
                        </li>
                        <li className={styles.nav_bar_list_item}>
                            <Link
                                to="/user/reserve/subject"
                                className={`${styles.nav_bar_section} ${sectionSelected === "subject" ? styles.active : ""
                                    }`}
                            >
                                RESERVAS EN CURSO
                            </Link>
                        </li>
                            </>
                        }

                        {rol === "admin" &&

                           <>
                            <li className={styles.nav_bar_list_item}>
                            <Link to="/admin/bedel/search" className={`${styles.nav_bar_section} ${(sectionSelected == "search" ? styles.active : '')}`}>
                                <p>
                                    BUSCAR BEDEL
                                </p>

                            </Link>
                        </li>

                        <li className={styles.nav_bar_list_item}>

                            <Link to="/admin/bedel/register" className={`${styles.nav_bar_section} ${(sectionSelected == "register" ? styles.active : '')}`}>
                                <p>
                                    REGISTRAR BEDEL
                                </p>
                            </Link>
                        </li>

                           </>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;
