import * as React from "react";
import "./styles.css";
import Tabs from "./Tabs.jsx";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Tabs</h1>
        <Tabs>
          <div href="/" label="Both" disabled={[false, false]}></div>
          <div href="/ATL" label="ATL" disabled={[false, true]}></div>
          <div href="/PTL" label="PTL" disabled={[true, false]}></div>
        </Tabs>
      </div>
    );
  }
}

export default App;
