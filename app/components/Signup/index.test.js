import React from 'react';
import Signupform from './index.js';

import renderer from 'react-test-renderer';

describe('Signup component', function() {
    it('renders a SignupCompont ', function() {
      const tree = renderer.create(
        <Signupform />
        ).toJSON();
    expect(tree).toMatchSnapshot();
    });
  });