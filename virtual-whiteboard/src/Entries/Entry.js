import { Component } from 'react';
import { Textbox } from './Textbox';
import { Image } from './Image';
import { socket } from '../Socket';

export class Entry extends Component {
    state = {
        isEditing: false,
        isHovering: false,
        deleteOnFinishedEdit: false,
        isCreatedServer: false,
    }

    startEdit = () => {
        if (this.state.isEditing || this.props.stopEdit())
            return;
        this.setState({isEditing: true});
        this.props.onStartEdit(this.onFinishEdit);
    }

    onFinishEdit = () => {
        this.setState({isEditing: false})

        socket.emit('addEntry', )
    }

    finishEdit = () => {
        this.props.stopEdit()
    }

    componentDidMount() {
        console.log(this.props.initialEdit);
        this.setState({
            isEditing: this.props.initialEdit
        });

        if (this.props.initialEdit) {
            this.props.onStartEdit(this.onFinishEdit);
        }
    }

    removeSelf = () => {
        this.props.removeEntry(this.props.entryIndex)
    }

    updateSelf = (data) => {
        this.props.updateEntry(this.props.entry.uuid, data)
    }

    onHover = (didEnter) => {
        this.setState({isHovering: didEnter})
    }

    render() {
        let comp = null
        switch (this.props.entry.type) {
            case "textbox":
                comp = <Textbox data={this.props.entry.data} editing={this.state.isEditing} removeSelf={this.removeSelf} finishEdit={this.finishEdit} updateData={this.updateSelf}></Textbox>
                break;
            case "image":
                comp = <Image data={this.props.entry.data} editing={this.state.isEditing} removeSelf={this.removeSelf} finishEdit={this.finishEdit} updateData={this.updateSelf}></Image>
                break;
            default:
                console.log("Unknown data type")
                return;
        }
        return (
            <div style={{position: 'absolute', marginLeft: this.props.entry.position.x + "px", marginTop: this.props.entry.position.y + "px", border: "solid 1px", borderRadius: "5px", minHeight: "30px", padding: "7px"}} onClick={this.startEdit} onMouseEnter={() => this.onHover(true)} onMouseLeave={() => this.onHover(false)}>
                {comp}
                {this.state.isHovering && (
                    // Delete button
                    // The UX for this is really scuffed
                    <div style={{position: 'absolute', right: "-6px", top: "-16px"}} onMouseEnter={() => this.onHover(true)} onClick={this.removeSelf}>x</div>
                )}
            </div>
        )
    }
}