# Cards Against Humanity Online

## Description

This is a project to try and create a sleek and sexy HTML5-based online version of the popular card game.

## Relevant technologies and software packages

* Node.js
* Mongodb
* Socket.io
* Mongoose
* ZURB Foundation
* SASS/Compass
* JSHint, JSLint
* ExpressJS
* Jade

## Frequently asked questions

None so far. Send inquiries via http://jacopotarantino.com/contact/ or open an issue.


## Planned features

* App-ify the server so normals can spin up a local instance and get playing.

## OLD Todo

* Flood control (something like you can only submit 1 message every 5 seconds)
* Link to logout (delete PHP session)
* Allow some HTML, but still strip out javascript. Possibly a few buttons for HTML (WYSIWYG?)
* Allow registration, for being able to have a certain username permanently (and all the stuff that goes with that, like "lost password")
* Protection against non-existent chat room names e.g. /Chat2/room/?name=LOL
* Support for all special characters (UTF-8)
* Private messages (@) (only the person who matches that username will see it)
* Kick people out / ban people by IP (only as an admin user, or perhaps just a blacklist of IPs)
* More emoticons
* Have an actual submit button (for mobile devices that support JavaScript but don't have regular key events)
* Automatic filtering of bad words
* Utilize an outside login system, like Twitter oAuth, Google Login, or Facebook Connect
* Usernames as emails, then use Gravatars
* Links with 4-letter extensions don't work (e.g. .info)
* Long polling, instead of requesting every few seconds


## Licensing

Copyright (c) 2013 Jacopo Tarantino, http://jacopotarantino.com

Cards Against Humanity Online is released under a Creative Commons Attribution, Non-commercial, Share-alike license. You are free to use and manipulate this code but it must in some prominent location credit Jacopo Tarantino and cannot be sold or used for any commercial purpose.

## Contributing

This project is developed by a great team. Please contribute to this project. The people who made Cards Against Humanity are awesome and open sourced their game(mostly). The least we can do is give a tiny bit back to them(and us by proxy. because let's face it: we wouldn't do this if the game weren't so damn fun.).