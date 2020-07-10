import React, { useState } from 'react';
import { Grid, TextField, withStyles, Button, Divider} from "@material-ui/core"
import useForm from "./useForm"

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 150,
        },
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    smallMargin : {
        margin: theme.spacing(1),
    }
})

const initializeFieldValues = (props) => {
    return {
        listingId: '',
        userId: '',
        eventId: props.eventId,
        createdTime: '',
        price: '',
        quantity: ''
    }
}

const ListingForm = ({classes, ...props}) => {
    
    const validate = (fieldValues = values) => {
        let temp = {}
        if ('userId' in fieldValues) 
            temp.userId = fieldValues.userId != "" ? "" : "This field is required."
        if ('eventId' in fieldValues)
            temp.eventId = fieldValues.eventId != "" ? "" : "This field is required."
/*        if ('createdTime' in fieldValues) 
            temp.createdTime = fieldValues.createdTime != "" ? "" : "This field is required."*/
        if ('createdTime' in fieldValues) 
            temp.createdTime = fieldValues.createdTime.match( /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/) ? "" : "Date format should be yyyy-mm-ddThh:mm:ss"
        if ('price' in fieldValues) 
            temp.price = fieldValues.price != "" && !isNaN(fieldValues.price)? "" : "This field should be digit only."
        if ('quantity' in fieldValues) 
            temp.quantity = fieldValues.quantity != "" && !isNaN(fieldValues.quantity) ? "" : "This field should be digit only."
        setErrors({
            ...temp
        })
        if (fieldValues == values) 
            return Object.values(temp).every(x => x == "")
    }
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initializeFieldValues(props), validate)
    
    const handleSubmit = e => {
        e.preventDefault()
        if(validate()) {
            window.alert("validation succeeded")
        }
    }
    
    return (
        <form autoComplete= "off" noValidate className = {classes.root} onSubmit= {handleSubmit}>
            <Grid container>
                    <Grid item xs = {12} className={classes.smallMargin}>
                        <h1 id="addListing" >Add a Listing for this Event</h1>
                        <p>You can omit the Listing Id for new Listing.</p>
                        <TextField
                            name = "listingId"
                            variant = "outlined"
                            label = "Listing Id"
                            value = {values.listingId}
                            onChange = {handleInputChange}
                        />
                        <TextField
                            name = "userId"
                            variant = "outlined"
                            label = "User Id"
                            value = {values.userId}
                            onChange = {handleInputChange}
                            {...(errors.userId && {error: true, helperText: errors.userId})}
                        />
                        <TextField
                            name = "eventId"
                            variant = "outlined"
                            label = "Event Id"
                            value = {values.eventId}
                            onChange = {handleInputChange}
                            {...(errors.eventId && {error: true, helperText: errors.eventId})}
                        />
                        <TextField
                            name = "createdTime"
                            variant = "outlined"
                            label = "Created Time"
                            value = {values.createdTime}
                            onChange = {handleInputChange}
                            {...(errors.createdTime && {error: true, helperText: errors.createdTime})}
                        />
                        <TextField 
                            name = "price"
                            variant = "outlined"
                            label = "Price"
                            value = {values.price}
                            onChange = {handleInputChange}
                            {...(errors.price && {error: true, helperText: errors.price})}
                        />
                        <TextField
                            name = "quantity"
                            variant = "outlined"
                            label = "Quantity"
                            value = {values.quantity}
                            onChange = {handleInputChange}
                            {...(errors.quantity && {error: true, helperText: errors.quantity})}
                        />
                        <div>
                            <Button
                                variant = "contained"
                                color = "primary"
                                type = "submit"
                                className={classes.smallMargin}
                            > Submit
                            </Button>
                            <Button
                                variant = "contained"
                                type = "submit"
                                className={classes.smallMargin}
                            >Reset
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            <Divider className={classes.divider} />
        </form>
    )
}

export default withStyles(styles)(ListingForm);