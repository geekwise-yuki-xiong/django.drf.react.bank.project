import React, { Component } from 'react';

export class Home extends Component {

    divStyle={
        // background: 'white',
        padding: '30px',
        color: 'white'
    }

    tbdbox={
        background: 'white',
        width: '530px',
        hight: '100px',
        borderRadius: '10%'
    }
    
    render() {
    return (
        <div className="row-container" style={this.divStyle}>
        <div className="col-md-12">
        <div className="dark-background">
            <h1 className="headline-1 text-center mx-auto">Credit CRM</h1>
            <h2 className="text-center">The Most Convenient Credit Union Management Tool</h2>
            <div className="mx-auto" style={this.tbdbox}>
                <img src={require('./tbd(2).png')} alt="tbd"/>
            </div>
        </div>
        </div>
        </div>
    )  
    };
}

export default Home;