import React, { Component, PropTypes } from 'react';
import provide from 'react-redux-provide';
import TestItem from './TestItem';

@provide({
  map: PropTypes.object.isRequired,
  setMap: PropTypes.func.isRequired,
  updateMap: PropTypes.func.isRequired,
  filterMap: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired
})
export default class Test extends Component {
  render() {
    return (
      <div className="test">
        {this.renderItems()}
      </div>
    );
  }

  renderItems() {
    return Object.keys(this.props.map).map(
      (index) => <TestItem key={index} index={index} />
    );
  }
}
