import { assignProviders } from 'react-redux-provide';
import * as selectable from '../src/index';
import Test from './components/Test';
import TestItem from './components/TestItem';

const states = {
  numbers: {
    map: {
      one: 1,
      two: 2,
      three: 3
    },
    selectedKey: 'one'
  }
};

assignProviders(states.numbers, { selectable }, {
  Test,
  TestItem
});
