This timer is made as coursework for freeCodeCamp's Front End Libraries
Developer Certification. In addition to fulfilling
[required user stories](https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-pomodoro-clock),
I wanted to emulate the
[example freeCodeCamp web page](https://codepen.io/freeCodeCamp/full/XpKrrW)
layout using only [Bootstrap](https://getbootstrap.com/) styling.

The most useful code snippet in this project illustrates how to use
[React Redux](https://react-redux.js.org/) as async middleware.  Traditional
[Redux Thunk](https://github.com/reduxjs/redux-thunk) could manage clearing
and setting async timer intervals in
[actions.js](https://gitlab.com/pjhanzlik/pomodoro-clock/blob/master/src/actions.js),
but I decided to build it into the
[ToggleSwitch.js](https://gitlab.com/pjhanzlik/pomodoro-clock/blob/master/src/containers/ToggleSwitch.js)
component via the
[connect merge props argument](https://react-redux.js.org/7.0/api/connect#mergeprops-stateprops-dispatchprops-ownprops-object).
This fundamentally reduces boilerplate at the cost of component extensibility.
In this case, the code snippet can easily
be replaced using
[React's useReducer hook](https://reactjs.org/docs/hooks-reference.html#usereducer),
but I still like the snippet as an example of how to integrate top-level Redux
actions within hierarchy agnostic React components.

This site has been manually tested to render nicely on mobile and desktop
[WebKit](https://webkit.org/), [Blink](https://www.chromium.org/blink), and
[Servo](https://servo.org/) powered browsers, but your milage may vary.
If you do spot a rendering problem, please
[create a new Issue](https://gitlab.com/pjhanzlik/javascript-calculator/issues)
with a screenshot of the problem and a description of your hardware.
