/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import bullet from './bulletChart';
import {loadingContainerWrapper} from '../loading/LoadingContainer';

class Bullet extends React.Component {

    static propTypes = {
        data: PropTypes.array,

        aspectRatio: PropTypes.number,

        colorSchema: PropTypes.arrayOf(PropTypes.string),

        customSubtitle: PropTypes.string,

        customTitle: PropTypes.string,

        height: PropTypes.number,

        isReverse: PropTypes.bool,

        loadingState: PropTypes.string,

        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number,
        }),

        numberFormat: PropTypes.string,

        paddingBetweenAxisAndChart: PropTypes.number,

        startMaxRangeOpacity: PropTypes.number,

        ticks: PropTypes.number,

        width: PropTypes.number,

        chart: PropTypes.object,
    }

    static defaultProps = {
        chart: bullet,
        createTooltip: () => null,
        shouldShowLoadingState: false,
    }

    constructor(props) {
        super(props);

        this._setRef = this._setRef.bind(this);
    }

    componentDidMount() {
        if (!this.props.shouldShowLoadingState) {
            if (this.props.data !== null) {
                this._createChart();
            }
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
        let configuration = {...this.props};

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
            <div className="bullet-container" ref={this._setRef} />
        );
    }
}

export default Bullet;
