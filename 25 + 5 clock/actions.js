export const SET_ID = 'SET_ID';
export const TICK = 'TICK';
export const RESET = 'RESET';
export const ADJUST = 'ADJUST';

export function setId(id) {
    return { 'type': SET_ID, id };
}
export function tick() {
    return { 'type': TICK };
}
export function reset() {
    return { 'type': RESET };
}
export function adjust(name, value) {
    return {
        'type': ADJUST,
        name,
        value
    };
}
