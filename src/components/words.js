const Words = (props) => {
  return (
    <p className={`words  ${props.class}`}>
      {props.words.split(" ").map((word) => {
        return <span className="word">{word}</span>;
      })}
    </p>
  );
};

export default Words;
