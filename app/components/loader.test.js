import React from 'react';
import Loader  from './loader.js';

import renderer from 'react-test-renderer';

describe('Loader  component', function() {
    it('renders a SignupCompont ', function() {
      const tree = renderer.create(
        <Loader  />
        ).toJSON();
    expect(tree).toMatchSnapshot();
    });
  });