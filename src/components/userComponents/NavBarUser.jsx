import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "../../styles/userStyles/navBar.module.css"

function NavBarUser() {

  const currentPath = window.location.pathname.split('/')
  const actionPath = currentPath[currentPath.length-1]
  const [sectionSelected, setSectionSelected] = useState(actionPath)
  
  return (
    
    <div className={styles.nav_bar}>
      <Link to="/user/reserve/book" className={`${styles.nav_bar_section} ${(sectionSelected=="book" ? styles.active : '')}`} onClick={()=>setSectionSelected("book")}>
        <p className={styles.nav_section_text}>
        REGISTRAR
        <br/> 
        RESERVA
        </p>
      </Link>
      <Link to="/user/reserve/classroom"className={`${styles.nav_bar_section} ${(sectionSelected=="classroom" ? styles.active : '')}`} onClick={()=>setSectionSelected("classroom")}>
        <p className={styles.nav_section_text}>
        RESERVAS
        <br/>
        EN AULA
        </p>
      </Link>
      <Link to="/user/reserve/day"className={`${styles.nav_bar_section} ${(sectionSelected=="day" ? styles.active : '')}`} onClick={()=>setSectionSelected("day")}>
        <p className={styles.nav_section_text}>
        RESERVAS
        <br/>
        EN DÍA
        </p>
      </Link>
      <Link to="/user/reserve/subject"className={`${styles.nav_bar_section} ${(sectionSelected=="class" ? styles.active : '')}`} onClick={()=>setSectionSelected("class")}>
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
