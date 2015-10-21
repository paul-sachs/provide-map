import React, { Component, PropTypes } from 'react';
import provide from 'react-redux-provide';
import TestItem from './TestItem';

@provide({
  map: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired
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
    const { map } = this.props;

    return Object.keys(map).map(
      key => <TestItem key={key} itemKey={key} value={map[key]} />
    );
  }
}
