'use strict';

var React = require('react');

var Input = require('./../common/textInput');

var AuthorForm = React.createClass({
    render: function () {
        return (
            <form action="">
                <h1>ManageAuthor</h1>
                <label htmlFor="firstName">First Name</label>
                <input type="text"
                       name="firstName"
                       className="form-control"
                       placeholder="First Name"
                       ref="firstName"
                       value={this.props.author.firstName}
                       onChange={this.props.onChange}/>
                <br/>
                <label htmlFor="lastName">Label Name</label>
                <input type="text"
                       name="lastName"
                       className="form-control"
                       placeholder="Last Name"
                       ref="lastName"
                       value={this.props.author.lastName}
                       onChange={this.props.onChange}/>
                <br/>
                <input type="submit" value="Save" className="btn btn-default"/>
            </form>
        );
    }
});

module.exports = AuthorForm;