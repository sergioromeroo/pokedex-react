/* custom hooks para formularios */

import { useState } from "react";

export const useForm = (initialForm = {}) =>{
    const [formState, setFormState] = useState(initialForm)

    /* funcion de input es lo que va estar cambiando con target recibo el evento lo destructuro el name y valor */
    const onInputChange = ({target}) => {
        const {name, value} = target
        
        setFormState({
            ...formState,
            [name]: value
        })
    }
    /* como viene por defecto que lo resetee */
    const onResetForm = () =>{
        setFormState(initialForm)
    }


    return{
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }
}