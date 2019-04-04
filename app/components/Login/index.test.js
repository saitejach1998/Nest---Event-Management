import React from 'react';
import LoginForm from './index.js';

import renderer from 'react-test-renderer';

describe('LoginForm component', function() {
    it('renders a SignupCompont ', function() {
      const tree = renderer.create(
        <LoginForm />
        ).toJSON();
    expect(tree).toMatchSnapshot();
    });
  });