import React, { Component } from "react";
import PageHeader from "../elements/Header"; 
import Metric from "../components/metric"
import Words from "../components/words";
import InputArea from "./inputArea";
import Sample from "../data/words"; 

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      words: Sample,
      inputValue: "",
      isValidInput: false,
      activeWord: "",
      typed: "",
      lastTyped: true
    }; 

    this.handleChange = this.handleChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
  } 
  componentDidMount(){
    this.setState({activeWord: this.state.words.split(" ")[0]})
  }
  componentDidUpdate(prevProps, prevState){

    if(prevState.inputValue !== this.state.inputValue){
      this.validateInput().then( () =>{  
        this.editWords();
      }) 
    }
  }
   
  async validateInput() {
    this.setState( {
      isValidInput: (this.state.activeWord.indexOf(this.state.inputValue) === 0)
    })
  }

  editWords() {
    const { inputValue, activeWord, isValidInput} = this.state;
    if(isValidInput){
      this.setState({
        words: activeWord.slice(inputValue.length) +
        Sample.slice(Sample.indexOf(activeWord) + activeWord.length)
      })
    }
    
  }

  async submitInput() {
    let nextTyped = this.state.inputValue === this.state.activeWord ? this.state.inputValue :
                    this.state.inputValue.length ? "/*0*/"+this.state.inputValue: "/*0*/"+this.state.activeWord;

      this.setState( function(prevState, prevProps) {
        return {
           typed: `${prevState.typed} ${nextTyped}`,
           lastTyped: this.state.inputValue === this.state.activeWord

      }
       }) 
    
  }
   handleChange(event) {
    if(event.target.value.at(-1) !== " "){
      this.setState({inputValue: event.target.value}) 
      
    }
    else{
      this.submitInput().then( () => {
        if(this.state.inputValue.length === 0){
          this.setState(
            {words: this.state.words.slice(this.state.activeWord.length + 1)}
          )
        }
        this.setState({
          words: this.state.words.trimStart()
        })
        
      }).then( () =>{

        // reset active word
        this.setState( 
          {activeWord: this.state.words.split(" ")[0]}
        )
      //clear inputValue
      this.setState( 
        {inputValue: ""}
      )
      }).then(() =>{
        if(this.state.lastTyped=== false){
          this.setState({
            words: this.state.words.slice(this.state.activeWord.length+1),
          })
          this.setState({
            activeWord: this.state.words.split(" ")[0]

          })
        }
      })
    }
  }
                       
  

  
  render() {
    return (
      <div className="container container-app">
        <PageHeader />
        <section className="section-metrics">
          <Metric value={60} unit={"seconds"} />
          <Metric
            value={ 0}
            unit={"words/min"}
          />
          <Metric value={0} unit={"chars/min"} />
        </section> 
        <section className="input-area">
          <Words class={"typed"} words={this.state.typed} />
          
          <InputArea  validState={this.state.isValidInput} inputValue={this.state.inputValue} handleChange={this.handleChange}/>
          <Words class={"untyped"} words={this.state.words} />
        </section>
      </div>
    );
  }
}
