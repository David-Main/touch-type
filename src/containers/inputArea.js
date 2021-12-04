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
      validInput: true,
      words: Sample,
    };
    this.handleChange = this.handleChange.bind(this);
    this.adjustInputSize = this.adjustInputSize.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.editWords = this.editWords.bind(this);
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
    if (this.state.input !== prevState.input) {
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
        words: words.slice(this.state.input.length),
      });
    }
  }

  handleChange(event) {
    this.setState({ ...this.state, input: event.target.value });
  }

  adjustInputSize() {
    let length = this.state.input.length;
    let input = document.getElementById("typing");
    input.style.width = length + 1 + "ch";
  }

  render() {
    return (
      <section className="input-area">
        <Words class="typed" words={"this is the"} />
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
