import { Component } from 'react';
import { Textbox } from './Textbox';

export class Whiteboard extends Component {
    // Data
    // -Type (Textbox, Link, Image, Video)
    // -Data (Depends on type)
    // -Position
    state = {
        // Can be retrieved from backend when built
        entries: [
            {
                type: "textbox",
                position: {
                    x: 50,
                    y: 100
                },
                data: {
                    text: "Hello"
                }
            },
            {
                type: "textbox",
                position: {
                    x: 100,
                    y: 50
                },
                data: {
                    text: "World"
                }
            }
        ]
    }
    render() {
        let c = this.state.entries.map(entry => {
            switch (entry.type) {
                case "textbox":
                    return (<Textbox text={entry.data.text} x={entry.position.x} y={entry.position.y}/>)
                    break;
            }
        })
        return c;
    }
}