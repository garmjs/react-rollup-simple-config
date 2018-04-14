import React from 'react';

import { storiesOf } from '@storybook/react';

import SampleComponent from '../src';

storiesOf('SampleComponent', module)
  .add('Button', () => (
    <SampleComponent />
  ));
