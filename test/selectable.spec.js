import './init';
import expect from 'expect';
import React, { PropTypes } from 'react';
import { renderTest } from 'react-redux-provide-test-utils';
import Test from './components/Test';
import TestItem from './components/TestItem';

const test = renderTest(Test);
const testItem = renderTest(TestItem, { itemKey: 'one', value: 1 });

const expected = {
  one: 1,
  two: 2,
  three: 3
};

describe('react-redux-provide-selectable', () => {
  it('should have initialized map', () => {
    const { map } = test.wrappedInstance.props;
    const keys = Object.keys(map);

    expect(keys.length).toBe(3);

    for (let key of keys) {
      expect(map[key]).toBe(expected[key]);
    }
  });

  it('should have initialized selectedKey', () => {
    expect(testItem.wrappedInstance.props.selectedKey).toBe('one');
  });

  it('should provide selected', () => {
    expect(testItem.wrappedInstance.props.selected).toBe(1);
  });

  it('should add key and value', () => {
    test.wrappedInstance.props.add('four', 4);
    expected.four = 4;

    const { map } = test.wrappedInstance.props;
    const keys = Object.keys(map);

    expect(keys.length).toBe(4);

    for (let key of keys) {
      expect(map[key]).toBe(expected[key]);
    }
  });

  it('should remove value by key', () => {
    test.wrappedInstance.props.remove('four');
    delete expected.four;

    const { map } = test.wrappedInstance.props;
    const keys = Object.keys(map);

    expect(keys.length).toBe(3);

    for (let key of keys) {
      expect(map[key]).toBe(expected[key]);
    }
  });

  it('should select key', () => {
    test.wrappedInstance.props.select('two');

    expect(testItem.wrappedInstance.props.selected).toBe(2);
    expect(testItem.wrappedInstance.props.selectedKey).toBe('two');
  });
});
