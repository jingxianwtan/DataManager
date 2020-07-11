import React, { Component } from 'react';
import Link from "react-router-dom/Link";
import ListingForm from "./ListingForm"
import { Grid, Paper } from "@material-ui/core"

export class FetchListings extends Component {
    static displayName = FetchListings.name;

    constructor(props) {
        super(props);
        this.state = { listings: [], loading: true };
    }

    componentDidMount() {
        this.populateListings();
    }

    static renderListingsTable(listings, parent, category, eid) {
        return (
            <Grid>
                <Paper>
                    <Grid>
                        <ListingForm eventId={eid}/>
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
                        </tr>
                        </thead>
                        <tbody>
                        {listings.map(listing => {
                            const link = `/${parent}/${category}/${eid}/listings/${listing.listingId}/transactions`;
                            return <tr key={listing.listingId}>
                                <td><Link to = {{pathname: link, state: {lid : listing.listingId, sellerId: listing.userId}}}>{listing.listingId}</Link></td>
                                <td>{listing.price}</td>
                                <td>{listing.quantity}</td>
                                <td>{listing.userId}</td>
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
            : FetchListings.renderListingsTable(this.state.listings, this.state.pName, this.state.cName, this.state.eid);
        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateListings() {
        console.log("props: ", this.props);
        const params = this.props.location.state;
        const response = await fetch('listing?event=' + params.eid); 
        const data = await response.json();
        this.setState({ listings: data, loading: false, pName : params.pName, cName: params.cName, eid : params.eid});
    }
}
