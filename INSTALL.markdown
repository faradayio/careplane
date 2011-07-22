# Preparation

## Node.js

Install node.js: https://github.com/joyent/node/wiki/Installation

Install npm: `curl http://npmjs.org/install.sh | sh`

## Safari build tools

Get latest documents1 repo, either put it in ~/documents1 or make a link to it at ~/documents1.

Install a patched version of xar, which is included in the careplane repo:
    tar -zxvf xar_232v3_src.tar.gz
    cd xar_232v3
    ./configure
    make
    sudo make install
    rm -f /usr/bin/xar

Note: the new xar is installed in /usr/local/bin/xar

## Cucumber system dependencies

The cucumber tests require Qt and WebKit. See instructions here: https://github.com/thoughtbot/capybara-webkit

## Development gems

`bundle install`

# Package plugins

`rake package`

