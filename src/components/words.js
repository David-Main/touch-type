const Words = (props) => {
  return (
    <p className={`words  ${props.class}`}>
      {props.words.split(" ").map((word, index) => {
        if (word.length > 0) {
          if (!word.indexOf("/*0*/")) {
            return (
              <span key={index} className="word wrong">
                {word.replace("/*0*/", "")}
              </span>
            );
          }
          return (
            <span key={index} className="word">
              {word}
            </span>
          );
        } else {
          return <span key={new Date().getTime().toString()}></span>;
        }
      })}
    </p>
  );
};

export default Words;
