import{ createContext, useState } from 'react';

export const AlertContext = createContext();


export const AlertProvider = ({ children }) => {
    const [message, setMessage] = useState(
        {
            open: false,
            text: "",
            severity: "warning",
            positionX: "center",
            positionY: "bottom",
            autoCloseDuration: undefined
        }
    )

    const closeAlert = () => setMessage({open: false, text: "", severity: "warning", positionX: "center", positionY: "bottom", autoCloseDuration: undefined})

    const openAlert = (text, severity, positionX, positionY,autoCloseDuration) => setMessage({open: true, text, severity, positionX, positionY , autoCloseDuration})

    return (
        <AlertContext.Provider value={{message, closeAlert, openAlert}}>
            {children}
        </AlertContext.Provider>
    )

}