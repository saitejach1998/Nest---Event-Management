import React from 'react';
import DashboardPage from './index.js';

import renderer from 'react-test-renderer';

describe('DashboardPage component', function() {
    it('renders a SignupCompont ', function() {
      const tree = renderer.create(
        <DashboardPage  />
        ).toJSON();
    expect(tree).toMatchSnapshot();
    });
  });