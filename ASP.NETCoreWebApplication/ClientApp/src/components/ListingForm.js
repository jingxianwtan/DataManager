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
    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initializeFieldValues(props))
    
    return (
        <form autoComplete= "off" noValidate className = {classes.root}>
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
                        />
                        <TextField
                            name = "eventId"
                            variant = "outlined"
                            label = "Event Id"
                            value = {values.eventId}
                            onChange = {handleInputChange}
                        />
                        <TextField
                            name = "createdTime"
                            variant = "outlined"
                            label = "Created Time"
                            value = {values.createdTime}
                            onChange = {handleInputChange}
                        />
                        <TextField 
                            name = "price"
                            variant = "outlined"
                            label = "Price"
                            value = {values.price}
                            onChange = {handleInputChange}
                        />
                        <TextField
                            name = "quantity"
                            variant = "outlined"
                            label = "Quantity"
                            value = {values.quantity}
                            onChange = {handleInputChange}
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