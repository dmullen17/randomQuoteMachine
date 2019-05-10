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
      author: 'Albus Dumbledore'
    };
  }
  componentDidMount() {
    fetch(endpoint)
      .then(blob => blob.json())
      .then((data) => {
      console.log(data["quotes"]);
      this.setState({
        isLoaded: true,
        quotes: data["quotes"]
      });
    });
    console.log(this.state);
  }
  render() {
    return (
      <div id='quote-box'>
        <Text quote={this.state.quote}/>
        <Author author={this.state.author} />
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
const Author = function(props) {
  return (<div id='author'>- {props.author}</div>);
}



ReactDOM.render(<App />, document.getElementById('app'));

