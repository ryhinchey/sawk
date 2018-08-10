# Sawk 
> A tiny and resilient websocket client for the browser



## Installation
```sh
npm install sawk --save
```


## Usage example

Sawk provides basic utilities wrapped around the native WebSocket interface. If messages are sent before the connection is open, Sawk will queue those messages to be sent on the `open` event.  Sawk also provides a `reconnect` function which when combined with the `onClose` handler, allows you to reconnect a closed connection.

```javascript
const socket = new Sawk('wss://echo.websocket.org/', true)

socket.onMessage = (message) => {
  console.log('onMessage', message);
};

socket.onError = (data) => {
  console.error(data);
};

socket.onClose = () => {
  socket.reconnect();
}
socket.send('hi');
socket.send('wow');
socket.send('cool');


setTimeout(() => {
  socket.close();
  socket.send('after close');
  socket.send('after close again');
}, 1000)

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
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request