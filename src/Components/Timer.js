import React, { Component } from 'react';
import styles from './Timer.module.css'

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.minutes * 60 + this.props.seconds,
            pause: !this.props.autostart,
        };
        this.timerId = null;
    }

    componentDidMount() {
        if (this.props.autostart) {
            this.startTimer();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.pauseTimer();
            const totalTimeInSeconds = this.props.minutes * 60 + this.props.seconds;
            console.log("Total Time in Seconds:", totalTimeInSeconds);
            this.setState({
                time: totalTimeInSeconds,
            });
        }
    }

    componentWillUnmount() {
        this.pauseTimer();
    }

    startTimer = () => {
        this.props.onTimeStart();
        this.setState({ pause: false });
        this.timerId = setInterval(this.tick, this.props.step * 1000);
    };

    pauseTimer = () => {
        this.props.onTimePause();
        clearInterval(this.timerId);
        this.setState({ pause: true });
    };

    toggleTimer = () => {
        if (this.state.pause) {
            this.startTimer();
        } else {
            this.pauseTimer();
        }
    };

    tick = () => {
        const newTime = this.state.time - this.props.step;

        if (newTime <= 0) {
            this.pauseTimer();
            this.props.onTimeEnd();
            this.setState({ time: 0 });
        } else {
            this.setState({ time: newTime });
            this.props.onTick(this.formatTime(newTime));
        }
    };

    formatTime = timeInSeconds => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    render() {
        const { time } = this.state;
        const progressBarWidth = (time / (this.props.minutes * 60 + this.props.seconds)) * 100;

        return (
            <div className={styles.timer}>
                <div className={styles.time}>{this.formatTime(time)}</div>
                <div className={styles.timerBarContainer}>
                    <div className={styles.timerBar} style={{ width: `${progressBarWidth}%` }}></div>
                </div>
                <button className={styles.button} onClick={this.toggleTimer}>
                    {this.state.pause ? 'Старт' : 'Пауза'}
                </button>
            </div>
        );
    }
}

export default Timer;
