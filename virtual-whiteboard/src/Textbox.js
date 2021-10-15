import { Component } from 'react';

export class Textbox extends Component {
    state = {
        isEditing: false,
        text: ""
    }

    editBox = () => {
        if (this.props.stopEdit())
            return;
        this.setState({isEditing: true});
        this.props.onStartEdit(this.handleSubmit);
    }

    componentDidMount() {
        this.setState({text: this.props.text, isEditing: this.props.initialEdit});
        if (this.props.initialEdit)
            this.props.onStartEdit(this.handleSubmit);
    }

    handleChange = (event) => {
        this.setState({text: event.target.value});
    }

    handleSubmit = (event) => {
        if(event && event.preventDefault) {
            event.preventDefault();
        }
        if (this.state.text === "")
        {
            this.props.removeEntry(this.props.entryIndex)
        }
        this.setState({isEditing: false})
    }

    render() {
        return (
            <div style={{position: 'absolute', marginLeft: this.props.x + "px", marginTop: this.props.y + "px", border: "solid 1px", borderRadius: "5px", minHeight: "30px", padding: "7px"}} onClick={this.editBox}>
                {!this.state.isEditing ? (
                    // When not editing, show this
                    <p style={{backgroundColor: !this.state.isEditing ? "#fff" : "#ccc", margin: 0}}>{this.state.text}</p>
                ) : (
                    // Show this when editing
                    <form onSubmit={this.handleSubmit}>
                        <input autoFocus style={{margin: "auto", border: 0, outline: "none"}} size="0" type="text" value={this.state.text} onChange={this.handleChange}/>
                    </form>
                )
                }
            </div>
        )
    }
}