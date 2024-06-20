import { Link } from "react-router-dom";

import styles from "../styles/notFoundStyles/notFoundPage.module.css"

function NotFoundPage() {

    return (
      <>
      <h1>404 PAGE NOT FOUND</h1>
      <p className={styles.zoom_area}>No se encontró ninguna página</p>
      <section className={styles.error_container}>
        <span className={styles.four}><span className={styles.screen_reader_text}>4</span></span>
        <span className={styles.zero}><span className={styles.screen_reader_text}>0</span></span>
        <span className={styles.four}><span className={styles.screen_reader_text}>4</span></span>
      </section>
      <div className={styles.link_container}>
        <Link to="/" className={styles.more_link}>
          Volver al inicio
        </Link>
      </div>
      </>
    )
  }
  
  export default NotFoundPage