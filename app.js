// This project is partly inspired by and includes quotes from this wonderful pen! https://codepen.io/SourApple/pen/BoXjpZ
const endpoint = 'https://gist.githubusercontent.com/dmullen17/6bdadb84e894e5e695fb301613bb7bd1/raw/4e84ee85b6eda9bc0ae253024a5b384dcb579292/Harry%2520Potter%2520Quotes'; 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      quotes: [],
      quote: 'Welcome to the Harry Potter random quote generator!',
      speaker: 'All quotes from J.K. Rowling'
    }
    this.newQuote = this.newQuote.bind(this);
  }
  componentDidMount() {
    fetch(endpoint)
      .then(blob => blob.json())
      .then((data) => {
      this.setState({
        isLoaded: true,
        quotes: data["quotes"]
      });
    });
  }
  newQuote() {
    const index = Math.floor(Math.random()*this.state.quotes.length);
    this.setState({
      quote: this.state.quotes[index].quote,
      speaker: this.state.quotes[index].speaker
    });
  }
  render() {
    const tweetHref = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(this.state.quote);
    return (
      <body id='app'>
        <div id='quote-box'>
          <div id='text'>{this.state.quote}</div>
          <div id='author'>- {this.state.speaker}</div>
          <div id='buttons-row'>
            <a href='https://github.com/dmullen17' target='_blank'>
              <i className="fab fa-github-square tweet-button"></i>
            </a>
            <a id='tweet-quote' href={tweetHref} target='_blank'>
              <i className="fab fa-twitter-square tweet-button"></i>
            </a>
            <button id='new-quote' onClick={this.newQuote}>New Quote</button>
          </div>
        </div>
      </body>
    );
  }
}; 

ReactDOM.render(<App />, document.getElementById('app'));

