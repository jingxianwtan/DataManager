import React, { useEffect } from 'react';
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

const initializedFieldValues = (props) => {
    return {
        transactionId: '',
        buyerId: '',
        /*        paymentId: '',*/
        listingId: props.listingId,
        quantBought: '',
        sellerId: props.sellerId,
        date: ''
    }
}

const TransactionForm = ({classes, ...props}) => {
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('buyerId' in fieldValues)
            temp.buyerId = fieldValues.buyerId != "" ? "" : "This field is required."
        if ('listingId' in fieldValues)
            temp.listingId = fieldValues.listingId != "" ? "" : "This field is required."
        if ('quantBought' in fieldValues)
            temp.quantBought = fieldValues.quantBought != "" && !isNaN(fieldValues.quantBought)? "" : "This field should be digit only."
        if ('sellerId' in fieldValues)
            temp.sellerId = fieldValues.sellerId != "" ? "" : "This field is required."
        if ('date' in fieldValues)
            temp.date = fieldValues.date.match( /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/) ? "" : "Date format should be yyyy-mm-ddThh:mm:ss"
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
        handleInputChange,
        resetForm
    } = useForm(initializedFieldValues(props), validate)

    const handleSubmit = e => {
        e.preventDefault();
        if(validate()) {
            if (values.transactionId === '') {
                submitTransactoin(values).then(res => {
                    if (res.ok) {
                        window.alert("New transaction added");
                        props.populateTransactions();
                        resetForm();
                    } else {
                        window.alert("Failed to add transaction, status code: " + res.status);
                    }
                })   
            } else {
                updateTransactoin(values).then(res => {
                    if (res.ok) {
                        window.alert("Transaction updated");
                        props.populateTransactions();
                        resetForm();
                    } else {
                        window.alert("Failed to update transaction, status code: " + res.status);
                    }
                })
            }
        }
    }

    useEffect(() => {
        if (props.transaction !== undefined) {
            const transaction = props.transaction;
            setValues({
                    transactionId: transaction.transactionId,
                    buyerId: transaction.buyerId,
                    /*        paymentId: '',*/
                    listingId: transaction.listingId,
                    quantBought: transaction.quantBought,
                    sellerId: transaction.sellerId,
                    date: transaction.date
                }) 
        }
    }, [props.transaction, setValues]);
    
    return (
        <form autoComplete= "off" noValidate className = {classes.root} onSubmit= {handleSubmit}>
            <Grid container>
                <Grid item xs = {12} className={classes.smallMargin}>
                    <h1 id="addTransaction" > Add a Transactions for this Listing</h1>
                    <p> You can omit the Transaction Id and Payment Id for new transaction.</p>
{/*                    <TextField
                        name = "transactionId"
                        variant = "outlined"
                        label = "Transaction Id"
                        value = {values.transactionId}
                        onChange = {handleInputChange}
                    />*/}
                    <TextField
                        name = "buyerId"
                        variant = "outlined"
                        label = "Buyer Id"
                        value = {values.buyerId}
                        onChange = {handleInputChange}
                        {...(errors.buyerId && {error: true, helperText: errors.buyerId})}
                    />
{/*                    <TextField
                        name = "paymentId"
                        variant = "outlined"
                        label = "Payment Id"
                        value = {values.paymentId}
                        onChange = {handleInputChange}
                    />*/}
                    <TextField
                        name = "listingId"
                        variant = "outlined"
                        label = "Listing Id"
                        value = {values.listingId}
                        onChange = {handleInputChange}
                        {...(errors.listingId && {error: true, helperText: errors.listingId})}
                    />
                    <TextField
                        name = "quantBought"
                        variant = "outlined"
                        label = "Quantity Bought"
                        value = {values.quantBought}
                        onChange = {handleInputChange}
                        {...(errors.quantBought && {error: true, helperText: errors.quantBought})}
                    />
                    <TextField
                        name = "sellerId"
                        variant = "outlined"
                        label = "Seller Id"
                        value = {values.sellerId}
                        onChange = {handleInputChange}
                        {...(errors.sellerId && {error: true, helperText: errors.sellerId})}
                    />
                    <TextField
                        name = "date"
                        variant = "outlined"
                        label = "Date"
                        value = {values.date}
                        onChange = {handleInputChange}
                        {...(errors.date && {error: true, helperText: errors.date})}
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
                        onClick={resetForm}
                        className={classes.smallMargin}
                    >Reset
                    </Button>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
        </form>
    );
}

async function submitTransactoin(values) {
    const data = {
/*        "transactionId" : parseInt(values.transactionId),*/
        "buyerId": parseInt(values.buyerId),
        "listingId": parseInt(values.listingId),
/*        "paymentId" : parseInt(values.paymentId),*/
        "quantBought": parseInt(values.quantBought),
        "sellerId" : parseInt(values.sellerId),
        "date": values.date
    }
    console.log('data to be submit is: ' + JSON.stringify(data));
    const response = await fetch('Transaction/api/create?listing=' + values.listingId, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response
}

async function updateTransactoin(values) {
    const data = {
        "transactionId" : parseInt(values.transactionId),
        "buyerId": parseInt(values.buyerId),
        "listingId": parseInt(values.listingId),
        /*        "paymentId" : parseInt(values.paymentId),*/
        "quantBought": parseInt(values.quantBought),
        "sellerId" : parseInt(values.sellerId),
        "date": values.date
    }
    console.log('data to be updated is: ' + JSON.stringify(data));
    const response = await fetch('Transaction/api/update?listing=' + values.listingId, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response
}


export default withStyles(styles)(TransactionForm);