import { Component } from 'react';
import { Textbox } from './Textbox';

export class Whiteboard extends Component {
    render() {
        return <Textbox text="Test" x="50" y="100"/>;
    }
}