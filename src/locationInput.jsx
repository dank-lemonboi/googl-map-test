import React, {Component} from 'react'

export default class Input extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            lat: '',
            lng: ''
        }
    }

    render() {
        return (
            <div className='custom-marker-maker'>
                <span>Name</span>
                <input
                    type="text"
                    onChange={(e) => this.setState({ name: e.target.value })}
                    value={this.state.name}
                />
                <span>Lat.</span>
                <input
                    type="text"
                    onChange={(e) => this.setState({ lat: e.target.value })}
                    value={this.state.lat}
                />
                <span>Lng.</span>
                <input
                    type="text"
                    onChange={(e) => this.setState({ lng: e.target.value })}
                    value={this.state.lng}
                />
                <button onClick={this.newLocation}>Submit</button>
            </div>
        )
    }
}