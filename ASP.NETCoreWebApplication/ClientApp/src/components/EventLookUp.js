import React, { Component } from 'react';
import { Grid } from "@material-ui/core"
import EventLookupForm from "./EventLookupForm";

export class EventLookUp extends Component {
    static displayName = EventLookUp.name;

    render () {
        return (
            <div>
                <h1>Enter event ID to look up an event</h1>
                <Grid container>
                    <Grid item xs = {12} style = {{marginTop: 30}}>
                        <EventLookupForm> </EventLookupForm>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
