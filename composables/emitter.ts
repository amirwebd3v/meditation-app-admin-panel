// import mitt from 'mitt'
//
// type ApplicationEvents = {
//     'updateSearch': String
// };
//
// const emitter = mitt<ApplicationEvents>()
//
// export const useEvent = emitter.emit
// export const useListen = emitter.on



import mitt from 'mitt'

type ApplicationEvents = {
    updateSearch: string
}

const emitter = mitt<ApplicationEvents>();

export const useEvent = emitter.emit
export const useListen = emitter.on