import { Component } from 'react';

export class Textbox extends Component {
    state = {
        text: ""
    }

    componentDidMount() {
        this.setState({text: this.props.data.text})
    }        

    handleChange = (event) => {
        this.setState({text: event.target.value});
    }

    handleSubmit = (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        this.props.updateData({text: this.state.text})
        this.props.finishEdit();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.editing !== this.props.editing && !this.props.editing) {
            this.onFinishEdit()
        }
    }

    onFinishEdit = () => {
        if (this.props.data.text === "")
        {
            this.props.removeSelf();
            return;
        }
    }

    render() {
        return !this.props.editing ? (
            // When not editing, show this
            <p style={{margin: 0}}>{this.props.data.text}</p>
        ) : (
            // Show this when editing
            <form onSubmit={this.handleSubmit}>
                <input autoFocus style={{margin: "auto", border: 0, outline: "none"}} size="0" type="text" value={this.state.text} onChange={this.handleChange}/>
            </form>
        )
    }
}