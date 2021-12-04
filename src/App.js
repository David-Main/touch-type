import PageHeader from "./elements/Header";
import Metric from "./components/metric";
import InputArea from "./containers/inputArea";

const App = () => {
  return (
    <div className="container container-app">
      <PageHeader />
      <section className="section-metrics">
        <Metric value={60} unit={"seconds"} />
        <Metric value={0} unit={"words/min"} />
        <Metric value={0} unit={"chars/min"} />
      </section>
      <InputArea />
    </div>
  );
};

export default App;
