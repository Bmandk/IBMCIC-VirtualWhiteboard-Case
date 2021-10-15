import { Component } from 'react';

export class Toolbar extends Component {
    state = {
        currentSelected: 0,
        tools: ["T", "I"]
    }

    clickTool = (event) => {
        this.setState({currentSelected: event.currentTarget.dataset.index});
    }

    render() {
        // Create tool components
        let c = this.state.tools.map((entry, index) => {
            return <p key={index} data-index={index} style={{textAlign: "center", backgroundColor: this.state.currentSelected === index ? "#0f0" : "#fff", padding: "10px 18px", margin: "0", fontSize: "25px"}} onClick={this.clickTool}>{entry}</p>
        })
        return (
            <div style={{position: 'absolute', right: "15px", top: "15px", border: "solid 1px"}}>
                {c}
            </div>
        )
    }
}