import { Component } from 'react';
import { Textbox } from './Textbox';

export class Whiteboard extends Component {
    // Data
    // -Type (Textbox, Link, Image, Video)
    // -Data (Depends on type)
    // -Position
    state = {
        // Mock data
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
                },
                isJustAdded: false
            },
            {
                type: "textbox",
                position: {
                    x: 100,
                    y: 50
                },
                data: {
                    text: "World"
                },
                isJustAdded: false
            }
        ],
        currentlyEditingCallback: null,
    }

    // Adds a new entry
    addEntry = (event) => {
        // Only add entry if we clicked an empty space
        if (event.target !== event.currentTarget)
            return;

        this.stopCurrentEdit()

        let entries = [...this.state.entries]
        entries.push({
            type: "textbox",
            position: {
                x: event.clientX,
                y: event.clientY
            },
            data: {
                text: ""
            },
            isJustAdded: true
        })
        this.setState({entries})
    }

    registerEdit = (callback) => {
        this.setState({currentlyEditingCallback: callback})
        this.stopCurrentEdit()
    }

    stopCurrentEdit = () => {
        if (this.state.currentlyEditingCallback != null) {
            this.state.currentlyEditingCallback();
        }
    }

    render() {
        let c = this.state.entries.map((entry, index) => {
            switch (entry.type) {
                case "textbox":
                    return (<Textbox text={entry.data.text} x={entry.position.x} y={entry.position.y} key={index} initialEdit={entry.isJustAdded} onStartEdit={this.registerEdit}/>)
                default:
                    console.log("Type not recognized")
                    break;
            }
            return null;
        })
        return (
            <div style={{position: "fixed", width: "100%", height: "100%", margin: 0}} onClick={this.addEntry}>
                {c}
            </div>
        );
    }
}