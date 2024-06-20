import { Link } from "react-router-dom";

import styles from "../../styles/adminStyles/navBar.module.css"

function NavBarAdmin({sectionSelected}) {

  return (
    
    <div className={styles.nav_bar}>
      <Link to="/admin/bedel/search" className={`${styles.nav_bar_section} ${(sectionSelected=="search" ? styles.active : '')}`}>
        <p className={styles.nav_section_text}>
        BUSCAR
        <br/> 
        BEDEL
        </p>
      </Link>
      <Link to="/admin/bedel/register"className={`${styles.nav_bar_section} ${(sectionSelected=="register" ? styles.active : '')}`}>
        <p className={styles.nav_section_text}>
        REGISTRAR
        <br/>
        BEDEL
        </p>
      </Link>
    </div>
    
  )
}

export default NavBarAdmin
