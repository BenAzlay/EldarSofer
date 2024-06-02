import * as React from 'react';

export const EmailTemplate = ({
  content,
  name,
  fromEmail,
}) => (
  <div>
    <p>You received a message from: {name}</p>
    <p>Email: {fromEmail}</p>
    <p>{content}</p>
  </div>
);
