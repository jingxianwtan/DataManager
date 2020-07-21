import React, { Component } from 'react';
import ListingForm from "./ListingForm"
import { Grid, Paper } from "@material-ui/core"
import {Button, ButtonGroup} from "reactstrap";
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import ListAltIcon from '@material-ui/icons/ListAlt';

export class FetchListings extends Component {
    static displayName = FetchListings.name;

    constructor(props) {
        super(props);
        this.state = { listings: [], loading: true };
    }

    componentDidMount() {
        this.populateListings();
    }

    renderListingsTable(listings, eventId, eventName) {
        return (
            <Grid>
                <Paper>
                    <Grid>
                        <ListingForm eventId={eventId} listing = {this.state.listing_to_be_edited} populateListings = {this.populateListings.bind(this)} eventName = {eventName}/>
                    </Grid>
                </Paper>
                <Grid>
                    <h1 id="tabelLabel" >All Listings for event {eventName}</h1>
{/*                    <p>Here are all the Listings for {eventName}.</p>*/}
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                        <tr>
                            <th>See Transactions</th>
                            <th>Listing ID</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>User ID</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listings.map(listing => {
                            return <tr key={listing.listingId}>
                                <td>
                                    <Button 
                                        onClick={this.handleTransaction.bind(this, listing, this.state.eventName)}
                                        style={{ backgroundColor: 'transparent', border: 'none'}}> 
                                        <ListAltIcon color="primary" fontSize="small" /> 
                                    </Button>
                                </td>
                                <td>{listing.listingId}</td>
                                <td>{listing.price}</td>
                                <td>{listing.quantity}</td>
                                <td>{listing.userId}</td>
                                <td>
                                    <ButtonGroup variant="text">
                                        <Button
                                            onClick={this.handleEdit.bind(this, listing)}
                                            style={{backgroundColor: 'transparent', border: 'none'}}>
                                            <EditIcon color="primary" fontSize="small"/></Button>
                                        <Button
                                            onClick={this.handleDelete.bind(this, listing)}
                                            style={{backgroundColor: 'transparent', border: 'none'}}>
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

    handleEdit(listing, e) {
        e.preventDefault();
        this.setState({listing_to_be_edited: listing}, function () {
        });
    }

    handleDelete(listing, e) {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this listing?")) {
            this.deleteListing(listing.listingId, listing.eventId);
        }
    };
    
    handleTransaction(listing, eventName, e) {
        e.preventDefault();
        this.props.history.push(`/transaction`, 
            {listingId : listing.listingId, sellerId: listing.userId, eventName: eventName}
            )
    }
    
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderListingsTable(this.state.listings, this.state.eventId, this.state.eventName);
        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateListings() {
        const params = this.props.location.state;
        const response = await fetch('listing?event=' + params.eventId); 
        if (!response.ok) {
            window.alert("This Event Id does not exist");
            this.props.history.push('/');
        }
        const data = await response.json();
        this.setState({ listings: data, loading: false, eventId : params.eventId, eventName : params.eventName});
    }

    async deleteListing(lid, eid) {
        const response = await fetch('Listing/api/delete?lid=' + lid + '&eid=' + eid, {method: 'DELETE',});
        const data = await response;
        await this.populateListings();
    }
}
