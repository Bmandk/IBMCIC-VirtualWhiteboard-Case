import { Component } from 'react';

export class Textbox extends Component {
    state = {
        isEditing: false,
        text: ""
    }

    editBox = () => {
        this.setState({isEditing: true})
        this.props.onStartEdit(this.handleSubmit)
    }

    componentDidMount() {
        this.props.onStartEdit(this.handleSubmit)
        this.setState({text: this.props.text, isEditing: this.props.initialEdit})
    }

    handleChange = (event) => {
        this.setState({text: event.target.value});
    }

    handleSubmit = (event) => {
        if(event && event.preventDefault) {
            event.preventDefault()
        }
        this.setState({isEditing: false})
    }

    render() {
        return (
            <div style={{position: 'absolute', marginLeft: this.props.x + "px", marginTop: this.props.y + "px", border: "solid 1px", borderRadius: "5px"}} onClick={this.editBox}>
                {!this.state.isEditing ? (
                    <p style={{margin: "7px", backgroundColor: !this.state.isEditing ? "#fff" : "#ccc"}}>{this.state.text}</p>
                ) : (
                    <form onSubmit={this.handleSubmit}>
                        <input autoFocus style={{margin: "auto"}} type="text" value={this.state.text} onChange={this.handleChange}/>
                    </form>
                )
                }
            </div>
        )
    }
}