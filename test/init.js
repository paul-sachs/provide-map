import { assignProviders } from 'react-redux-provide';
import * as map from '../src/index';
import Test from './components/Test';
import TestItem from './components/TestItem';

const states = {
  values: {
    map: {
      a: {
        selected: true,
        value: 1
      },
      b: {
        value: 2
      },
      c: {
        value: 3
      }
    }
  }
};

assignProviders(states.values, { map }, {
  Test,
  TestItem
});
