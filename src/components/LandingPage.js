import React, { Component } from 'react';
import { Image, Button, Segment, Grid } from 'semantic-ui-react'
import $ from "jquery";

class LandingPage extends Component {
    constructor() {
        super();
        function getParameterByName(name) {
            var url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        if (localStorage.getItem("infoTrakt")==undefined) {
            var code = getParameterByName("code");
            if (code != null) {
                $.ajax({                    
                    url: "https://api.trakt.tv/oauth/token",
                    type: "POST",
                    headers:{'Content-Type':'application/json'},
                    data: JSON.stringify({
                        "code": code,
                        "client_id": process.env.REACT_APP_TRAKT_CLIENT_ID,
                        "client_secret": process.env.REACT_APP_TRAKT_CLIENT_SECRET,
                        "redirect_uri": process.env.REACT_APP_TRAKT_REDIRECT_URI,
                        "grant_type": "authorization_code"
                    }),
                    dataType: "json",
                }).done(function (data) {
                    localStorage.setItem("infoTrakt",JSON.stringify(data));
                    $.ajax({                    
                        url: "https://thetvdb-api-proxy.herokuapp.com/login",
                        type: "POST",
                        headers:{'Content-Type':'application/json'},
                        data: JSON.stringify({
                            "apikey": process.env.REACT_APP_THETVDB_API_KEY,
                            "username": process.env.REACT_APP_THETVDB_USERNAME,
                            "userkey": process.env.REACT_APP_THETVDB_PASSWORD
                        }),
                        dataType: "json"
                    }).done(function (data) {
                        localStorage.setItem("tokenTvDB",data.token);
                        var url = "http://" + window.location.host + "/dashboard";
                        window.location = url;
                    });
                });
            }
        }else{
            var url = "http://" + window.location.host + "/dashboard";
            window.location = url;
        }
    }
    handleItemClick = (e, { name }) => {
        switch (name) {
            case "login":
                window.location = "https://trakt.tv/oauth/authorize?client_id=867a8066938b697327992b4cbb6097397c1bb85383287a9c20c9fb9bc609c5d6&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code";
                break;
        }
    }
    render() {
        return (
            <div className="mainDiv">
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                <div className="mainButtons">
                    <div className="contentMainButtons">
                        <Grid stackable columns={2}>
                            <Grid.Column>
                                <Button size="massive" color="black" name="login" onClick={this.handleItemClick}>Entrar</Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Button size="massive" color="red">Unete</Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;