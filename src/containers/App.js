import PageHeader from "../elements/Header";
import Metric from "../components/metric";
import InputArea from "./inputArea";

import React, { Component } from "react";
import words from "../data/words";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typed: "",
      correctWords: [],
    };

    this.CountWords = this.CountWords.bind(this);
    this.CountChars = this.CountChars.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.typed !== this.state.typed) {
      this.setState({
        correctWords: this.state.typed.split(" ").filter((word) => {
          return word.indexOf("/*0*/") === -1;
        }),
      });
    }
  }

  CountWords(words) {
    this.setState({
      typed: words,
    });
  }

  CountChars() {
    let chars = 0;
    this.state.correctWords.forEach((word) => {
      chars = chars + word.length;
    });
    return chars;
  }
  render() {
    return (
      <div className="container container-app">
        <PageHeader />
        <section className="section-metrics">
          <Metric value={60} unit={"seconds"} />
          <Metric
            value={
              this.state.correctWords.length > 1
                ? this.state.correctWords.length - 1
                : 0
            }
            unit={"words/min"}
          />
          <Metric value={this.CountChars()} unit={"chars/min"} />
        </section>
        <InputArea onType={this.CountWords} words={words} />
      </div>
    );
  }
}
