import React, { Component, PropTypes } from 'react';
import provide from 'react-redux-provide';

@provide({
  item: PropTypes.object,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
})
export default class TestItem extends Component {
  static propTypes = {
    index: PropTypes.string.isRequired
  };

  render() {
    const { item } = this.props;

    return item && (
      <li className="test-item">
        {item.value}
      </li>
    );
  }
}
