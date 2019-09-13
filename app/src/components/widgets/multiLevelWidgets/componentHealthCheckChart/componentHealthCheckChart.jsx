import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { injectIntl, intlShape } from 'react-intl';
import { ComponentHealthCheckChartLegend } from './legend/componentHealthCheckChartLegend';
import styles from './componentHealthCheckChart.scss';

const cx = classNames.bind(styles);

@injectIntl
export class ComponentHealthCheckChart extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    widget: PropTypes.object.isRequired,
    fetchWidget: PropTypes.func,
  };

  static defaultProps = {
    fetchWidget: () => {},
  };

  state = {
    activeAttributes: null,
    activeAttributeId: 0,
    selectedItem: null,
  };

  onClickBreadcrumbs = (id, actionSuccessCallback) => {
    const { activeAttributes } = this.state;
    const newActiveAttributes =
      activeAttributes &&
      activeAttributes.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isStatic: true,
            isActive: true,
            attr: null,
          };
        }

        if (item.id > id) {
          return {
            ...item,
            isStatic: true,
            isActive: false,
            attr: null,
          };
        }
        return {
          ...item,
        };
      });

    this.setState(
      {
        activeAttributes: newActiveAttributes,
        activeAttributeId: id,
      },
      actionSuccessCallback,
    );
  };

  onClickGroupItem = (value, passingRate, actionSuccessCallback) => {
    const { activeAttributes, activeAttributeId } = this.state;
    const newActiveAttributeId = activeAttributeId + 1;
    const actualAttributes = activeAttributes || this.getAttributes();

    const newActiveAttributes =
      actualAttributes &&
      actualAttributes.map((item) => {
        if (item.id === newActiveAttributeId) {
          return {
            ...item,
            isStatic: true,
            isActive: true,
            attr: null,
          };
        }

        if (item.id === activeAttributeId) {
          return {
            ...item,
            isStatic: false,
            isActive: false,
            attr: {
              value,
              passingRate,
            },
          };
        }
        return {
          ...item,
        };
      });

    this.setState(
      {
        activeAttributes: newActiveAttributes,
        activeAttributeId: newActiveAttributeId,
      },
      actionSuccessCallback,
    );
  };

  getAttributes = () =>
    this.props.widget.contentParameters.contentFields.map((item, index) => ({
      id: index,
      key: item,
      isStatic: true,
      isActive: this.state.activeAttributeId === index,
      attr: {
        value: null,
        passingRate: null,
      },
    }));

  getPassingRateValue = () => this.props.widget.contentParameters.itemsCount;

  // drillDown = () => this.onClickGroupItem(value, passingRate, this.fetchWidgetWithActiveAttributes);
  //
  // fetchWidgetWithActiveAttributes = () => {
  //   this.props.fetchWidget({
  //     attributes: this.state.activeAttributes,
  //   });
  // };

  render() {
    const { activeAttributes } = this.state;

    return (
      <div className={cx('component-health-check-chart')}>
        <ComponentHealthCheckChartLegend
          attributes={this.getAttributes()}
          activeAttributes={activeAttributes}
          onClickBreadcrumbs={this.onClickBreadcrumbs}
          passingRate={this.getPassingRateValue()}
        />
        <div onClick={() => this.onClickGroupItem('3.1.3', 50)}>click</div>
      </div>
    );
  }
}
