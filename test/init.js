import { assignProviders } from 'react-redux-provide';
import provideMap from '../src/index';
import Test from './components/Test';
import TestItem from './components/TestItem';

const testMap = provideMap('testMap', 'testItem', 'letter');

const initialState = {
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
};

assignProviders(initialState, { testMap }, {
  Test,
  TestItem
});
