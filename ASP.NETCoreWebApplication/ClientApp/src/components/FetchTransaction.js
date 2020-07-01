﻿import React, { Component } from 'react';

export class FetchTransaction extends Component {
    static displayName = FetchTransaction.name;

    constructor(props) {
        super(props);
        this.state = { transactions: [], loading: true };
    }

    componentDidMount() {
        this.populateTransactions();
    }

    static renderTransactionsTable(transactions) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Transactoin ID</th>
                    <th>Buyer ID</th>
                    <th>Quantity Bought</th>
                    <th>Listing ID</th>
                    <th>Seller ID</th>
                    <th>Sale Date</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map(transactions =>
                    <tr key={transactions.transactionId}>
                        <td>{transactions.transactionId}</td>
                        <td>{transactions.buyerId}</td>
                        <td>{transactions.quantityBought}</td>
                        <td>{transactions.listingId}</td>
                        <td>{transactions.sellerId}</td>
                        <td>{transactions.date}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchTransaction.renderTransactionsTable(this.state.transactions);
        return (
            <div>
                <h1 id="tabelLabel" >All Transactions</h1>
                <p>Here are all the transactions for this listing.</p>
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
        this.setState({ transactions: data, loading: false });
    }
}
