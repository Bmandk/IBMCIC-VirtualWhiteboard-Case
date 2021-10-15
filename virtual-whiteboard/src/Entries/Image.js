import { Component } from 'react';

export class Image extends Component {
    handleChange = (event) => {
        this.props.updateData({image: URL.createObjectURL(event.target.files[0])})
        this.handleSubmit();
    }

    handleSubmit = (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        this.props.finishEdit();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.editing !== this.props.editing && !this.props.editing) {
            this.onFinishEdit()
        }
    }

    onFinishEdit = () => {
        if (this.state.image === "") {
            this.props.removeSelf();
        }
    }

    render() {
        return !this.props.editing ? (
            // When not editing, show this
            <img src={this.props.data.image} />
        ) : (
            // Show this when editing
            <form onSubmit={this.handleSubmit}>
                <input autoFocus type="file" style={{width: "200px", height: "100px"}} accept=".png,.jpg,.jpeg" onChange={this.handleChange}/>
            </form>
        )
    }
}