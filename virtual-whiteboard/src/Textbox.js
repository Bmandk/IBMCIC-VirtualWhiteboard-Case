import { Component } from 'react';

export class Textbox extends Component {
    constructor(props) {

        super(props);

        this.state = {
            x: -9999,
            y: -9999,
        };

    }

    setCoordinates = (x,y) => {
        return `position:absolute;   
                left:${x}px;         
                top:${y}px;`
    }

    render() {
        return (
            <div style={{position: 'absolute', marginLeft: this.props.x + "px", marginTop: this.props.y + "px"}}>
                <p>{this.props.text}</p>
            </div>
        )
    }
}