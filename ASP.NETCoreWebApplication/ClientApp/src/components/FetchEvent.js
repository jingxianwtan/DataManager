import React, { Component } from 'react';
import Link from "react-router-dom/Link";

export class FetchEvent extends Component {
    static displayName = FetchEvent.name;

    constructor(props) {
        super(props);
        this.state = { events: [], loading: true };
    }

    componentDidMount() {
        this.populateEvent();
    }

    static renderEventsTable(events, parent, category) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Team</th>
                    <th>Event ID</th>
                    <th>Category ID</th>
                </tr>
                </thead>
                <tbody>
                {events.map(event => {
                    const link = `/${parent}/${category}/${event.eventId}/listings`;
                    return <tr key={event.eventName}>
                        <td><Link to={{pathname: link, state: {pName : parent, cName : category, eid : event.eventId}}}>{event.eventName}</Link></td>
                        <td>{event.eventTime}</td>
                        <td>{event.location}</td>
                        <td>{event.team}</td>
                        <td>{event.eventId}</td>
                        <td>{event.categoryId}</td>
                    </tr>;
                })}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
        ? <p><em>Loading...</em></p> 
        : FetchEvent.renderEventsTable(this.state.events, this.state.pName, this.state.cName);
        return (
            <div>
                <h1 id="tabelLabel" >All Event</h1>
                <p>Here are all the events.</p>
                {contents}
            </div>
        );
    }

    async populateEvent() {
        const params = this.props.location.state;
        var response;
        if (params == null) response = await fetch('event');
        else response = await fetch('event?category=' + params.cid);
        const data = await response.json();
        console.log("data is ", data)
        this.setState({ events: data, loading: false, pName : params.pName, cName: params.cName });
    }
}
