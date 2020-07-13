import React, { Component } from 'react';
import Link from "react-router-dom/Link";
import TransactionForm from "./TransactionForm"
import { Grid, Paper } from "@material-ui/core"
import {ButtonGroup, Button} from "reactstrap";
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

export class FetchTransaction extends Component {
    static displayName = FetchTransaction.name;

    constructor(props) {
        super(props);
        this.state = { transactions: [], loading: true };
    }

    componentDidMount() {
        this.populateTransactions();
    }
    


    renderTransactionsTable(transactions, lid, sellerId) {
        
        return (
            <Grid>
                <Paper>
                    <Grid>
                        <TransactionForm listingId = {lid} sellerId = {sellerId} populateTransactions={this.populateTransactions.bind(this)} />
                    </Grid>
                </Paper>
                <Grid>
                    <h1 id="tabelLabel" >All Transactions</h1>
                    <p>Here are all the transactions for this listing.</p>
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                        <tr>
                            <th>Transactoin ID</th>
                            <th>Buyer ID</th>
                            <th>Quantity Bought</th>
                            <th>Listing ID</th>
                            <th>Seller ID</th>
                            <th>Sale Date</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.map(transaction => {
                            const handleClick = e => {
                                e.preventDefault();
                                if (window.confirm("Are you sure you want to delete this transaction?")) {
                                    this.deleteTransaction(transaction.transactionId, transaction.listingId);
                                }
                            }; 
                            return <tr key={transaction.transactionId}>
                                <td>{transaction.transactionId}</td>
                                <td>{transaction.buyerId}</td>
                                <td>{transaction.quantityBought}</td>
                                <td>{transaction.listingId}</td>
                                <td>{transaction.sellerId}</td>
                                <td>{transaction.date}</td>
                                <td>
                                    <ButtonGroup variant="text">
                                        <Button 
                                            style={{marginTop: 5, backgroundColor: 'transparent', border: 'none'}}>
                                            <EditIcon color="primary" fontSize="small"/></Button>
                                        <Button
                                            onClick={handleClick}
                                            style={{marginTop: 5, backgroundColor: 'transparent', border: 'none'}}>
                                            <DeleteIcon color="secondary" fontSize="small"/></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                            })}
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTransactionsTable(this.state.transactions,this.state.listingId, this.state.sellerId);
        return (
            <div>
                {contents}
            </div>
        );
    }
    
    async populateTransactions() {
        console.log("props: ", this.props);
        const params = this.props.location.state;
        const response = await fetch('transaction?listing=' + params.lid);
        const data = await response.json();
        console.log(data);
        this.setState({ transactions: data, loading: false, listingId: params.lid, sellerId: params.sellerId });
    }
    
    async deleteTransaction(tid, lid) {
        const response = await fetch('Transaction/api/delete?tid=' + tid + '&lid=' + lid, {method: 'DELETE',});
        const data = await response;
        console.log(data);
        await this.populateTransactions();
    }
}
