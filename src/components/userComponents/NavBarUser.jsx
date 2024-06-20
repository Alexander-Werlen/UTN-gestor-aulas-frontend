import { Link } from "react-router-dom";

import styles from "../../styles/userStyles/navBar.module.css"

function NavBarUser({sectionSelected}) {
  
  return (
    
    <div className={styles.nav_bar}>
      <Link to="/user/reserve/book" className={`${styles.nav_bar_section} ${(sectionSelected=="book" ? styles.active : '')}`}>
        <p className={styles.nav_section_text}>
        REGISTRAR
        <br/> 
        RESERVA
        </p>
      </Link>
      <Link to="/user/reserve/classroom"className={`${styles.nav_bar_section} ${(sectionSelected=="classroom" ? styles.active : '')}`}>
        <p className={styles.nav_section_text}>
        RESERVAS
        <br/>
        EN AULA
        </p>
      </Link>
      <Link to="/user/reserve/day"className={`${styles.nav_bar_section} ${(sectionSelected=="day" ? styles.active : '')}`}>
        <p className={styles.nav_section_text}>
        RESERVAS
        <br/>
        EN DÍA
        </p>
      </Link>
      <Link to="/user/reserve/subject"className={`${styles.nav_bar_section} ${(sectionSelected=="subject" ? styles.active : '')}`}>
        <p className={styles.nav_section_text}>
        RESERVAS
        <br/>
        EN CURSO
        </p>
      </Link>
    </div>
    
  )
}

export default NavBarUser
