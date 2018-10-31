# Sawk  [![Build Status](https://travis-ci.org/ryhinchey/sawk.svg?branch=master)](https://travis-ci.org/ryhinchey/sawk)
> A tiny and resilient websocket client for the browser

## Installation
```sh
npm install sawk --save
```


## Usage example

Sawk provides basic utilities wrapped around the native WebSocket interface. If messages are sent before the connection is open, Sawk will queue those messages to be sent on the `open` event.  Sawk also provides a `reconnect` function which when combined with the `onClose` handler, allows you to reconnect a closed connection.

```javascript
import sawk from 'sawk';

const socket = new Sawk('wss://echo.websocket.org/')

socket.onMessage = (event) => {
};

socket.onError = (event) => {
};

socket.onClose = (event) => {
  socket.reconnect();
}

socket.send('a message');

```


## Development setup

```sh
npm install
npm test
npm build
```


## Meta

Ryan Hinchey – [@ryhinchey](https://twitter.com/ryhinchey) 

Distributed under the MIT license. See ``LICENSE.txt`` for more information.

[https://github.com/ryhinchey/sawk](https://github.com/ryinchey/sawk)


## Contributing

1. Fork it (<https://github.com/rhinchey/sawk/fork>)
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add a new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a new Pull Request
