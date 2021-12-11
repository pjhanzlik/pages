class AutoPlayAudio extends React.PureComponent {
    constructor(props) {
        super(props);
        this.audio = React.createRef();
    }

    componentDidUpdate() {
        if(this.props.autoPlay) {
            this.audio.current.play();
        }
        // While it doesn't pass FCC tests, this
        // feature will play audio for only 1 sec
        // and stop if App is reset
        // else {
        //     this.audio.current.pause();
        //     this.audio.current.currentTime = 0;
        // }
    }

    render() {
        return React.createElement("audio", {ref: this.audio, ...this.props }, null);
    }
}

AutoPlayAudio.defaultProps = { preload: "auto" };

export default AutoPlayAudio;
