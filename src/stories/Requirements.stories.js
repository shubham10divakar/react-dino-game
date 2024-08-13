import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import './styles.css';
import { Dino } from '../components/Dino';

const stories = storiesOf('App Test', module);

stories.add('App', () => {


  return (
    <div>
        <Dino />
    </div>
  );
});
