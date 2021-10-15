import { Component } from 'react';
import { Textbox } from './Textbox';

export class Entry extends Component {
    state = {
        isEditing: false,
        isHovering: false,
        deleteOnFinishedEdit: false
    }

    startEdit = () => {
        if (this.state.isEditing || this.props.stopEdit())
            return;
        this.setState({isEditing: true});
        this.props.onStartEdit(this.onFinishEdit);
    }

    onFinishEdit = () => {
        this.setState({isEditing: false})
    }

    finishEdit = () => {
        this.props.stopEdit()
    }

    componentDidMount() {
        this.setState({text: this.props.text, isEditing: this.props.initialEdit});
        if (this.props.initialEdit)
            this.props.onStartEdit(this.onFinishEdit);
    }

    removeSelf = () => {
        this.props.removeEntry(this.props.entryIndex)
    }

    onHover = (didEnter) => {
        this.setState({isHovering: didEnter})
    }

    render() {
        let comp = null
        switch (this.props.type) {
            case "textbox":
                comp = <Textbox data={this.props.data} editing={this.state.isEditing} removeSelf={this.removeSelf} finishEdit={this.finishEdit}></Textbox>
                break;
        }
        return (
            <div style={{position: 'absolute', marginLeft: this.props.x + "px", marginTop: this.props.y + "px", border: "solid 1px", borderRadius: "5px", minHeight: "30px", padding: "7px"}} onClick={this.startEdit} onMouseEnter={() => this.onHover(true)} onMouseLeave={() => this.onHover(false)}>
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