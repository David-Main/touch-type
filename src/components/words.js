const Words = (props) => {
  return (
    <p className={`words  ${props.class}`}>
      {props.words.split(" ").map((word) => {
        if (!word.indexOf("/*wrong*/")) {
          return (
            <span className="word wrong">{word.replace("/*wrong*/", "")}</span>
          );
        }
        return <span className="word">{word}</span>;
      })}
    </p>
  );
};

export default Words;
