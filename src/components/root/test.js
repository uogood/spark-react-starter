import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { assert, expect } from 'chai';
import rootComponent from './';

const shallowRenderer = TestUtils.createRenderer();
shallowRenderer.render( React.createElement( rootComponent ) );
const root = shallowRenderer.getRenderOutput();

describe( 'rootComponent', () => {
  it( 'can be rendered', () => {
    assert( root );
    expect( root.props.children ).to.be.a( 'object' );
  } );
} );
