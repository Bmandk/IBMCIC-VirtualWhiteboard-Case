import { Component } from 'react';
import { Textbox } from './Textbox';
import { Toolbar } from './Toolbar';

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
        
        if (this.stopCurrentEdit())
            return;

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

    // Entries should call this when they start their editing
    registerEdit = (callback) => {
        this.setState({currentlyEditingCallback: callback})
        this.stopCurrentEdit()
    }

    // Stops the current entry from editing
    stopCurrentEdit = () => {
        if (this.state.currentlyEditingCallback != null) {
            this.state.currentlyEditingCallback();
            this.setState({currentlyEditingCallback: null})
            return true;
        }

        return false;
    }

    // Removes an entry from the list of entries
    removeEntry = (index) => {
        let entries = [...this.state.entries]
        entries.splice(index, 1)
        this.setState({entries: entries, currentlyEditingCallback: null})
    }

    render() {
        // Create entries
        let c = this.state.entries.map((entry, index) => {
            switch (entry.type) {
                case "textbox":
                    return (<Textbox text={entry.data.text} x={entry.position.x} y={entry.position.y} key={index} entryIndex={index} initialEdit={entry.isJustAdded} onStartEdit={this.registerEdit} removeEntry={this.removeEntry} stopEdit={this.stopCurrentEdit}/>)
                default:
                    console.log("Type not recognized")
                    break;
            }
            return null;
        })
        return (
            <div style={{position: "fixed", width: "100%", height: "100%", margin: 0}} onClick={this.addEntry}>
                <Toolbar></Toolbar>
                {c}
            </div>
        );
    }
}