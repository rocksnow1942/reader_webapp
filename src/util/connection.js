import {wsMessageHandler,wsOnOpen,wsOnError,wsOnClose} from '../redux/actions/dataActions'


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
        this.msgHandler = wsOnMessage 
        this.closeHandler = wsOnClose
        this.errorHandler = wsOnError
        this.asyncHandler = []
        
    }
    isConnected() {
        return this.ws && this.ws.readyState === WebSocket.OPEN
    }
    connect() {
        
        if (this.isConnected()) {            
            return}
        this.ws  = new WebSocket(this.webSocketAddr);        
        this.ws.onopen = (e)=>{this.openHandler && this.openHandler(e)}
        this.ws.onerror = (err) => {this.errorHandler && this.errorHandler(err)}
        this.ws.onclose = (evt) => {            
            this.ws = null;
            this.closeHandler && this.closeHandler(evt)
        }
        this.ws.onmessage = (msg) => {            
            const parsedMsg = this.parseMsg(msg)
            if (parsedMsg) {                
                if (this.asyncHandler.length) {                    
                    let idx = this.asyncHandler.map(i=>i.action).indexOf(parsedMsg.action)
                    if (idx === -1) {
                        this.msgHandler(parsedMsg.data,parsedMsg.action)    
                    } else {
                        this.asyncHandler[idx].resolve(parsedMsg.data)
                        this.asyncHandler.splice(idx,1)
                    }
                } else {
                    this.msgHandler(parsedMsg.data,parsedMsg.action)
                }                
            }
        }
    }

    parseMsg (msg) {
        let data,action;
            try {
                const packet = JSON.parse(msg.data)
                data = packet.data
                action = packet.action
                return {data,action}
            } catch (err) {
                this.errorHandler && this.errorHandler(err)
                return null
            }
    }

    send(msg) {
        if (this.isConnected()) {
            this.ws.send(JSON.stringify(msg))
        }
    }

    close () {        
        if (this.ws) {this.ws.close()}
    }

    reconnect () {
        this.close()
        this.connect()
    }

    /**
     * send a json message, resolve with the 'data' field of the response
     * @param {objct} msg the json message to send
     * @param {number} timeout timeout for this get method
     * @returns Promise resolve to the data in response. or throw
     */
    get(msg,timeout=5000) {
        return new Promise((resolve, reject) => {
            const action = msg.action
            const timeStamp = new Date().toISOString()
            this.asyncHandler.push({action,resolve,timeStamp})
            this.send(msg);            
            setTimeout(() => {                
                // remove handler from asyncHandler after timeout
                const idx = this.asyncHandler.map(i=>i.timeStamp).indexOf(timeStamp)
                if (idx !== -1) {
                    this.asyncHandler.splice(idx,1)
                    reject(new Error(`Send ${JSON.stringify(msg)}; Timeout: ${timeout}ms`))
                }                
            }, timeout)
        })
    }

}




const websocket = new MyWebSocket(
    wsOnOpen,    
    wsOnClose, 
    wsOnError,
    wsMessageHandler,    
)


export default websocket