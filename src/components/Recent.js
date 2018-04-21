import React, { Component } from 'react';
import { Menu, Icon,Grid } from 'semantic-ui-react'
import $ from "jquery";
import Tarjeta from './Tarjeta';

class Recent extends Component {
    constructor() {
        super();
        function getRecientes() {
            return $.ajax({
                url: 'https://api.trakt.tv/sync/history/?page=1&limit=10',
                type: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(localStorage.getItem("infoTrakt")).token_type + " " + JSON.parse(localStorage.getItem("infoTrakt")).access_token,
                    'trakt-api-version': '2',
                    'trakt-api-key': process.env.REACT_APP_TRAKT_CLIENT_ID
                },
                dataType: "json",
                async: false
            }).responseJSON;
        }
        function getInfoRecientes(datos) {
            var objetos = [];
            for (var i = 0; i < datos.length; i++) {
                var objeto = {};
                objeto.titulo = datos[i].show.title;
                objeto.idTVDB = datos[i].show.ids.tvdb;
                objetos.push(objeto);
            }
            return objetos;
        }
        function reducirArray(objetos) {
            var reducido = [];
            for (var i = 0; i < objetos.length; i++) {
                if (!comprobarSiEsta(reducido, objetos[i].idTVDB)) {
                    reducido.push(objetos[i]);
                }
            }
            return reducido;
        }
        function comprobarSiEsta(reducido, id, callback) {
            var esta = false;
            for (var i = 0; i < reducido.length; i++) {
                if (reducido[i].idTVDB == id) {
                    esta = true;
                    break;
                }
            }
            return esta;
        }
        function getImagenes(reducido) {
            var imagenesRecientes = [];
            for (var i = 0; i < reducido.length; i++) {
                var imagenes = $.ajax({
                    url: "https://thetvdb-api-proxy.herokuapp.com/series/" + reducido[i].idTVDB + "/images/query?keyType=poster",
                    type: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem("tokenTvDB")
                    },
                    dataType: "json",
                    async: false
                }).responseJSON;
                imagenesRecientes.push(getMejorImagen(imagenes));
            }
            return imagenesRecientes;
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
        this.recientes = getRecientes();
        var info = getInfoRecientes(this.recientes);
        var reducido = reducirArray(info);
        this.imagenes = getImagenes(reducido);
        this.todo = [];
        for(var i = 0; i < this.imagenes.length; i++){
            var o = {};
            o.titulo = reducido[i].titulo;
            o.idTVDB = reducido[i].idTVDB;
            o.imagen = this.imagenes[i];
            this.todo.push(o);
        }
    }
    render() {
        var tarjetas = [];
        for (var i = 0; i < this.imagenes.length; i++) {

        }
        return (
            <div className="content">
                <Grid stackable columns={4}>
                    {this.todo.map(function (objeto) {
                        return <Tarjeta image={"https://www.thetvdb.com/banners/" + objeto.imagen} titulo={objeto.titulo} id={objeto.idTVDB} key={objeto.idTVDB} />
                    })}
                </Grid>
            </div>
        );
    }
}

export default Recent;
