import React, {useState, useEffect} from "react"

const useForm = (fieldValues) => {
    const[values, setValues] = useState(fieldValues)

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name] : value
        })
    }
    
    return{
        values,
        setValues,
        handleInputChange
    };
}

export default useForm;