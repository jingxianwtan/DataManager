import React, { useState } from 'react';
import { Grid, TextField, withStyles, Button, Divider} from "@material-ui/core"
import useForm from "./useForm"

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 140,
        },
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    smallMargin : {
        margin: theme.spacing(1),
    }
})

const initializeedFieldValues = (props) => {
    return {
        transactionId: '',
        buyerId: '',
        paymentId: '',
        listingId: props.listingId,
        quantBought: '',
        sellerId: '',
        date: ''   
    }
}

const TransactionForm = ({classes, ...props}) => {
    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initializeedFieldValues(props))
    return (
        <form autoComplete= "off" noValidate className = {classes.root}>
            <Grid container>
                <Grid item xs = {12} className={classes.smallMargin}>
                    <h1 id="addTransaction" > Add a Transactions for this Listing</h1>
                    <p> You can omit the Transaction Id and Payment Id for new transaction.</p>
                    <TextField
                        name = "transactionId"
                        variant = "outlined"
                        label = "Transaction Id"
                        value = {values.transactionId}
                        onChange = {handleInputChange}
                    />
                    <TextField
                        name = "buyerId"
                        variant = "outlined"
                        label = "Buyer Id"
                        value = {values.buyerId}
                        onChange = {handleInputChange}
                    />
                    <TextField
                        name = "paymentId"
                        variant = "outlined"
                        label = "Payment Id"
                        value = {values.paymentId}
                        onChange = {handleInputChange}
                    />
                    <TextField
                        name = "listingId"
                        variant = "outlined"
                        label = "Listing Id"
                        value = {values.listingId}
                        onChange = {handleInputChange}
                    />
                    <TextField
                        name = "quantBought"
                        variant = "outlined"
                        label = "Quantity Bought"
                        value = {values.quantBought}
                        onChange = {handleInputChange}
                    />
                    <TextField
                        name = "sellerId"
                        variant = "outlined"
                        label = "Seller Id"
                        value = {values.sellerId}
                        onChange = {handleInputChange}
                    />
                    <TextField
                        name = "date"
                        variant = "outlined"
                        label = "Date"
                        value = {values.date}
                        onChange = {handleInputChange}
                    />
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
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
        </form>
    );
}

export default withStyles(styles)(TransactionForm);