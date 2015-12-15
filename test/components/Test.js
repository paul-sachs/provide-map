import React, { Component, PropTypes } from 'react';
import provide from 'react-redux-provide';
import TestItem from './TestItem';

@provide
export default class Test extends Component {
  static propTypes = {
    testMap: PropTypes.object.isRequired,
    testMapSize: PropTypes.number.isRequired,
    setTestMap: PropTypes.func.isRequired,
    updateTestMap: PropTypes.func.isRequired,
    filterTestMap: PropTypes.func.isRequired,
    clearTestMap: PropTypes.func.isRequired,
    setTestItem: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="test">
        {this.renderItems()}
      </div>
    );
  }

  renderItems() {
    const items = [];

    for (let letter of this.props.testMap.keys()) {
      items.push(
        <TestItem key={letter} letter={letter} />
      );
    }

    return items;
  }
}
