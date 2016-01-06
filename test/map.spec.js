import expect from 'expect';
import React, { PropTypes } from 'react';
import { renderTest } from 'react-redux-provide-test-utils';
import { Test, TestItem } from './components/index';
import providers from './providers/index';

const context = {
  providers,
  providedState: {
    testMap: new Map([
      ['a', {
        selected: true,
        value: 1
      }],
      ['b', {
        value: 2
      }],
      ['c', {
        value: 3
      }]
    ])
  }
};

const test = renderTest(Test, { ...context });
const testItem = renderTest(TestItem, { ...context, letter: 'a' });

describe('react-redux-provide-map', () => {
  it('should have initialized map', () => {
    expect(test.wrappedInstance.props.testMap instanceof Map).toBe(true);
    expect(typeof test.wrappedInstance.props.testMap.get('a')).toBe('object');
    expect(test.wrappedInstance.props.testMap.size).toBe(3);
    expect(test.wrappedInstance.props.testMapSize).toBe(3);
    expect(test.wrappedInstance.props.testMap.get('a').selected).toBe(true);
    expect(test.wrappedInstance.props.testMap.get('a').value).toBe(1);
    expect(typeof test.wrappedInstance.props.testMap.get('b')).toBe('object');
    expect(test.wrappedInstance.props.testMap.get('b').value).toBe(2);
    expect(typeof test.wrappedInstance.props.testMap.get('c')).toBe('object');
    expect(test.wrappedInstance.props.testMap.get('c').value).toBe(3);
  });

  it('should provide item when index prop is present', () => {
    expect(testItem.wrappedInstance.props.letter).toBe('a');
    expect(testItem.wrappedInstance.props.hasTestItem).toBe(true);
    expect(testItem.wrappedInstance.props.testItem.selected).toBe(true);
    expect(testItem.wrappedInstance.props.testItem.value).toBe(1);
  });

  it('should setMap', () => {
    test.wrappedInstance.props.setTestMap([
      ['a', {value: 'apple'}],
      ['b', {value: 'banana'}],
      ['c', {value: 'carrot'}]
    ]);

    expect(test.wrappedInstance.props.testMap instanceof Map).toBe(true);
    expect(test.wrappedInstance.props.testMap.size).toBe(3);
    expect(test.wrappedInstance.props.testMapSize).toBe(3);
    expect(typeof test.wrappedInstance.props.testMap.get('a')).toBe('object');
    expect(test.wrappedInstance.props.testMap.get('a').value).toBe('apple');
    expect(typeof test.wrappedInstance.props.testMap.get('b')).toBe('object');
    expect(test.wrappedInstance.props.testMap.get('b').value).toBe('banana');
    expect(typeof test.wrappedInstance.props.testMap.get('c')).toBe('object');
    expect(test.wrappedInstance.props.testMap.get('c').value).toBe('carrot');
  });

  it('should updateMap', () => {
    test.wrappedInstance.props.updateTestMap(([letter, testItem]) => (
      [ letter, { ...testItem, value: testItem.value.slice(0, 3) } ]
    ));

    expect(test.wrappedInstance.props.testMap instanceof Map).toBe(true);
    expect(test.wrappedInstance.props.testMap.size).toBe(3);
    expect(test.wrappedInstance.props.testMapSize).toBe(3);
    expect(typeof test.wrappedInstance.props.testMap.get('a')).toBe('object');
    expect(test.wrappedInstance.props.testMap.get('a').value).toBe('app');
    expect(typeof test.wrappedInstance.props.testMap.get('b')).toBe('object');
    expect(test.wrappedInstance.props.testMap.get('b').value).toBe('ban');
    expect(typeof test.wrappedInstance.props.testMap.get('c')).toBe('object');
    expect(test.wrappedInstance.props.testMap.get('c').value).toBe('car');
  });

  it('should filterMap', () => {
    test.wrappedInstance.props.filterTestMap(([letter, testItem]) => (
      testItem.value !== 'ban' && letter !== 'c'
    ));

    expect(test.wrappedInstance.props.testMap instanceof Map).toBe(true);
    expect(test.wrappedInstance.props.testMap.size).toBe(1);
    expect(test.wrappedInstance.props.testMapSize).toBe(1);
    expect(typeof test.wrappedInstance.props.testMap.get('a')).toBe('object');
    expect(test.wrappedInstance.props.testMap.get('a').value).toBe('app');
    expect(test.wrappedInstance.props.testMap.get('b')).toBe(undefined);
    expect(test.wrappedInstance.props.testMap.get('c')).toBe(undefined);
  });

  it('should setItem', () => {
    test.wrappedInstance.props.setTestItem('d', {
      value: 'donut'
    });

    expect(test.wrappedInstance.props.testMap instanceof Map).toBe(true);
    expect(test.wrappedInstance.props.testMap.size).toBe(2);
    expect(test.wrappedInstance.props.testMapSize).toBe(2);
    expect(typeof test.wrappedInstance.props.testMap.get('a')).toBe('object');
    expect(test.wrappedInstance.props.testMap.get('a').value).toBe('app');
    expect(typeof test.wrappedInstance.props.testMap.get('d')).toBe('object');
    expect(test.wrappedInstance.props.testMap.get('d').value).toBe('donut');
  });

  it('should renameItem', () => {
    testItem.wrappedInstance.props.renameTestItem('a', 'z');

    expect(testItem.wrappedInstance.props.letter).toBe('a');
    expect(testItem.wrappedInstance.props.hasTestItem).toBe(false);
    expect(testItem.wrappedInstance.props.testItem).toBe(undefined);

    testItem.wrappedInstance.props.renameTestItem('z', 'a');
  });

  it('should updateItem', () => {
    testItem.wrappedInstance.props.updateTestItem(
      testItem.wrappedInstance.props.letter, {
        value: 'apple',
        updated: true
      }
    );

    expect(testItem.wrappedInstance.props.letter).toBe('a');
    expect(testItem.wrappedInstance.props.hasTestItem).toBe(true);
    expect(testItem.wrappedInstance.props.testItem.selected).toBe(true);
    expect(testItem.wrappedInstance.props.testItem.value).toBe('apple');
    expect(testItem.wrappedInstance.props.testItem.updated).toBe(true);
  });

  it('should deleteItem', () => {
    testItem.wrappedInstance.props.deleteTestItem(
      testItem.wrappedInstance.props.letter
    );

    expect(testItem.wrappedInstance.props.letter).toBe('a');
    expect(testItem.wrappedInstance.props.hasTestItem).toBe(false);
    expect(testItem.wrappedInstance.props.testItem).toBe(undefined);
  });

  it('should clearMap', () => {
    test.wrappedInstance.props.clearTestMap();

    expect(test.wrappedInstance.props.testMap instanceof Map).toBe(true);
    expect(test.wrappedInstance.props.testMap.size).toBe(0);
    expect(test.wrappedInstance.props.testMapSize).toBe(0);
    expect(test.wrappedInstance.props.testMap.get('d')).toBe(undefined);
  });
});
