import { useState, useEffect } from "react";
import styles from "../../styles/userStyles/informationInputSection.module.css";
import cursosService from "../../services/cursosService";
import docenteService from "../../services/docenteService";

function InformationInputSection({
  information,
  setInformation,
  resetInputs,
  resetDaysInput,
}) {
  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [profesoresDisponibles, setProfesoresDisponibles] = useState([]);

  useEffect(() => {
    cursosService.getCursos().then((cursos) => {
      setCursosDisponibles(cursos.data);
    }).catch((error) => {
      console.log(error);
    });

    docenteService.getDocentes().then((docentes) => {
      setProfesoresDisponibles(docentes.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleChooseProfesorName = (e) => {
    const profesorId = profesoresDisponibles.filter(
      (p) => p[1] === e.target.value && p[2] === information.apellido
    )[0][0];
    setInformation({
      ...information,
      nombre: e.target.value,
      profesorId: profesorId,
    });
  };
  const handleChooseProfesorApellido = (e) => {
    setInformation({
      ...information,
      apellido: e.target.value,
      nombre: "",
      profesorId: 0,
    });
  };

  const handleChooseCurso = (e) => {
    const cursoId = cursosDisponibles.filter(
      (c) => c[1] == e.target.value
    )[0][0];
    setInformation({ ...information, cursoId: cursoId, curso: e.target.value });
  };

  const handleTipoReservaChange = (e) => {
    const newTipo = e.target.value;
    if (
      information.tipo_reserva.toLowerCase() == "esporadica" &&
      newTipo.toLowerCase() !== "esporadica"
    ) {
      resetDaysInput();
    } else if (
      information.tipo_reserva.toLowerCase() !== "esporadica" &&
      newTipo.toLowerCase() == "esporadica"
    ) {
      resetDaysInput();
    }

    setInformation({ ...information, tipo_reserva: e.target.value });
  };

  const apellidosProfesoresDisponibles = [
    ...new Set(profesoresDisponibles.map((p) => p[2])),
  ];
  const nombresProfesoresDisponibles = [
    ...new Set(
      profesoresDisponibles
        .filter((p) => p[2] === information.apellido)
        .map((p) => p[1])
    ),
  ];
  return (
    <fieldset className={styles.fieldset}>
      <h2 className={styles.h2}>INFORMACIÓN</h2>
      <section className={styles.inputs_container}>
          <div className={styles.input_section}>
            <label htmlFor="tipo_reserva" className={styles.input_section_descriptor}>Tipo de reserva</label>
            <select
              id="tipo_reserva"
              name="tipo_reserva"
              required
              value={information.tipo_reserva}
              onChange={handleTipoReservaChange}
              /* classname = styles.hide_disabled_option and styles.requied_input*/
              className = {[styles.hide_disabled_option, styles.required_input].join(' ')}
              onInvalid={(e) => e.target.setCustomValidity("Por favor selecciona un tipo de reserva")}
              onInput={(e) => e.target.setCustomValidity("")}
            >
              <option value="" disabled>Seleccionar...</option>
              <option value="anual">Anual</option>
              <option value="cuatrimestre_1">1er Cuatrimestre</option>
              <option value="cuatrimestre_2">2do Cuatrimestre</option>
              <option value="Esporadica">Esporadica</option>
            </select>
          </div>

          <div className={styles.input_section}>
            <label htmlFor="tipo_aula" className={styles.input_section_descriptor}>Tipo de aula</label>
            <select
              id="tipo_aula"
              name="tipo_aula"
              required
              value={information.tipo_aula}
              onChange={(e) => setInformation({ ...information, tipo_aula: e.target.value })}
              className={[styles.hide_disabled_option, styles.required_input].join(' ')}
              onInvalid={(e) => e.target.setCustomValidity("Por favor selecciona un tipo de aula")}
              onInput={(e) => e.target.setCustomValidity("")}
            >
              <option value="" disabled>Seleccionar...</option>
              <option value="Multimedia">Multimedia</option>
              <option value="Informatica">Informatica</option>
              <option value="Regular">Regular</option>
            </select>
          </div>

          <div className={styles.input_section}>
            <label htmlFor="curso" className={styles.input_section_descriptor}>Curso</label>
            <select
              id="curso"
              name="curso"
              required
              value={information.curso}
              onChange={handleChooseCurso}
              className={styles.hide_disabled_option}
              onInvalid={(e) => e.target.setCustomValidity("Por favor selecciona un curso")}
              onInput={(e) => e.target.setCustomValidity("")}
            >
              <option value="" disabled>Seleccionar...</option>
              {cursosDisponibles.map((curso) => (
                <option value={curso[1]} key={curso[1]}>{curso[1]}</option>
              ))}
            </select>
          </div>

          <div className={styles.input_section}>
            <label htmlFor="apellido" className={styles.input_section_descriptor}>Apellido docente</label>
            <select
              id="apellido"
              name="apellido"
              required
              value={information.apellido}
              onChange={handleChooseProfesorApellido}
              className={styles.hide_disabled_option}
              onInvalid={(e) => e.target.setCustomValidity("Por favor selecciona un apellido")}
              onInput={(e) => e.target.setCustomValidity("")}
            >
              <option value="" disabled>Seleccionar...</option>
              {apellidosProfesoresDisponibles.map((apellido) => (
                <option value={apellido} key={apellido}>{apellido}</option>
              ))}
            </select>
          </div>

          <div className={styles.input_section}>
            <label htmlFor="nombre" className={styles.input_section_descriptor}>Nombre docente</label>
            <select
              id="nombre"
              name="nombre"
              required
              disabled={!information.apellido}
              value={information.nombre}
              onChange={handleChooseProfesorName}
              className={styles.hide_disabled_option}
              onInvalid={(e) => e.target.setCustomValidity("Por favor selecciona un nombre")}
              onInput={(e) => e.target.setCustomValidity("")}
            >
              <option value="" disabled>Seleccionar...</option>
              {nombresProfesoresDisponibles.map((nombre) => (
                <option value={nombre} key={nombre}>{nombre}</option>
              ))}
            </select>
          </div>

          <div className={styles.input_section}>
            <label htmlFor="email" className={styles.input_section_descriptor}>Correo contacto</label>
            <input
              id="email"
              name="email"
              required
              type="email"
              value={information.email}
              onChange={(e) => setInformation({ ...information, email: e.target.value })}
              onInvalid={(e) => e.target.setCustomValidity("Por favor ingresa un correo válido")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>

          <div className={styles.input_section}>
            <label htmlFor="cantidad_alumnos" className={styles.input_section_descriptor}>Cantidad alumnos</label>
            <input
              id="cantidad_alumnos"
              name="cantidad_alumnos"
              required
              type="number"
              min="1"
              value={information.cantidad_alumnos}
              onChange={(e) => setInformation({ ...information, cantidad_alumnos: e.target.value })}
              onInvalid={(e) => e.target.setCustomValidity("Por favor ingresa una cantidad válida")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>

          <div className={styles.input_section}>
          <button className={styles.button_Limpiar} type="button" onClick={(e) => resetInputs(e)}>Limpiar</button>
          </div>
        </section>
    </fieldset>
  );
}

export default InformationInputSection;
