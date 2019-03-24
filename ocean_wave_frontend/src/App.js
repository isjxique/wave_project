import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: "2",
      value2: "0",
      data: [
        {
          type: "contour",
          z: []
        }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });

    if (name === "value1") {
      this.onParamChange(value, this.state.value2);
    } else if (name === "value2") {
      this.onParamChange(this.state.value1, value);
    }
  }

  componentDidMount() {
    axios
      .get("http://0.0.0.0:3000/getwavematrixwparam", {
        params: { windspeed: this.state.value1, angle: this.state.value2 },
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(json =>
        this.setState({
          data: [
            {
              type: "contour",
              z: json.data.data
            }
          ]
        })
      )
      .catch(error => alert(error));
  }

  async onParamChange(windSpeed, angleDegree) {
    const response = await axios
      .get("http://0.0.0.0:3000/getwavematrixwparam", {
        params: { windspeed: windSpeed, angle: angleDegree },
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(json =>
        this.setState({
          data: [
            {
              type: "contour",
              z: json.data.data
            }
          ]
        })
      )
      .catch(error => alert(error));
  }

  render() {
    return (
      <div class="ui center aligned container">
        <div>
          <div>
            <input
              type="range"
              name="value1"
              min="0"
              max="6"
              value={this.state.value1}
              onChange={this.handleChange}
              step="0.5"
            />
            <label for="volume">Wind Speed = {this.state.value1}</label>
          </div>

          <div>
            <input
              type="range"
              name="value2"
              min="0"
              max="360"
              value={this.state.value2}
              onChange={this.handleChange}
              step="1"
            />
            <label for="volume"> Wind Direction = {this.state.value2}</label>
          </div>
        </div>
        <div>
          <Plot
            data={this.state.data}
            layout={{
              width: 400,
              height: 400,
              title: "A Fancy Countour Plot of Waves",
              autosize: true
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
