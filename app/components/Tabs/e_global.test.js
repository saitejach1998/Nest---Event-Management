import React from 'react';
import Global_Events from './e_global.js';

import renderer from 'react-test-renderer';

describe('Global_Events component', function() {
    it('renders a SignupCompont ', function() {
      const tree = renderer.create(
        <Global_Events />
        ).toJSON();
    expect(tree).toMatchSnapshot();
    });
  });