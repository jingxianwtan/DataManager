import React, { Component } from 'react';
import { Grid, Button } from "@material-ui/core"
import EventLookupForm from "./EventLookupForm";

export class Home extends Component {
  static displayName = Home.name;

    handleClick(pid, pname, e) {
        e.preventDefault();
        this.props.history.push(`/category`,
            {pid: pid, pname: pname})
    }
  
  render () {
    return (
      <div>
          <h1>Test Data Manager</h1>
          <Grid container>
              <Grid container item xs = {12}>
                  <Grid item xs = {3}>
                      <Button
                          onClick= {this.handleClick.bind(this, '1', 'concert')}
                          variant = "contained"
                          style={{backgroundColor: 'deeppink', color: 'white', marginTop: 10, minWidth: 250}}
                      >Concert</Button>
                  </Grid>
                  <Grid item xs = {3}>
                      <Button
                          onClick= {this.handleClick.bind(this, '2', 'sport')}
                          variant = "contained"
                          style={{backgroundColor: 'deepskyblue', color: 'white', marginTop: 10, minWidth: 250}}
                      >Sport</Button>
                  </Grid>
                  <Grid item xs = {3}>
                      <Button
                          onClick= {this.handleClick.bind(this, '3', 'theatre')}
                          variant = "contained"
                          style={{backgroundColor: 'gold', color: 'white', marginTop: 10, minWidth: 250}}
                      >Theatre</Button>
                  </Grid>
                  <Grid item xs = {3}>
                      <Button
                          onClick= {this.handleClick.bind(this, '4', 'festival')}
                          variant = "contained"
                          style={{backgroundColor: 'limegreen', color: 'white', marginTop: 10, minWidth: 250}}
                      >Festival</Button>
                  </Grid>
              </Grid>
              <Grid item xs = {12} style = {{marginTop: 30}}>
                  <EventLookupForm> </EventLookupForm>
              </Grid>
          </Grid>
      </div>
    );
  }
}
