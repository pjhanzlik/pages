import {ToggleSwitch, DisplayInput, AdjustButton, ResetButton, ZeroTimeLeftAudio, DisplayPeriod, DisplayTime} from "./containers.js";


function App() {
  return /*#__PURE__*/React.createElement(ReactBootstrap.Card, {
    bg: "info",
    text: "white",
    className: "text-center"
  }, /*#__PURE__*/React.createElement(ReactBootstrap.Card.Header, null, /*#__PURE__*/React.createElement(ReactBootstrap.Card.Title, null, "Pomodoro Clock"), /*#__PURE__*/React.createElement(ReactBootstrap.Form, null, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Group, null, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Label, {
    id: "break-label"
  }, "Break Length"), /*#__PURE__*/React.createElement(ReactBootstrap.InputGroup, null, /*#__PURE__*/React.createElement(ReactBootstrap.InputGroup.Prepend, null, /*#__PURE__*/React.createElement(AdjustButton, {
    id: "break-decrement",
    variant: "secondary",
    name: "Break",
    value: -1
  }, /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "Decrement Break Length Icon"
  }, "\uD83D\uDD3D"))), /*#__PURE__*/React.createElement(DisplayInput, {
    id: "break-length",
    readOnly: true,
    name: "Break",
    className: "text-center",
    type: "number",
    disabled: true
  }), /*#__PURE__*/React.createElement(ReactBootstrap.InputGroup.Append, null, /*#__PURE__*/React.createElement(AdjustButton, {
    id: "break-increment",
    variant: "secondary",
    name: "Break",
    value: 1
  }, /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "Increment Break Length Icon"
  }, "\uD83D\uDD3C"))))), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Group, null, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Label, {
    id: "session-label"
  }, "Session Length"), /*#__PURE__*/React.createElement(ReactBootstrap.InputGroup, null, /*#__PURE__*/React.createElement(ReactBootstrap.InputGroup.Prepend, null, /*#__PURE__*/React.createElement(AdjustButton, {
    id: "session-decrement",
    variant: "secondary",
    name: "Session",
    value: -1
  }, /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "Decrement Session Length Icon"
  }, "\uD83D\uDD3D"))), /*#__PURE__*/React.createElement(DisplayInput, {
    id: "session-length",
    name: "Session",
    readOnly: true,
    className: "text-center",
    type: "number",
    disabled: true
  }), /*#__PURE__*/React.createElement(ReactBootstrap.InputGroup.Append, null, /*#__PURE__*/React.createElement(AdjustButton, {
    id: "session-increment",
    variant: "secondary",
    name: "Session",
    value: 1
  }, /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "Increment Session Length Icon"
  }, "\uD83D\uDD3C"))))))), /*#__PURE__*/React.createElement(ReactBootstrap.Card.Body, null, /*#__PURE__*/React.createElement(DisplayPeriod, {
    id: "timer-label"
  }), /*#__PURE__*/React.createElement(ReactBootstrap.Alert, {
    variant: "info"
  }, /*#__PURE__*/React.createElement(DisplayTime, {
    id: "time-left"
  }), /*#__PURE__*/React.createElement(ZeroTimeLeftAudio, {
    id: "beep",
    src: "https://archive.org/download/JModelUndegraded/ModelJUndegraded.flac"
  })), /*#__PURE__*/React.createElement(ToggleSwitch, {
    variant: "primary",
    size: "lg",
    id: "start_stop"
  }, /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "Start and Stop Timer Icon"
  }, "\u23EF")), /*#__PURE__*/React.createElement(ResetButton, {
    size: "lg",
    id: "reset",
    variant: "danger"
  }, /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "Reset Timer Icon"
  }, "\uD83D\uDD04"))));
}

export default App;
