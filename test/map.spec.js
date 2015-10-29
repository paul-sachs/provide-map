import './init';
import expect from 'expect';
import React, { PropTypes } from 'react';
import { renderTest } from 'react-redux-provide-test-utils';
import Test from './components/Test';
import TestItem from './components/TestItem';

const test = renderTest(Test);
const testItem = renderTest(TestItem, { index: 'a' });

describe('react-redux-provide-map', () => {
  it('should have initialized map', () => {
    expect(typeof test.wrappedInstance.props.map).toBe('object');
    expect(typeof test.wrappedInstance.props.map.a).toBe('object');
    expect(typeof test.wrappedInstance.props.map.b).toBe('object');
    expect(typeof test.wrappedInstance.props.map.c).toBe('object');
    expect(test.wrappedInstance.props.map.a.selected).toBe(true);
    expect(test.wrappedInstance.props.map.a.value).toBe(1);
    expect(test.wrappedInstance.props.map.b.value).toBe(2);
    expect(test.wrappedInstance.props.map.c.value).toBe(3);
  });

  it('should provide item when index prop is present', () => {
    expect(testItem.wrappedInstance.props.index).toBe('a');
    expect(testItem.wrappedInstance.props.item.selected).toBe(true);
    expect(testItem.wrappedInstance.props.item.value).toBe(1);
  });

  it('should setMap', () => {
    test.wrappedInstance.props.setMap({
      a: {value: 'apple'},
      b: {value: 'banana'},
      c: {value: 'carrot'}
    });

    expect(typeof test.wrappedInstance.props.map).toBe('object');
    expect(typeof test.wrappedInstance.props.map.a).toBe('object');
    expect(typeof test.wrappedInstance.props.map.b).toBe('object');
    expect(typeof test.wrappedInstance.props.map.c).toBe('object');
    expect(test.wrappedInstance.props.map.a.value).toBe('apple');
    expect(test.wrappedInstance.props.map.b.value).toBe('banana');
    expect(test.wrappedInstance.props.map.c.value).toBe('carrot');

    expect(testItem.wrappedInstance.props.index).toBe('a');
    expect(testItem.wrappedInstance.props.item.value).toBe('apple');
  });

  it('should updateMap', () => {
    test.wrappedInstance.props.updateMap((item) => {
      return { ...item, value: item.value.slice(0, 3) };
    });

    expect(typeof test.wrappedInstance.props.map).toBe('object');
    expect(typeof test.wrappedInstance.props.map.a).toBe('object');
    expect(typeof test.wrappedInstance.props.map.b).toBe('object');
    expect(typeof test.wrappedInstance.props.map.c).toBe('object');
    expect(test.wrappedInstance.props.map.a.value).toBe('app');
    expect(test.wrappedInstance.props.map.b.value).toBe('ban');
    expect(test.wrappedInstance.props.map.c.value).toBe('car');

    expect(testItem.wrappedInstance.props.index).toBe('a');
    expect(testItem.wrappedInstance.props.item.value).toBe('app');
  });

  it('should filterMap', () => {
    test.wrappedInstance.props.filterMap((item, index) => {
      return item.value !== 'ban' && index !== 'c';
    });

    expect(typeof test.wrappedInstance.props.map).toBe('object');
    expect(typeof test.wrappedInstance.props.map.a).toBe('object');
    expect(typeof test.wrappedInstance.props.map.b).toBe('undefined');
    expect(typeof test.wrappedInstance.props.map.c).toBe('undefined');
    expect(test.wrappedInstance.props.map.a.value).toBe('app');

    expect(testItem.wrappedInstance.props.index).toBe('a');
    expect(testItem.wrappedInstance.props.item.value).toBe('app');
  });

  it('should createItem', () => {
    test.wrappedInstance.props.createItem('d', {
      value: 'donut'
    });

    expect(typeof test.wrappedInstance.props.map).toBe('object');
    expect(typeof test.wrappedInstance.props.map.a).toBe('object');
    expect(typeof test.wrappedInstance.props.map.d).toBe('object');
    expect(test.wrappedInstance.props.map.a.value).toBe('app');
    expect(test.wrappedInstance.props.map.d.value).toBe('donut');

    expect(testItem.wrappedInstance.props.index).toBe('a');
    expect(testItem.wrappedInstance.props.item.value).toBe('app');
  });

  it('should updateItem', () => {
    testItem.wrappedInstance.props.updateItem(
      testItem.wrappedInstance.props.index, {
        value: 'apple',
        updated: true
      }
    );

    expect(typeof test.wrappedInstance.props.map).toBe('object');
    expect(typeof test.wrappedInstance.props.map.a).toBe('object');
    expect(typeof test.wrappedInstance.props.map.d).toBe('object');
    expect(test.wrappedInstance.props.map.a.updated).toBe(true);
    expect(test.wrappedInstance.props.map.a.value).toBe('apple');
    expect(test.wrappedInstance.props.map.d.value).toBe('donut');

    expect(testItem.wrappedInstance.props.index).toBe('a');
    expect(testItem.wrappedInstance.props.item.value).toBe('apple');
  });

  it('should deleteItem', () => {
    testItem.wrappedInstance.props.deleteItem('d');

    expect(typeof test.wrappedInstance.props.map).toBe('object');
    expect(typeof test.wrappedInstance.props.map.a).toBe('object');
    expect(typeof test.wrappedInstance.props.map.d).toBe('undefined');
    expect(test.wrappedInstance.props.map.a.updated).toBe(true);
    expect(test.wrappedInstance.props.map.a.value).toBe('apple');

    expect(testItem.wrappedInstance.props.index).toBe('a');
    expect(testItem.wrappedInstance.props.item.value).toBe('apple');
  });
});
