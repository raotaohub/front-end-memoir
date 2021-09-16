const EventEmitter = require('../index')

let Event = new EventEmitter()

/** on **/
Event.on('on', (a, b, c) => {
    console.log('on', a, b, c)
})


Event.emit('on', 1, 2, 3)

/** once **/
const onceCb = (a, b, c) => {
    console.log('once', a, b, c)
}

Event.once('once', onceCb)

Event.emit('once', ...['a', 'b', 'c'])

Event.emit('once', ...['e', 'f', 'g'])

Event.emit('once', ...['H', 'I', 'J'])

/** remove **/
const remove = (args) => {
    console.log('remove', ...args)
}

Event.on('remove', remove)

Event.emit('remove', ...['remove1'])

Event.emit('remove', ...['remove2'])

Event.remove('remove', remove)

Event.emit('remove', ...['remove3'])

Event.emit('remove', ...['remove4'])

/** removeAll() **/

Event.on('remove', remove)

Event.emit('remove', ...['remove5'])
Event.removeAll()

Event.emit('remove', ...['remove6'])

/** getListeners() **/
console.log(Event.getListeners())
