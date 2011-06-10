# jshint-runner

    A packaging of JSHint (http://jshint.com) that provides a command-line tool to run JSHint on your JS.

## Installation

    $ npm install -g jshint-runner

## Use

    Once installed, run jshint on any JS file with:

    $ jshint thing.js

## Configuration

    Configure jshint-runner by using a jshintrc file.

    Put it in ~/.jshintrc, or for global settings in /(node install prefix)/etc/jshintrc.

    The file is a JSON object that can be passed to JSHINT as its options.

    See http://jshint.com for such options.

## Node compatibility

    This should work with any version of Node supported by jshint. (http://jshint.com)
