﻿import React, { useEffect } from 'react';
import { Grid, TextField, withStyles, Button, Divider} from "@material-ui/core"
import useForm from "./useForm"

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
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
    var d = new Date();
    return {
        listingId: '',
        userId: '',
        eventId: props.eventId,
        createdTime: d.getFullYear() + "-" + ('0' + (d.getMonth())).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + "T" + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2),
        price: '',
        quantity: ''
    }
}

const ListingForm = ({classes, ...props}) => {
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('userId' in fieldValues) 
            temp.userId = fieldValues.userId !== "" ? "" : "This field is required."
        if ('eventId' in fieldValues)
            temp.eventId = fieldValues.eventId !== "" ? "" : "This field is required."
        if ('createdTime' in fieldValues) 
            temp.createdTime = fieldValues.createdTime.match( /(\d{4})-(\d{2}|[01-12])-(\d{2})T(\d{2}):(\d{2}):(\d{2})/) ? "" : "Date format should be yyyy-mm-ddThh:mm:ss"
        if ('price' in fieldValues) 
            temp.price = fieldValues.price !== "" && !isNaN(fieldValues.price)? "" : "This field should be digit only."
        if ('quantity' in fieldValues) 
            temp.quantity = fieldValues.quantity !== "" && !isNaN(fieldValues.quantity) ? "" : "This field should be digit only."
        setErrors({
            ...temp
        })
        if (fieldValues === values) 
            return Object.values(temp).every(x => x === "")
    }
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initializeFieldValues(props), validate)
    
    const handleSubmit = e => {
        e.preventDefault()
        if(validate()) {
            if (values.listingId === '') {
                submitListing(values).then(res => {
                    if (res.ok) {
                        window.alert("New listing added");
                        props.populateListings();
                        resetForm();
                    } else {
                        window.alert("Failed to add listing, status code: " + res.status);
                    }
                })   
            } else {
                updateListing(values).then(res => {
                    if (res.ok) {
                        window.alert("Listing updated");
                        props.populateListings();
                        resetForm();
                    } else {
                        window.alert("Failed to update listing, status code: " + res.status);
                    }
                })
            }
        }
    }

    useEffect(() => {
        if (props.listing !== undefined) {
            const listing = props.listing;
            setValues({
                listingId: listing.listingId,
                userId: listing.userId,
                eventId: listing.eventId,
                createdTime: listing.createdTime,
                price: listing.price,
                quantity: listing.quantity
            })
        }
    }, [props.listing, setValues]);
    
    return (
        <form autoComplete= "off" noValidate className = {classes.root} onSubmit= {handleSubmit}>
            <Grid container>
                    <Grid item xs = {12} className={classes.smallMargin}>
                        <h1 id="addListing" >Add a Listing for event {props.eventName}</h1>
{/*                        <p>You can omit the Listing Id for new Listing.</p>*/}
{/*                        <TextField
                            name = "listingId"
                            variant = "outlined"
                            label = "Listing Id"
                            value = {values.listingId}
                            onChange = {handleInputChange}
                        />*/}
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
                                onClick= {resetForm}
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

async function submitListing(values) {
    const data = {
/*        "ListingId": parseInt(values.listingId),*/
        "UserId": parseInt(values.userId),
        "EventId": parseInt(values.eventId),
        "CreatedTime": values.createdTime,
        "Price": parseFloat(values.price),
        "Quantity": parseInt(values.quantity)
    }
    console.log('data to be submit is: ' + JSON.stringify(data));
    const response = await fetch('Listing/api/create?event=' + values.eventId, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response
}

async function updateListing(values) {
    const data = {
        "ListingId": parseInt(values.listingId),
        "UserId": parseInt(values.userId),
        "EventId": parseInt(values.eventId),
        "CreatedTime": values.createdTime,
        "Price": parseFloat(values.price),
        "Quantity": parseInt(values.quantity)
    }
    console.log('data to be updated is: ' + JSON.stringify(data));
    const response = await fetch('Listing/api/update?event=' + values.eventId, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response
}

export default withStyles(styles)(ListingForm);