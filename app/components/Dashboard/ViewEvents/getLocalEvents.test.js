import React from 'react';
import getEvents  from './getLocalEvents.js';

import renderer from 'react-test-renderer';

describe('getEvents  component', function() {
    it('renders a SignupCompont ', function() {
      const tree = renderer.create(
        <getEvents />
        ).toJSON();
    expect(tree).toMatchSnapshot();
    });
  });