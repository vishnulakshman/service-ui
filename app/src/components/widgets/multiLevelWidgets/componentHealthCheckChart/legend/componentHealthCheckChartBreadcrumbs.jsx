import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { injectIntl } from 'react-intl';
import styles from './componentHealthCheckChartBreadcrumbs.scss';

const cx = classNames.bind(styles);

@injectIntl
export class ComponentHealthCheckChartBreadcrumbs extends PureComponent {
  static propTypes = {
    attributes: PropTypes.array,
    activeAttributes: PropTypes.array,
    onClickBreadcrumbs: PropTypes.func,
  };

  static defaultProps = {
    attributes: [],
    activeAttributes: [],
    onClickBreadcrumbs: () => {},
  };

  render() {
    const { attributes, activeAttributes, onClickBreadcrumbs } = this.props;
    const actualAttributes = activeAttributes || attributes;

    return (
      <ul className={cx('list')}>
        {actualAttributes &&
          actualAttributes.map((item, i) => (
            <li className={cx('item', { active: item.isActive })} key={item.key}>
              {!item.isStatic && !item.isActive ? (
                <a className={cx('link')} onClick={() => onClickBreadcrumbs(item.id)}>
                  <span className={cx('link-key')}>{item.key}</span>
                  <span className={cx('link-value')}>
                    {`${item.attr.value}, ${item.attr.passingRate}%`}
                  </span>
                </a>
              ) : (
                <span>{item.key}</span>
              )}
              {i + 1 < actualAttributes.length && <span className={cx('icon')} />}
            </li>
          ))}
      </ul>
    );
  }
}
