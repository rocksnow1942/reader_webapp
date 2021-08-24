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
    connect() {
        this.ws  = new WebSocket(this.webSocketAddr);        
        this.ws.onopen = (e)=>{this.openHandler && this.openHandler(e)}
        this.ws.onerror = (err) => {this.errorHandler && this.errorHandler(err)}
        this.ws.onclose = (evt) => {this.closeHandler && this.closeHandler(evt)}
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
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(msg))
        }
    }

    close () {
        this.ws.close()
    }

    reconnect () {
        this.close()
        this.connect()
    }

    get(msg,timeout=5000) {
        return new Promise((resolve, reject) => {
            const action = msg.action            
            this.send(msg);
            this.asyncHandler.push({action,resolve})
            setTimeout(() => {
                // remove handler from asyncHandler after timeout
                const idx = this.asyncHandler.map(i=>i.action).indexOf(action)
                if (idx !== -1) {
                    this.asyncHandler.splice(idx,1)
                }                
                reject(new Error(`Send ${msg}; Timeout: ${timeout}ms`))
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