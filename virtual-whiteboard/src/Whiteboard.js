import { Component } from 'react';
import { Entry } from './Entries/Entry';
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
        currentTool: 0
    }

    // Adds a new entry
    addEntry = (event) => {
        // Only add entry if we clicked an empty space
        if (event.target !== event.currentTarget)
            return;
        
        if (this.stopCurrentEdit())
            return;

        let entries = [...this.state.entries]
        let newEntry = {}
        switch (this.state.currentTool) {
            case 0: // Text tool
                newEntry = {
                    type: "textbox",
                    position: {
                        x: event.clientX,
                        y: event.clientY
                    },
                    data: {
                        text: ""
                    },
                    isJustAdded: true
                }
                break;
            case 1: // Image tool
                newEntry = {
                    type: "image",
                    position: {
                        x: event.clientX,
                        y: event.clientY
                    },
                    data: {
                        image: ""
                    },
                    isJustAdded: true
                }
                break;
        }
        console.log(newEntry)
        entries.push(newEntry)
        this.setState({entries})
    }

    // Entries should call this when they start their editing
    registerEdit = (callback) => {
        this.stopCurrentEdit()
        this.setState({currentlyEditingCallback: callback})
    }

    // Stops the current entry from editing
    stopCurrentEdit = () => {
        if (this.state.currentlyEditingCallback != null) {
            this.state.currentlyEditingCallback();
            this.setState({currentlyEditingCallback: null});
            return true;
        }

        return false;
    }

    // Removes an entry from the list of entries
    removeEntry = (index) => {
        let entries = [...this.state.entries];
        entries.splice(index, 1);
        this.setState({entries: entries, currentlyEditingCallback: null});
    }

    changeTool = (index) => {
        this.setState({currentTool: index});
    }

    render() {
        // Create entries
        let c = this.state.entries.map((entry, index) => {
            return (<Entry type={entry.type} data={entry.data} x={entry.position.x} y={entry.position.y} key={index} entryIndex={index} initialEdit={entry.isJustAdded} onStartEdit={this.registerEdit} removeEntry={this.removeEntry} stopEdit={this.stopCurrentEdit}/>)
        })
        return (
            <div style={{position: "fixed", width: "100%", height: "100%", margin: 0}} onClick={this.addEntry}>
                <Toolbar changeToolCallback={this.changeTool}></Toolbar>
                {c}
            </div>
        );
    }
}