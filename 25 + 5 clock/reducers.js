import {
    SET_ID,
    TICK,
    RESET,
    ADJUST
} from './actions.js';

const INIT = {
    'Session': 25,
    'Break': 5,
    'periods': [
        'Session',
        'Break'
    ],
    'id': undefined,
    'time': 0
};

function rootReducer(state = INIT, action) {
    switch (action.type) {
        case ADJUST: {
            let adjusted = state[action.name] + action.value;
            if (1 > adjusted) {
                adjusted = 1;
            }
            else if (60 < adjusted
            ) {
                adjusted = 60;
            }
            return {
                ...state,
                [action.name]: adjusted
            }
        }
        case SET_ID:
            return {...state, 'id': action.id}
        case TICK:
            const PERIOD = state.periods[0];
            const TICKED_TIME = state.time + 1;
            if(state[PERIOD] * 60 >= TICKED_TIME) {
                return {...state, 'time': TICKED_TIME}
            }
            else {
                return {
                    ...state,
                    'time': 0,
                    'periods': state.periods.slice(1).concat(state.periods[0])
                }
            }
        case RESET:
            return { ...INIT, 'audio': state.audio };
        default:
            return state;
    }
}

export default rootReducer;
