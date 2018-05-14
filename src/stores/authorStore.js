'use strict';

var Dispatcher = new require('./../dispatcher/appDispatcher');
var ActionTypes = new require('./../constants/actionTypes.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function (callback) {
        this.emit(CHANGE_EVENT);
    }
});