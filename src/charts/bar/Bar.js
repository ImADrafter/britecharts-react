import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bar from './barChart';
import {loadingContainerWrapper} from '../loading/LoadingContainer';

class Bar extends Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.any),

        betweenBarsPadding: PropTypes.number,

        colorSchema: PropTypes.arrayOf(PropTypes.string),

        enableLabels: PropTypes.bool,

        hasPercentage: PropTypes.bool,

        hasSingleBarHighlight: PropTypes.bool,

        height: PropTypes.number,

        highlightBarFunction: PropTypes.func,

        isAnimated: PropTypes.bool,

        isHorizontal: PropTypes.bool,

        labelsMargin: PropTypes.number,

        labelsNumberFormat: PropTypes.string,

        labelsSize: PropTypes.number,

        loadingState: PropTypes.string,

        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number,
        }),

        nameLabel: PropTypes.number,

        numberFormat: PropTypes.string,

        orderingFunction: PropTypes.func,

        percentageAxisToMaxRatio: PropTypes.number,

        percentageLabelMargin: PropTypes.number,

        shouldReverseColorList: PropTypes.bool,

        shouldShowLoadingState: PropTypes.bool,

        valueLabel: PropTypes.number,

        width: PropTypes.number,

        xTicks: PropTypes.number,

        tooltipThreshold: PropTypes.number,

        usePercentage: PropTypes.bool,

        yAxisPaddingBetweenChart: PropTypes.number,

        yTicks: PropTypes.number,

        customMouseOver: PropTypes.func,

        customMouseMove: PropTypes.func,

        customMouseOut: PropTypes.func,

        chart: PropTypes.object,

        createTooltip: PropTypes.func,
    }

    static defaultProps = {
        chart: bar,
        createTooltip: () => null,
        shouldShowLoadingState: false,
    }

    constructor(props) {
        super(props);

        this._setRef = this._setRef.bind(this);
    }

    componentDidMount() {
        if (!this.props.shouldShowLoadingState) {
            this._createChart();
        }
    }

    componentDidUpdate() {
        if (!this.props.shouldShowLoadingState) {
            if (!this._chart) {
                this._createChart();
            } else {
                this._updateChart();
                this.props.createTooltip();
            }
        }
    }

    componentWillUnmount() {
        this.props.chart.destroy(this._rootNode);
    }

    _createChart() {
        this._chart = this.props.chart.create(
            this._rootNode,
            this.props.data,
            this._getChartConfiguration()
        );
    }

    _updateChart() {
        this.props.chart.update(
            this._rootNode,
            this.props.data,
            this._getChartConfiguration(),
            this._chart
        );
    }

    /**
     * We want to remove the chart and data from the props in order to have a configuration object
     * @return {Object} Configuration object for the chart
     */
    _getChartConfiguration() {
        const configuration = { ...this.props };

        delete configuration.data;
        delete configuration.chart;
        delete configuration.createTooltip;
        delete configuration.shouldShowLoadingState;

        return configuration;
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {

        return loadingContainerWrapper(
            this.props,
            this.props.loadingState || this.props.chart.loading(),
            <div className="bar-container" ref={this._setRef} />
        );
    }
}

export default Bar;
