class Sawk {
	constructor(url) {
		this.url = url;
		this.messageQueue = [];
		this.connection = this.getSocket(this.url);
		this.connect();
		return this;
	}

	connect() {
		this.connection.onopen = () => {
			this.connection.onclose = (e) => this.onClose && this.onClose(e);
			this.connection.onmessage = (e) => this.onMessage && this.onMessage(e);
			this.connection.onerror = (e) => this.onError && this.onError(e);
			this.connection.onopen = this.onOpen();
		}
	}
	
	onOpen() {
		while(this.messageQueue.length) {
			this.send(this.messageQueue.shift());
		}
	}

	reconnect() {
		this.connection = this.getSocket(this.url);
		this.connect();
	}

	getSocket(url) {
		return new WebSocket(url);
	}

	close() {
		this.connection.close();
	}

	send(message) {
		if (typeof message === 'object') {
			message = JSON.stringify(message);
		}

		if (this.connection.readyState !== 1) {
			this.messageQueue.push(message);
			return;
		}

		this.connection.send(message);
	}
}

export default Sawk;
