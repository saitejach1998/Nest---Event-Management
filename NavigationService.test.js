import React from 'react';
import navigate from './NavigationService.js';
import renderer from 'react-test-renderer';

describe('navigatePostEvents', function() {
    it('renders a Post event component ', function() {
      const tree = renderer.create(
        <navigate />
        ).toJSON();
    expect(tree).toMatchSnapshot();
    });
  });