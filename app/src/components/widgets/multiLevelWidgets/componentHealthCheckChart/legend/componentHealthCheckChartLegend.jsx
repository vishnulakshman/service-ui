import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { injectIntl, intlShape } from 'react-intl';
import { ComponentHealthCheckChartBreadcrumbs } from './componentHealthCheckChartBreadcrumbs';
import { ComponentHealthCheckChartColorScheme } from './componentHealthCheckChartColorScheme';
import styles from './componentHealthCheckChartLegend.scss';

const cx = classNames.bind(styles);

@injectIntl
export class ComponentHealthCheckChartLegend extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    attributes: PropTypes.array,
    activeAttributes: PropTypes.array,
    onClickBreadcrumbs: PropTypes.func,
    passingRate: PropTypes.number,
  };

  static defaultProps = {
    attributes: [],
    activeAttributes: [],
    onClickBreadcrumbs: () => {},
    passingRate: null,
  };

  render() {
    const { attributes, activeAttributes, onClickBreadcrumbs, passingRate } = this.props;

    return (
      <div className={cx('legend')}>
        <ComponentHealthCheckChartBreadcrumbs
          attributes={attributes}
          activeAttributes={activeAttributes}
          onClickBreadcrumbs={onClickBreadcrumbs}
        />
        <ComponentHealthCheckChartColorScheme passingRate={passingRate} />
      </div>
    );
  }
}
