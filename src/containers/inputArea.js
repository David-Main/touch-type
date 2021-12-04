import React, { Component } from "react";
import Words from "../components/words";
import words from "../data/words";
import Sample from "../data/words";

class InputArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeWord: "",
      input: "",
      validInput: false,
      words: Sample,
      typedWords: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.adjustInputSize = this.adjustInputSize.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.editWords = this.editWords.bind(this);
    this.addTypedWord = this.addTypedWord.bind(this);
  }
  componentDidMount() {
    // Set vlaue of input to nothing;
    this.setState({ input: "" });
    this.adjustInputSize();
    let input = document.getElementById("typing");
    input.focus();
    this.setState({ activeWord: this.state.words.split(" ")[0] });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.typedWords !== prevState.typedWords &&
      this.state.input === prevState.input
    ) {
      //clear Input
      this.setState({ validInput: false, input: "" });

      // reset activeWord;
      this.setState({ activeWord: this.state.words.split(" ")[1] });
      // this.setState({ words: this.state.words.trimStart() });
    } else if (this.state.input !== prevState.input) {
      // update size of input
      this.adjustInputSize();

      //typing has started;
      // validate input against active word;
      this.validateInput().then(() => {
        this.editWords();
      });
    }
  }

  async validateInput() {
    this.setState({
      validInput: this.state.activeWord.indexOf(this.state.input) === 0,
    });
  }

  editWords() {
    if (this.state.validInput) {
      this.setState({
        words:
          this.state.activeWord.slice(this.state.input.length) +
          words.slice(
            words.indexOf(this.state.activeWord) + this.state.activeWord.length
          ),
      });
    }
  }
  addTypedWord() {
    console.log("adding");
    if (this.state.input.length) {
      // input has value
      if (this.state.input === this.state.activeWord) {
        this.setState({
          typedWords: this.state.typedWords + " " + this.state.input,
        });
      } else {
        this.setState({
          typedWords: `${this.state.typedWords} /*wrong*/${this.state.input}`,
        });
      }
    } else {
      // input is empty
      this.setState({
        typedWords: `${this.state.typedWords} /*wrong*/${this.state.activeWord}`,
      });
    }
  }

  handleChange(event) {
    if (event.target.value.at(-1) !== " ") {
      this.setState({ ...this.state, input: event.target.value });
    } else {
      this.addTypedWord();
    }
  }

  adjustInputSize() {
    let length = this.state.input.length;
    let input = document.getElementById("typing");
    input.style.width = length + 1 + "ch";
  }

  render() {
    return (
      <section className="input-area">
        <Words class="typed" words={this.state.typedWords} />
        <input
          type="text"
          name="typing"
          id="typing"
          className={this.state.validInput ? "" : "wrong"}
          tabIndex="1"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <Words class="untyped" words={this.state.words} />
      </section>
    );
  }
}
export default InputArea;
