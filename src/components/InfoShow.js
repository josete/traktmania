import React, { Component } from 'react';
import { Menu, Icon, Grid, Image, Segment } from 'semantic-ui-react'
import $ from "jquery";
import MenuComponent from './MenuComponent';
import Overview from './Overview';

class InfoShow extends Component {
    state = { activeItem: "shows" }
    constructor() {
        super();
        if (localStorage.getItem("infoTrakt") == undefined) {
            var url = "http://" + window.location.host;
            window.location = url;
        } else {
            var partes = window.location.pathname.split("/");
            this.id = partes[partes.length - 1];
            function getImagen(id) {
                var imagenes = $.ajax({
                    url: "https://thetvdb-api-proxy.herokuapp.com/series/" + id + "/images/query?keyType=series",
                    type: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem("tokenTvDB")
                    },
                    dataType: "json",
                    async: false
                }).responseJSON;
                return getMejorImagen(imagenes);
            }
            function getMejorImagen(datos) {
                var data = datos.data;
                var notaActual = 0;
                var ruta = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ratingsInfo.average > notaActual) {
                        notaActual = data[i].ratingsInfo.average;
                        ruta = data[i].fileName;
                    }
                }
                return ruta;
            }
            this.imagen = getImagen(this.id);
			function getInfo(id){
				var info = $.ajax({
                    url: "https://thetvdb-api-proxy.herokuapp.com/series/" + id,
                    type: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem("tokenTvDB"),
						'Accept-Language': "es"
                    },
                    dataType: "json",
                    async: false
                }).responseJSON;
				return info;
			}
			this.info = getInfo(this.id);
		}
    }
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
        switch (name) {
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
                <MenuComponent activeItem={this.state.activeItem} handleItemClick={this.handleItemClick} />
                <div class="header" style={{background: "url(https://www.thetvdb.com/banners/"+this.imagen+") no-repeat"}}> 
					<Segment className="serieName">
						<h1>{this.info.data.seriesName}</h1>
					</Segment>
                </div>
				<Grid stackable columns={2}>
					<Overview info={this.info.data.overview}/>
				</Grid>
            </div>
        );
    }
}

export default InfoShow;