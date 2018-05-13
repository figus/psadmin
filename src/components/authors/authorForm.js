'use strict';

var React = require('react');

var Input = require('./../common/textInput');

var AuthorForm = React.createClass({
    render: function () {
        return (
            <form action="">
                <h1>ManageAuthor</h1>
                <Input name="firstName"
                    label="First Name"
                    value={this.props.author.firstName}
                    onChange={this.props.onChange} />
                <Input name="lastName"
                    label="Last Name"
                    value={this.props.author.lastName}
                    onChange={this.props.onChange} />
                <input type="submit"
                    value="Save"
                    className="btn btn-default"
                    onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = AuthorForm;