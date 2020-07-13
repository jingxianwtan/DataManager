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
    
    const resetForm =() => {
        setValues({
            ...initialValues
        })
        setErrors({})
    }
    
    return{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    };
}

export default useForm;