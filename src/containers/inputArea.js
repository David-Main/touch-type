import React, { Component } from "react";
import Words from "../components/words";

class InputArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.adjustInputSize = this.adjustInputSize.bind(this);
  }
  componentDidMount() {
    // Set vlaue of input to nothing;
    this.setState({ input: "" });
    this.adjustInputSize();
    let input = document.getElementById("typing");
    input.focus();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.input !== prevState.input) {
      // update size of input
      this.adjustInputSize();
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
          tabIndex="1"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <Words class="untyped" words={"this is the"} />
      </section>
    );
  }
}

export default InputArea;
