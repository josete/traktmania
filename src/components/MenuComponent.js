import React, { Component } from 'react';
import { Menu, Icon} from 'semantic-ui-react'
import $ from "jquery";

class MenuComponent extends Component {
    render() {
        return (
                <Menu stackable pointing secondary color="red" id="menu">
                    <Menu.Item>
                        <img src='/logo.png' />
                    </Menu.Item>
                    <Menu.Item
                        name='recent'
                        active={this.props.activeItem === 'recent'}
                        onClick={this.props.handleItemClick}>
                        Recientes
                    </Menu.Item>
                    <Menu.Item
                        name='shows'
                        active={this.props.activeItem === 'shows'}
                        onClick={this.props.handleItemClick}>
                        Series
                    </Menu.Item>
                    <Menu.Item
                        name='films'
                        active={this.props.activeItem === 'films'}
                        onClick={this.props.handleItemClick}>
                        Peliculas
                    </Menu.Item>
                    <Menu.Item
                        name='discover'
                        active={this.props.activeItem === 'discover'}
                        onClick={this.props.handleItemClick}>
                        Descubrir
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='exit'
                            active={this.props.activeItem === 'exit'}
                            onClick={this.props.handleItemClick}>
                            Salir
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
        );
    }
}

export default MenuComponent;