import { Component } from 'react';

export class Image extends Component {

    handleChange = (event) => {
        let file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = this.handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        this.props.updateData({image: btoa(binaryString)});
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
        if (this.props.data.image === "") {
            this.props.removeSelf();
        }
    }

    render() {
        return !this.props.editing ? (
            // When not editing, show this
            <img src={"data:image/png;base64, " + this.props.data.image} />
        ) : (
            // Show this when editing
            <form onSubmit={this.handleSubmit}>
                <input autoFocus type="file" style={{width: "200px", height: "100px"}} accept=".png,.jpg,.jpeg" onChange={this.handleChange}/>
            </form>
        )
    }
}