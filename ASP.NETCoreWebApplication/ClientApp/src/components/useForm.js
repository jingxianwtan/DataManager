import React, {useState, useEffect} from "react"

const useForm = (initialValues, validate) => {
    const[values, setValues] = useState(initialValues)
    const[errors, setErrors] = useState({})
    
    const handleInputChange = e => {
        const {name, value} = e.target
        const fieldValues = {[name]: value}
        setValues({
            ...values,
            [name] : value
        })
        validate(fieldValues)
    }
    
    return{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    };
}

export default useForm;