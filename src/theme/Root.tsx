import React from 'react';
import type {Props} from '@theme/Root';
import ChatWidget from '../components/ChatWidget';

export default function Root({children}: Props): JSX.Element {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
}
