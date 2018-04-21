import React, { Component } from 'react';
import { Menu, Icon} from 'semantic-ui-react'
import $ from "jquery";
import MenuComponent from './MenuComponent';
import Recent from './Recent';
import Shows from './Shows';
import Films from './Films';
import Discover from './Discover';

class Dashboard extends Component {
    state = {activeItem:"recent"}
    constructor() {
        super();
        if (localStorage.getItem("infoTrakt") == undefined) {
            var url = "http://" + window.location.host;
            window.location = url;
        }
    }
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
        switch(name){
            case "exit":
                localStorage.removeItem("info");
                var url = "http://" + window.location.host;
                window.location = url;
            break;
        }
    }
    render() {
        return (
            <div>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                <MenuComponent activeItem={this.state.activeItem} handleItemClick={this.handleItemClick}/>
                {this.state.activeItem === "recent" ?(
                    <Recent />
                ):(this.state.activeItem === "shows")?(
                    <Shows />
                ):(this.state.activeItem === "films")?(
                    <Films />
                ):(
                    <Discover />
                )}
            </div>
        );
    }
}

export default Dashboard;