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
      this.setState({timer: false});
    }

    setWage(event){
      this.setState({wage: event.target.value});
    }

    render() {

        let elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        let seconds = (elapsed / 10).toFixed(1);
        let button = (<button onClick={this.timerStart}>Start</button>);
        if(this.state.timer){
          button = (<button onClick={this.timerStop}>Stop</button>);
        }

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.

        return(<div>
                <p>
                  What is your Hourly Wage?
                  <div className='row'>
                    <div className='col s4'>
                      <input className="hourlyWage col s2" onKeyUp={this.setWage} />
                    </div>
                  </div>
                </p>
                <p>This example was started <b>{seconds} seconds</b> ago.</p>
                <p>${this.state.money_earned}</p>
                {button}
               </div>);
    }
}
