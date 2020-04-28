function WS(url, onopen, onmessage, onclose, onerror) {
    let ws = null
    this.url = url
    this.onopen = onopen || onWsOpen
    this.onmessage = onmessage || onWsmessage
    this.onclose = onclose|| onWsclose
    this.onerror = onerror || onWserror
    if(!this.url){
        console.error('webSocket url is not defined!')
        return 
    }
    if(!window.WebSocket) {
        console.error('当前浏览器不支持WebSocket!')
        return
    }
    function init() {
        ws = new WebSocket(url)
        ws.onopen  = this.onopen
        ws.onmessage = this.onmessage
        ws.onclose = this.onclose
        ws.onerror = this.onerror
    }

    function onWsOpen(e){
        console.log('Connection open ...')
        // ws.send('Hello WebSockets Server!')
    }

    function onWsmessage(e) {
        if(typeof e.data === String) {
            console.log('Received data string')
        }
    }

    function onWsclose(e) {
        console.log('Connection closed.')
    }

    function onWserror(e) {
        console.error(e, 'onWserror')
    }

    this.prototype.init = init
}

export default WS