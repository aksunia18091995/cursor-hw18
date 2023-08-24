import './App.css';
import Timer from './Components/Timer';
import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          minutes: 0,
          seconds: 0,
          step: 1,
          time: 0,
        };
    }

    handleTimeChange = (value, inputType) => {
        const newValue = value >= 0 ? value : 0;
      this.setState(
        prevState => ({
          [inputType]: newValue,
          totalTime: this.calculateTotalTime(newValue, inputType, prevState)
        }),
        () => this.onTimeChange(this.state.totalTime)
      );
    };
  
    calculateTotalTime = (value, inputType, prevState) => {
      const { minutes, seconds } = this.state;
      
      if (inputType === "minutes") {
          return value * 60 + seconds;
      } else if (inputType === "seconds") {
          return minutes * 60 + value;
      }
  
      return minutes * 60 + seconds;
    };

    handleStepChange = value => {
        const newStep = value >= 1 ? value : 1;
        this.setState({
            step: newStep
        });
    };
  
    formatNumber = num => {
        return num < 10 ? `0${num}` : num;
    };
  
    onTimeChange = (newTime) => {
      console.log(`Час таймеру змінено: ${newTime}`);
    };

    render() {
        return (
            <div className="app">
                <h1>Таймер</h1>
                <div className="timePicker">
                  <div>
                    <label className="label">Хвилини (хв)</label>
                    <input
                      className="input"
                      value={this.state.minutes}
                      onChange={e => this.handleTimeChange(parseInt(e.target.value), 'minutes')}
                      type="number"
                      min="0"
                    />
                    :
                    <label className="label">Секунди (с)</label>
                    <input
                      className="input"
                      value={this.state.seconds}
                      onChange={e => this.handleTimeChange(parseInt(e.target.value), 'seconds')}
                      type="number"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="label">Інтервал (с)</label>
                    <input
                      className="input"
                      value={this.state.step}
                      onChange={e => this.handleStepChange(e.target.value)}
                      type="number"
                      min="1"
                    />
                  </div>
                </div>
                <Timer
                    autostart={false}
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                    step={this.state.step}
                    onTick={time => console.log(`Залишилось часу: ${time}`)}
                    onTimeEnd={() => console.log("Час вийшов!")}
                    onTimeStart={() => console.log("Таймер запущено!")}
                    onTimePause={() => console.log("Таймер на паузі!")}
                    onTimeChange={this.onTimeChange}
                />
            </div>
        );
    }
}

export default App;
