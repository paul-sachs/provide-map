import React, { Component, PropTypes } from 'react';
import provide from 'react-redux-provide';

@provide({
  testItem: PropTypes.object,
  hasTestItem: PropTypes.bool.isRequired,
  renameTestItem: PropTypes.func.isRequired,
  updateTestItem: PropTypes.func.isRequired,
  deleteTestItem: PropTypes.func.isRequired
})
export default class TestItem extends Component {
  static propTypes = {
    letter: PropTypes.string.isRequired
  };

  render() {
    const { testItem } = this.props;

    return testItem ? (
      <li className="test-item">
        {testItem.value}
      </li>
    ) : null;
  }
}
