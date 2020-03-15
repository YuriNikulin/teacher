import React from 'react';
import { Field, BaseFieldProps } from 'redux-form';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import { EditorProps } from 'react-draft-wysiwyg';
import { IProps as IFileUploadProps } from '@components/FileUploader/FileUploader';

export interface Props {
  customLabel?: string | React.ReactElement;
  error?: boolean | string;
  [key: string]: any;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    customLabel: {
      marginBottom: theme.spacing(1),
    },
  };
});

function CustomField(
  props:
    | (BaseFieldProps & Props)
    | (BaseFieldProps & EditorProps & Props)
    | (IFileUploadProps & Props & Pick<BaseFieldProps, 'name'>)
    | any,
) {
  const classes = useStyles();
  const { customLabel, ...rest } = props;

  return (
    <React.Fragment>
      {customLabel && <Typography className={classes.customLabel}>{customLabel}</Typography>}
      <Field {...rest} />
    </React.Fragment>
  );
}

export default CustomField;
