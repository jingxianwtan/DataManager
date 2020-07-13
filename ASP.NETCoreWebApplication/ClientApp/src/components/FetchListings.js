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

    renderListingsTable(listings, parent, category, eid) {
        return (
            <Grid>
                <Paper>
                    <Grid>
                        <ListingForm eventId={eid} listing = {this.state.listing_to_be_edited} populateListings = {this.populateListings.bind(this)}/>
                    </Grid>
                </Paper>
                <Grid>
                    <h1 id="tabelLabel" >All Listings</h1>
                    <p>Here are all the Listings.</p>
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
                            const link = `/${parent}/${category}/${eid}/listings/${listing.listingId}/transactions`;
                            return <tr key={listing.listingId}>
                                <td><Link to = {{pathname: link, state: {lid : listing.listingId, sellerId: listing.userId}}}>{listing.listingId}</Link></td>
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
            : this.renderListingsTable(this.state.listings, this.state.pName, this.state.cName, this.state.eid);
        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateListings() {
        const params = this.props.location.state;
        const response = await fetch('listing?event=' + params.eid); 
        const data = await response.json();
        this.setState({ listings: data, loading: false, pName : params.pName, cName: params.cName, eid : params.eid});
    }

    async deleteListing(lid, eid) {
        const response = await fetch('Listing/api/delete?lid=' + lid + '&eid=' + eid, {method: 'DELETE',});
        const data = await response;
        await this.populateListings();
    }
}
