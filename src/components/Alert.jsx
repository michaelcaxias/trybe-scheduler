import React, { forwardRef } from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={ 6 } ref={ ref } variant="filled" { ...props } />
));

export default Alert;
