// This project is partly inspired by and includes quotes from this wonderful pen! https://codepen.io/SourApple/pen/BoXjpZ
const endpoint = 'https://gist.githubusercontent.com/dmullen17/6bdadb84e894e5e695fb301613bb7bd1/raw/b0a7fa04fc71259c24e137c9d2af2fec11c47c64/Harry%2520Potter%2520Quotes'; 

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <body id='app'>
        <QuoteBox />
      </body>
    );
  }
}; 

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      quotes: [],
      quote: 'Ah music, a magic beyond all those we teach here',
      speaker: 'Albus Dumbledore'
    };
    this.logState = this.logState.bind(this);
    this.newQuote = this.newQuote.bind(this);
  }
  componentDidMount() {
    fetch(endpoint)
      .then(blob => blob.json())
      .then((data) => {
      //console.log(data["quotes"]);
      this.setState({
        isLoaded: true,
        quotes: data["quotes"]
      });
    });
  }
  logState() {
    console.log(this.state);
  }
  newQuote() {
    const index = Math.floor(Math.random()*this.state.quotes.length);
    this.setState({
      quote: this.state.quotes[index].quote,
      speaker: this.state.quotes[index].speaker
    });
    //console.log(this.state);
  }
  render() {
    return (
      <div id='quote-box' onClick={this.newQuote}>
        <Text quote={this.state.quote}/>
        <Speaker speaker={this.state.speaker} />
        <RowOfButtons />
      </div>
    );
  }
};

// Define React stateless component using ES6 syntax 
const Text = (props) => {
  return (
    <div id='text'>
      {props.quote}
    </div>
  );
};

// container element for three buttons
const RowOfButtons = () => {
  return (
    <div>
      <NewQuoteButton />
    </div>
  );
};

const NewQuoteButton = () => {
  return (
    <button id='new-quote'>New Quote</button>
  );
}

// Define React stateless component using vanilla JS syntax 
const Speaker = function(props) {
  return (<div id='author'>- {props.speaker}</div>);
}



ReactDOM.render(<App />, document.getElementById('app'));

