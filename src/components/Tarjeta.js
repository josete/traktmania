import React, { Component } from 'react';
import { Image, Grid } from 'semantic-ui-react'
import $ from "jquery";

class Tarjeta extends Component {
    render() {
        return (
            <Grid.Column>
                <div className="poster">
                    <a href={"/show/"+this.props.id}><Image src={this.props.image} /></a>
                    <h5>{this.props.titulo}</h5>
                </div>
            </Grid.Column>
        );
    }
}

export default Tarjeta;