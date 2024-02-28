import mitt from 'mitt'

type ApplicationEvents = {
    'modalStatus': Boolean
};

const emitter = mitt<ApplicationEvents>()

const useEvent = emitter.emit
const useListen = emitter.on

export {useEvent, useListen}