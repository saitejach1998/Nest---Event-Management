import React from 'react';
import User_Events from './e_posted.js';

import renderer from 'react-test-renderer';

describe('User_Events component', function() {
    it('renders a SignupCompont ', function() {
      const tree = renderer.create(
        <User_Events />
        ).toJSON();
    expect(tree).toMatchSnapshot();
    });
  });