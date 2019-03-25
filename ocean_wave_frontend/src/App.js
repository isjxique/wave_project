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
      waveData: [
        {
          type: "contour",
          z: [],
          x: [],
          y: []
        }
      ],
      spectralData: [
        {
          type: "contour",
          z: [],
          x: [],
          y: []
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
          waveData: [
            {
              type: "contour",
              z: json.data.waveFieldData,
              x: json.data.spatialAxis,
              y: json.data.spatialAxis
            }
          ],
          spectralData: [
            {
              type: "contour",
              z: json.data.spectralFieldData,
              x: json.data.spectralAxis,
              y: json.data.spectralAxis
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
          waveData: [
            {
              type: "contour",
              z: json.data.waveFieldData,
              x: json.data.spatialAxis,
              y: json.data.spatialAxis
            }
          ],
          spectralData: [
            {
              type: "contour",
              z: json.data.spectralFieldData,
              x: json.data.spectralAxis,
              y: json.data.spectralAxis
            }
          ]
        })
      )
      .catch(error => alert(error));
  }

  render() {
    return (
      <div class="ui three column stackable grid">
        <div class="column" />
        <div class="column">
          <div>
            <Plot
              data={this.state.spectralData}
              layout={{
                title: "Plot of Wave Spectrum",
                autosize: true
              }}
              style={{ width: "100%", height: "100%" }}
              useResizeHandler={true}
            />
          </div>
          <div class="ui centered">
            <div>
              <input
                type="range"
                name="value1"
                min="0"
                max="6"
                value={this.state.value1}
                onChange={this.handleChange}
                step="0.25"
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
              data={this.state.waveData}
              layout={{
                title: "Plot of Wave Field",
                autosize: true
              }}
              style={{ width: "100%", height: "100%" }}
              useResizeHandler={true}
            />
          </div>

          <div class="column" />
        </div>
      </div>
    );
  }
}

export default App;
