import React, {Component} from 'react';
import { Grid, Button, TextField } from "@material-ui/core"
import { withRouter } from 'react-router-dom';

class EventLookupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push(`/listing`,
            {eventId: this.state.value, eventName: ''}
        )
    }

    render() {
        return (
            <form autoComplete="off" noValidate onSubmit={this.handleSubmit}>
                <Grid container>
                    <Grid item xs = {9}>
                        <TextField
                            name = "eventId"
                            variant="outlined"
                            label="Event ID"
                            style = {{width : 830}}
                            onChange = {this.handleChange}
                        />
                    </Grid>
                    <Grid item xs = {3}>
                        <Button
                            type = "submit"
                            variant = "contained"
                            style={{backgroundColor: 'green', color: 'white', height: 55}}
                        >EventLookUp</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
}

export default withRouter(EventLookupForm);
