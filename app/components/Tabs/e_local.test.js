import React from 'react';
import Local_Events from './e_local.js';

import renderer from 'react-test-renderer';

describe('Global_Events component', function() {
    it('renders a SignupCompont ', function() {
      const tree = renderer.create(
        <Local_Events />
        ).toJSON();
    expect(tree).toMatchSnapshot();
    });
  });