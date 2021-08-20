
class MyWebSocket {
    /**
     * Websocket class to handle connection to reader
     * @param {function} wsOnOpen 
     * @param {function} wsOnClose 
     * @param {function} wsOnError 
     * @param {function} wsOnMessage 
     */
    constructor (wsOnOpen, wsOnClose, wsOnError, wsOnMessage) {        
        this.webSocketAddr = process.env.REACT_APP_WEBSOCKET_ADDRESS || `ws://${window.location.hostname}:8765`        
        this.ws = null
        this.openHandler = wsOnOpen
        this.msgHandlers = wsOnMessage 
        this.closeHandler = wsOnClose
        this.errorHandler = wsOnError
        
    }
    connect() {
        this.ws  = new WebSocket(this.webSocketAddr);        
        this.ws.onopen = (e)=>{this.openHandler && this.openHandler(e)}
        this.ws.onerror = (err) => {this.errorHandler && this.errorHandler(err)}
        this.ws.onclose = (evt) => {this.closeHandler && this.closeHandler(evt)}
        this.ws.onmessage = (msg) => {
            let data,action;
            try {
                const packet = JSON.parse(msg.data)
                data = packet.data
                action = packet.action
            } catch (err) {
                return this.errorHandler && this.errorHandler(err)
            }
            this.msgHandlers.forEach((handler) => {
                handler(data, action)
            })
        }
    }

    send(msg) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(msg))
        }
    }

    attachMessageHandler(handler) {
        this.msgHandlers.push(handler)
    }

    close () {
        this.ws.close()
    }

    reconnect () {
        this.close()
        this.connect()
    }


}

export default MyWebSocket