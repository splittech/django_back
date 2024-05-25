import React, { Component } from 'react'

export default class Input extends Component {
    render() {
        return (
            <>
                {this.props.required ?
                    <input
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        className={`input ${this.props.className}`}
                        onChange={this.props.onChange}
                        pattern={this.props.pattern}
                        required
                    />
                    :
                    <input
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        className={`input ${this.props.className}`}
                        onChange={this.props.onChange}
                        pattern={this.props.pattern}
                    />
                }
            </>

        )
    }
}
