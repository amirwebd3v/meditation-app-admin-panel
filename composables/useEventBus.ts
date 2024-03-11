import mitt from 'mitt'



const emitter = mitt()

const useEvent = emitter.emit
const useListen = emitter.on

export {useEvent, useListen}