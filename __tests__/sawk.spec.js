import { WebSocket } from 'mock-socket';
import Sawk from '../src/index.js';

jest.restoreAllMocks = true;

window.WebSocket = WebSocket;

const url = 'wss://testsocket.com';

describe('initialization', () => {
  it('will initialize with a url', () => {
    const sawk = new Sawk(url);
    expect(sawk.url).toBe('wss://testsocket.com');
  });

  it('will initialize with an empty message queue', () => {
    const sawk = new Sawk(url);
    expect(sawk.messageQueue.length).toBe(0);
  });

  it('will call getSocket', () => {
    const getSocketSpy = jest.spyOn(Sawk.prototype, 'getSocket');
    expect(getSocketSpy).toHaveBeenCalledTimes(0);
    const sawk = new Sawk(url);
    expect(getSocketSpy).toHaveBeenCalledTimes(1);
    expect(getSocketSpy).toHaveBeenCalledWith(url);
  });

  it('will call connect', () => {
    const getSocketSpy = jest.spyOn(Sawk.prototype, 'connect');
    expect(getSocketSpy).toHaveBeenCalledTimes(0);
    const sawk = new Sawk(url);
    expect(getSocketSpy).toHaveBeenCalledTimes(1);
  });

  it('will return an instance of the Sawk class', () => {
    const sawk = new Sawk(url);
    expect(sawk.connection).toBeInstanceOf(WebSocket);
  });
});

describe('send', () => {
  it('will send messages after the socket is open', () => {
    const sawk = new Sawk(url);
    const sendSpy = jest.spyOn(sawk.connection, 'send');
    expect(sawk.messageQueue.length).toBe(0);
    sawk.connection.readyState = 1;
    sawk.send('hi after open');
    expect(sawk.messageQueue.length).toBe(0);
    expect(sendSpy).toHaveBeenCalledTimes(1);
  });

  it('will stringify a message that is an object', () => {
    const sawk = new Sawk(url);
    sawk.connection.readyState = 1;
    const sendSpy = jest.spyOn(sawk.connection, 'send');
    sendSpy.mockReset();
    sawk.send({message: 'hi from an object'});
    expect(sendSpy).toHaveBeenNthCalledWith(1, JSON.stringify({message: 'hi from an object'}))
  })
});