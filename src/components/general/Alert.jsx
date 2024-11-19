import { useEffect } from "react";

const Alert = ({ text, severity, onClose, positionX, positionY, autoCloseDuration }) => {
  // Estilos basados en la severidad
  const severityStyles = {
    success: {
      backgroundColor: 'var(--success-main)',
      color: 'var(--success-text)',
      border: 'none'
    },
    error: {
      backgroundColor: 'var(--error-main)',
      color: 'var(--error-text)',
      border: 'none'
    },
    warning: {
      backgroundColor: 'var(--warning-main)',
      color: 'var(--warning-text)',
      border: 'none'
    },
    info: {
      backgroundColor: 'var(--info-main)',
      color: '#fff',
      border: 'none'
    },
  };

  // Cerrar alerta automáticamente después de un tiempo
  useEffect(() => {
    if (autoCloseDuration) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [autoCloseDuration, onClose]);


  // Posicionamiento basado en valores de positionX y positionY
  const positionStyles = {
    position: positionX || positionY ? 'absolute' : 'relative',
    left: positionX === 'left' ? '50px' : positionX === 'right' ? 'auto' : positionX === 'center' ? '50%' : undefined,
    right: positionX === 'right' ? '50px' : positionX === 'left' ? 'auto' : undefined,
    top: positionY === 'top' ? '50px' : positionY === 'bottom' ? 'auto' : positionY === 'center' ? '50%' : undefined,
    bottom: positionY === 'bottom' ? '50px' : positionY === 'top' ? 'auto' : undefined,

    transform: positionX === 'center' ? 'translateX(-50%)' : positionY === 'center' ? 'translateY(-50%)' : undefined,

    // cuando se ingresa center en positionX o positionY, se centra el alert
    margin: positionX || positionY ? '0' : '10px auto', // Mantener margen cuando es relativo
  };


  const alertStyle = {
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '500px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    zIndex: 1000,
  };

  const closeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'inherit',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0 10px',
    marginLeft: '10px',
  };

  return (
    <div style={{ ...alertStyle, ...severityStyles[severity], ...positionStyles }}>
      <span>{text}</span>
      <button onClick={onClose} style={closeButtonStyle} aria-label="Close">
        ✖
      </button>
    </div>
  );
};

export default Alert;
