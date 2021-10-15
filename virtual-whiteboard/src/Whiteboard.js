import { Component } from 'react';
import { Entry } from './Entries/Entry';
import { Toolbar } from './Toolbar';
import { socket } from './Socket';
import { v4 as uuidv4 } from 'uuid';

export class Whiteboard extends Component {
    // Data
    // -Type
    // -Data (Depends on type)
    // -Position
    // -UUID
    state = {
        entries: [],
        currentlyEditingCallback: null,
        currentTool: 0
    }

    componentDidMount() {
        socket.on("updateAllEntries", (json) => {
            let data = JSON.parse(json);
            data = data.map(entry => {
                entry.isJustAdded = false;
                return entry;
            })
            console.log(data);
            this.setState({entries: data});
        });

        socket.on("entry", (json) => {
            let data = JSON.parse(json);
            let entries = this.state.entries;
            let entry = entries.findIndex(entry => entry.uuid == data.uuid);
            data.isJustAdded = false;
            if (entry == -1) {
                entries.push(data);
            }
            else {
                entries[entry] = data;
            }
            this.setState({entries: entries});
        })
    }

    // Adds a new entry
    clickWhiteboard = (event) => {
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
                    isJustAdded: true,
                    uuid: uuidv4()
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
                    isJustAdded: true,
                    uuid: uuidv4()
                }
                break;
        }
        entries.push(newEntry)
        this.setState({entries})
        this.sendEntryToServer(newEntry)
    }

    updateEntry = (uuid, data) => {
        let entries = [...this.state.entries];
        let index = entries.findIndex(entry => entry.uuid === uuid);
        entries[index].data = data;
        this.setState({entries: entries});
        this.sendEntryToServer(entries[index])
    }

    sendEntryToServer = (entry) => {
        let json = JSON.stringify(entry)
        if (json.hasOwnProperty("isJustAdded")) {
            delete json.isJustAdded
        }
        socket.emit('entry', json)
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
    removeEntry = (uuid) => {
        console.log("Removing Entry")
        let entries = [...this.state.entries];
        let index = entries.findIndex(entry => entry.uuid === uuid);
        entries = entries.slice(index, 1);
        this.setState({entries: entries, currentlyEditingCallback: null});
    }

    changeTool = (index) => {
        this.setState({currentTool: index});
    }

    render() {
        console.log(this.state.entries)
        // Create entries
        let c = this.state.entries.map((entry, index) => {
            return (<Entry entry={entry} key={entry.uuid} initialEdit={entry.isJustAdded} onStartEdit={this.registerEdit} removeEntry={this.removeEntry} stopEdit={this.stopCurrentEdit} updateEntry={this.updateEntry}/>)
        })
        return (
            <div style={{position: "fixed", width: "100%", height: "100%", margin: 0}} onClick={this.clickWhiteboard}>
                <Toolbar changeToolCallback={this.changeTool}></Toolbar>
                {c}
            </div>
        );
    }
}