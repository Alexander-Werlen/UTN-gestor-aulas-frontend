import { Link } from "react-router-dom";

import styles from "../styles/homePageStyles/homePage.module.css"

function HomePage() {

    return (
      <div className={styles.home_page_container}>
        <h1>INICIE SESION</h1>
        <div className={styles.links_container}>
            <div className={styles.link_container}>
                <Link to="/user/reserve/book" className={styles.link_text}>
                <button className={styles.link}>
                    <span>
                        USUARIO
                    </span>
                </button>
                </Link>
            </div>
            <div className={styles.link_container}>
                <Link to="/admin/bedel/search" className={styles.link_text}>
                <button className={styles.link}>
                    <span>
                        ADMINISTRADOR
                    </span>
                </button>
                </Link>
            </div>
        </div>
      </div>
    )
  }
  
  export default HomePage