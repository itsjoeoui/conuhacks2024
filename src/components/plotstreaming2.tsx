"use client"
import React from 'react';
import Plot from 'react-plotly.js';

interface PlotComponentProps {
  // Vectors of x and y values
  xValues: number[];
  yValues: number[];
}

interface PlotComponentState {
  // State to store existing data traces
  data: any[];
}

class PlotComponent extends React.Component<PlotComponentProps, PlotComponentState> {
  constructor(props: PlotComponentProps) {
    super(props);

    this.state = {
      data: [], // Initialize data state as an empty array
    };
  }

  // Function to update or create a plot based on input vectors
  updateOrCreatePlot = (): void => {
    const { xValues, yValues } = this.props;

    const newData = {
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines',
      name: 'New Data',
    };

    // Check if the plot already exists
    const plotExists = this.state.data.length > 0;

    if (plotExists) {
      // If the plot exists, update the existing data state
      this.setState((prevState) => ({
        data: [...prevState.data, newData],
      }));
    } else {
      // If the plot doesn't exist, create a new data state with the new data
      this.setState({
        data: [newData],
      });
    }
  };

  componentDidMount() {
    // Call the updateOrCreatePlot function when the component mounts
    this.updateOrCreatePlot();
  }

  componentDidUpdate(prevProps: PlotComponentProps) {
    // Call the updateOrCreatePlot function when the component updates with new props
    if (prevProps.xValues !== this.props.xValues || prevProps.yValues !== this.props.yValues) {
      this.updateOrCreatePlot();
    }
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <Plot
          data={data}
          layout={{
            title: 'Dynamic Plot',
            xaxis: { title: 'X Axis' },
            yaxis: { title: 'Y Axis' },
          }}
        />
      </div>
    );
  }
}

export default PlotComponent;