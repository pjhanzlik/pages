import { adjust, reset, setId, tick } from './actions.js';
import AutoPlayAudio from './AutoPlayAudio.js';

export const AdjustButton = ReactRedux.connect(null, (dispatch, ownProps) => {
    return {
        onClick: () => dispatch(adjust(
            ownProps.name,
            ownProps.value
        ))
    };
})(ReactBootstrap.Button);

export const DisplayInput = ReactRedux.connect((state, ownProps) => {
    return { value: state[ownProps.name] };
}, {})(ReactBootstrap.FormControl);

export const DisplayPeriod = ReactRedux.connect((state, ownProps) => {
    const PERIOD = state.periods[0]
    return { children: PERIOD };
}, {})(ReactBootstrap.Card.Title);

export const DisplayTime = ReactRedux.connect((state, ownProps) => {
    if(state.periods.length <= 0) {
        return { children: '00:00' };
    }
    else {
        const SECONDS_LEFT = state[state.periods[0]] * 60 - state.time;
        const MINUTES = `${
            Math.floor(SECONDS_LEFT / 60)
        }`.padStart(2, '0');
        const SECONDS = `${
            Math.floor(SECONDS_LEFT % 60)
        }`.padStart(2, '0');
        return { children: `${MINUTES}:${SECONDS}` };
    }
}, null)(ReactBootstrap.Alert.Heading);

export const ResetButton = ReactRedux.connect(({ id }) => {
    return { 'value': id };
}, (dispatch) => {
    return {
        reset: () => dispatch(reset())
    };
}, ({ value }, { reset }, ownProps) => {
    return {
        ...ownProps,
        onClick: () => {
            // The cheaters way out...
            // see AutoPlayAudio.jsx for better method
            const BEEP = document.getElementById("beep");
            BEEP.pause()
            BEEP.currentTime = 0;
            reset(clearInterval(value));
        }
    }
})(ReactBootstrap.Button);

export const ToggleSwitch = ReactRedux.connect(({ id }) => {
    return {
        'active': id !== undefined,
        'aria-pressed': id !== undefined,
        'value': id
    };
}, (dispatch) => {
    return {
        setId: (id) => dispatch(setId(id)),
        tick: () => dispatch(tick())
    };
}, ({value, ...state}, {setId, tick}, ownProps) => {
    return {
        ...state,
        ...ownProps,
        onClick: value ?
            () => setId(clearInterval(value)) :
            () => setId(setInterval(tick, 1000))
    }
})(ReactBootstrap.Button);

export const ZeroTimeLeftAudio = ReactRedux.connect(({periods, time, ...state}) => {
    return {
        autoPlay: state[periods[0]] * 60 - time === 0
    }
})(AutoPlayAudio);
