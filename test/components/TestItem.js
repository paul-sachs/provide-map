import React, { Component, PropTypes } from 'react';
import provide from 'react-redux-provide';

@provide({
  selected: PropTypes.number.isRequired,
  selectedKey: PropTypes.string.isRequired
})
export default class TestItem extends Component {
  static propTypes = {
    itemKey: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  };

  render() {
    const { selectedKey, itemKey, value } = this.props;
    let className = 'test-item';

    if (selectedKey === itemKey) {
      className += ' is-selected';
    }

    return (
      <li className={className}>
        {value}
      </li>
    );
  }
}
