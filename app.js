// This project is partly inspired by and includes quotes from this wonderful pen! https://codepen.io/SourApple/pen/BoXjpZ
const endpoint = 'https://gist.githubusercontent.com/dmullen17/6bdadb84e894e5e695fb301613bb7bd1/raw/d533e230993bcac206f10afe661e61aaee7b9a9e/Harry%2520Potter%2520Quotes'; 

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
          <div>
            <a id='tweet-quote' href={tweetHref} target='_blank'>
              <i class="fab fa-twitter-square"></i>
            </a>
            <button id='new-quote' onClick={this.newQuote}>New Quote</button>
          </div>
        </div>
      </body>
    );
  }
}; 

ReactDOM.render(<App />, document.getElementById('app'));

