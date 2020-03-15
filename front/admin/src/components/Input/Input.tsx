import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const Input: React.FunctionComponent<
  (WrappedFieldProps & TextFieldProps & { onFileDrop?: any; onDelete?: any }) | any
> = props => {
  const { input, meta, error, onFileDrop, onDelete, ...rest } = props;

  return (
    <TextField
      {...rest}
      {...input}
      error={!!(meta.error || error) && meta.touched}
      helperText={meta.touched ? meta.error || error : undefined}
    />
  );
};

export default Input;
