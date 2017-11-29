import * as React from "react";

// Provider
export default class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  handleClick = () => {
    console.log("this is:", this);
    this.setState({
      name: "Scott"
    });
  };

  render() {
    return (
      <div>
        Hello {this.state.name}!
        <button name="Update" onClick={this.handleClick}>
          Update
        </button>
      </div>
    );
  }
}
