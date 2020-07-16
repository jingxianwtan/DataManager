import React, { Component } from 'react';
import Link from "react-router-dom/Link";
import ListingForm from "./ListingForm"
import { Grid, Paper } from "@material-ui/core"
import {Button, ButtonGroup} from "reactstrap";
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

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
                        <ListingForm eventId={eventId} listing = {this.state.listing_to_be_edited} populateListings = {this.populateListings.bind(this)}/>
                    </Grid>
                </Paper>
                <Grid>
                    <h1 id="tabelLabel" >All Listings</h1>
                    <p>Here are all the Listings for {eventName}.</p>
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                        <tr>
                            <th>Listing ID</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>User ID</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listings.map(listing => {
                            const handleClick = e => {
                                e.preventDefault();
                                if (window.confirm("Are you sure you want to delete this listing?")) {
                                    this.deleteListing(listing.listingId, listing.eventId);
                                }
                            };
                            return <tr key={listing.listingId}>
                                <td><Link to = {{pathname: `/transaction`, state: {listingId : listing.listingId, sellerId: listing.userId, eventName: eventName}}}>{listing.listingId}</Link></td>
                                <td>{listing.price}</td>
                                <td>{listing.quantity}</td>
                                <td>{listing.userId}</td>
                                <td>
                                    <ButtonGroup variant="text">
                                        <Button
                                            onClick={this.handleEdit.bind(this, listing)}
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

    handleEdit(listing, e) {
        e.preventDefault();
        this.setState({listing_to_be_edited: listing}, function () {
        });
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
        const data = await response.json();
        this.setState({ listings: data, loading: false, eventId : params.eventId, eventName : params.eventName});
    }

    async deleteListing(lid, eid) {
        const response = await fetch('Listing/api/delete?lid=' + lid + '&eid=' + eid, {method: 'DELETE',});
        const data = await response;
        await this.populateListings();
    }
}
