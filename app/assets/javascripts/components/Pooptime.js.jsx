class Pooptime extends React.Component{

    constructor(props){
      super(props);
      this.state = {elapsed: 0, wage: 0, money_earned: 0, timer: false};
      this.tick = this.tick.bind(this);
      this.timerStart = this.timerStart.bind(this);
      this.timerStop = this.timerStop.bind(this);
      this.setWage = this.setWage.bind(this);
    }

    componentWillUnmount(){

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        clearInterval(this.timer);
    }

    tick(){

        // This function is called every 50 ms. It updates the
        // elapsed counter. Calling setState causes the component to be re-rendered
        this.setState({elapsed: Date.now() - this.state.start, money_earned: (((Number.parseFloat(this.state.wage) / 3600) * this.state.elapsed) / 1000).toFixed(2)});

    }

    timerStart(){
      this.setState({start: Date.now(), timer: true});
      this.timer = setInterval(this.tick, 50);
    }

    timerStop(){
      clearInterval(this.timer);
      this.setState({timer: false, last_money: this.state.money_earned, last_time: this.state.elapsed});
    }

    setWage(event){
      this.setState({wage: event.target.value});
    }

    render() {

        let elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        let seconds = (elapsed / 10).toFixed(1);
        let button = (<button onClick={this.timerStart}>Start Timer</button>);
        if(this.state.timer){
          button = (<button onClick={this.timerStop}>Stop Timer</button>);
        }

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.

        return(<div>
                 <div className='row'>
                  <div className='col m2'>
                    What is your Hourly Wage?
                    <div className='row'>
                      <input className="hourlyWage col m6" onKeyUp={this.setWage} />
                      <br />
                      <div className='right-align'>
                        {button}
                      </div>
                    </div>
                  </div>
                  <div className='col m2'>
                    Time Wasted: <b>{seconds} seconds</b>.
                  </div>
                  <div className='col m2'>
                    Money Earned: <b>${this.state.money_earned}</b>
                  </div>
                 </div>
                 <div className='row'>
                  <div className='col m6'>
                    <hr />
                    <h3>Last Use</h3>
                    <h6>Money Made: {this.state.last_money}</h6>
                    <h6>Time Wasted: {this.state.last_time} </h6>
                  </div>
                 </div>
               </div>
             );

    }
}
