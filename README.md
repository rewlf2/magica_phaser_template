# Magica Phaser Template

This is a template for developing an online application, primary a game with several integrated features:
1. Text input by Phaser-input
1. Websocket by Socket.io
1. MySQL access by MySQL2
1. Sound Howler.js

This boilerplate is oriented for creating a multiplayer game, built upon the ES6-based boilerplate created by Goldfire studio.

The purpose of this repo is to be a starting point for creating a game. The idea is to copy the contents and then modify from there. Look at the usage below for instructions on how it all works.

## Features

* [MySQL2](https://github.com/sidorares/node-mysql2)
* [Socket.io](https://github.com/socketio/socket.io)
* [Phaser-input](https://github.com/orange-games/phaser-input)


Provided by [Phaser ES6 Boilerplate](https://github.com/goldfire/phaser-boilerplate):
* [Phaser-CE](https://github.com/photonstorm/phaser-ce) through npm (automatic custom build).
* Boilerplate written in ES6 class structure.
* Heavily commented and stripped down for most minimal build.
* [Webpack](https://webpack.js.org/) + [Bublé](https://buble.surge.sh/guide/) + [PostCSS](http://postcss.org/).
* [BrowserSync](https://browsersync.io/) for livereload during development.
* [Stats.js](https://github.com/mrdoob/stats.js/) for displaying FPS/MS.
* [phaser-manifest-loader](https://github.com/mattcolman/phaser-manifest-loader) for easy asset loading.
* Separate builds for production and development.
* [Howler.js](https://github.com/goldfire/howler.js/)

## Usage

Clone the git repo.

`git@github.com:rewlf2/magica_phaser_template.git`

Install the dependencies.

`npm i`

Start the web server-side server.

`npm start`

Start the development web client-side provider, you need 2 node.js command line window to run server and provided simultaneously.

`npm run dev`

Access your project in the browser.

`locahost:7777`

The server-side is served at localhost:7788. Client should connect to port 7788 to interact with server, or you may change the configuration in server.js and related client-side script to chanag it.

Check function getMysqlCon() in server.js for configuration on connection to MySQL database.
