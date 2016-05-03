class Pooptime extends React.Component{

    constructor(props){
      super(props);
      this.state = ({timer: false, seconds: 0, minutes: 0, hour: 0})
      this.tick = this.tick.bind(this);
      this.timerStart = this.timerStart.bind(this);
      this.timerStop = this.timerStop.bind(this);
      this.setWage = this.setWage.bind(this);
      this.getTimeCount = this.getTimeCount.bind(this);
      this.format_time = this.format_time.bind(this);
      this.savePoop = this.savePoop.bind(this);
    }

    componentWillMount(){
      $.ajax({
        url: '/grab_totals',
        type: 'GET',
        dataType: 'JSON'
      }).success(data => {
        console.log(data);
        this.setState({total_time: data.total_time, total_money: data.total_money})
      }).fail(data =>{
        console.log(data);
      });
    }

    savePoop(money, time){
      $.ajax({
        url: '/save_poop',
        type: 'GET',
        dataType: 'JSON',
        data: {pooped: {money_earned: money, time_wasted: time, user_id: this.props.current_user.id, wage: this.state.wage}}
      }).success(data => {
        console.log(data);
      }).fail(data =>{
        console.log(data);
      });
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
        this.getTimeCount();
    }

    timerStart(){
      if(this.state.wage){
        this.setState({start: Date.now(), timer: true});
        this.timer = setInterval(this.tick, 50);
      }else
        alert('Set wage before starting timer, ya dingus');
    }

    timerStop(){
      this.setState({timer: false, last_money: this.state.money_earned, last_time: this.state.elapsed});
      clearInterval(this.timer);
      if(this.props.current_user)
        this.savePoop(this.state.money_earned, this.state.elapsed);
    }

    setWage(event){
      this.setState({wage: event.target.value});
    }

    getTimeCount(){
      let elapsed = Math.round(this.state.elapsed / 100);
      let seconds = (elapsed / 10).toFixed(1);
      let seconds1 = Math.floor(seconds % 60);
      let minutes = Math.floor(seconds / 60);
      let minutes1 = Math.floor(minutes % 60);
      let hours = Math.floor(minutes / 60);
      let hours1 = Math.floor(hours % 60);
      this.setState({seconds: seconds1, minutes: minutes1, hour: hours1});
    }

    format_time(){
      let elapsed = Math.round(this.state.last_time / 100);
      let seconds = (elapsed / 10).toFixed(1);
      let seconds1 = Math.floor(seconds % 60);
      let minutes = Math.floor(seconds / 60);
      let minutes1 = Math.floor(minutes % 60);
      let hours = Math.floor(minutes / 60);
      let hours1 = Math.floor(hours % 60);
      return(`${hours1}h ${minutes1}m ${seconds1}s`)
    }

    render() {

        let button = (<button className="btn col s3 ss_button" onClick={this.timerStart}>Start</button>);
        let time = "0h 0m 0s";
        let money = "$0.00";
        if(this.state.timer){
          button = (<button className="btn col s3 ss_button" onClick={this.timerStop}>Stop</button>);
          time = `${this.state.hour}h ${this.state.minutes}m ${this.state.seconds}s`
          money = `$${this.state.money_earned}`
        }
        let last_money = this.state.last_money ? `$${this.state.last_money}` : "$0.00";
        let last_time = this.state.last_time ? `${this.format_time()}` : "0h 0m 0s";

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.

        return(<div className='row'>
                 <div className='row col s12 m3'>
                 test
                 </div>
                 <div className='row col s12 offset-m1 m4 pooper'>
                    {button}
                    <div className='row time_money_div col s8'>
                      <div className=''>{money}</div>
                      <div className=''>{time}</div>
                    </div>
                    <div className='row'>
                      <input className="hourlyWage col m6" placeholder="Hourly Wage" onKeyUp={this.setWage} />
                      <br />
                    </div>
                    <div className='row'>
                      <div className='chawp_font underline font35 col m6'>Last Use: </div>
                      <div className='col m3 chawp_font'>
                        {last_money}
                        <br />
                        {last_time}
                      </div>
                    </div>
                 </div>
                 <div className='col s12 offset-m1 m3'>
                 </div>
               </div>
             );

    }
}
