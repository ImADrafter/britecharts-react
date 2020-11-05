import React, { Component } from 'react';
import PropTypes from 'prop-types';

import donut from './donutChart';
import {loadingContainerWrapper} from '../loading/LoadingContainer';

export default class Donut extends Component {

    static propTypes = {
        data: PropTypes.array,

        centeredTextFunction: PropTypes.func,

        colorSchema: PropTypes.arrayOf(PropTypes.string),

        emptyDataConfig: PropTypes.object,

        externalRadius: PropTypes.number,

        hasFixedHighlightedSlice: PropTypes.bool,

        height: PropTypes.number,

        highlightSliceById: PropTypes.number,

        internalRadius: PropTypes.number,

        isAnimated: PropTypes.bool,

        loadingState: PropTypes.string,

        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number,
        }),

        numberFormat: PropTypes.string,

        orderingFunction: PropTypes.func,

        percentageFormat: PropTypes.string,

        radiusHoverOffset: PropTypes.number,

        shouldShowLoadingState: PropTypes.bool,

        width: PropTypes.number,

        customMouseOver: PropTypes.func,
        
        customMouseOut: PropTypes.func,
        
        customMouseMove: PropTypes.func,
        
        customClick: PropTypes.func,

        chart: PropTypes.object,
    }

    static defaultProps = {
        chart: donut,
        isAnimated: true,
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
        const configuration = {...this.props};

        delete configuration.data;
        delete configuration.chart;
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
            <div className="donut-container" ref={this._setRef} />
        );
    }
}
