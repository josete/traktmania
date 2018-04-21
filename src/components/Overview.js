import React, { Component } from 'react';
import { Image, Grid } from 'semantic-ui-react'
import $ from "jquery";

class Overview extends Component {
    render() {
        return (
            <Grid.Column>
				{this.props.info}
            </Grid.Column>
        );
    }
}

export default Overview;