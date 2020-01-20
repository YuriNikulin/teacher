import React from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { Props as IFieldProps } from '@components/Field/Field';
import { WrappedFieldProps } from 'redux-form';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@components/Tooltip/Tooltip';

export interface IProps {
  placeholder?: string;
  accept?: string;
  onFileDrop: (file: File) => any;
  type?: 'document' | 'image';
  value?: string;
  onDelete?: () => any;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      border: `1px dashed rgba(0, 0, 0, 0.23)`,
      borderRadius: theme.shape.borderRadius,
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      minHeight: 90,
      maxHeight: 200,
      display: 'flex',

      '& > *': {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cursor: 'pointer',
      '&:hover': {
        borderColor: theme.palette.primary.main,
      },
    },
    containerDragging: {
      borderColor: theme.palette.primary.main,
    },
    containerFocused: {
      borderColor: theme.palette.primary.main,
      '& > div': {
        outline: 'none',
      },
    },
    containerError: {
      borderColor: theme.palette.error.main,
    },
    delete: {
      marginLeft: theme.spacing(2),
    },
    errorText: {
      marginLeft: theme.spacing(1.75),
      marginTop: theme.spacing(1),
      display: 'block',
    },
  };
});

function FileUploader(props: IProps & IFieldProps & WrappedFieldProps) {
  const classes = useStyles();
  const { placeholder, accept, onFileDrop, input, meta, onDelete, type } = props;
  const value = input && input.value;
  const handleDrop = React.useCallback(([file]: File[]) => {
    onFileDrop(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept,
    onDrop: handleDrop,
    disabled: !!value,
  });
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <React.Fragment>
      <div
        className={classNames({
          [classes.container]: true,
          [classes.containerDragging]: isDragActive,
          [classes.containerFocused]: isFocused,
          [classes.containerError]: meta.error,
        })}
      >
        {!value ? (
          <div {...getRootProps()} onFocus={handleFocus} onBlur={handleBlur}>
            <input {...getInputProps()} />
            <Typography variant="body2">{placeholder || 'Перетащите файл'}</Typography>
          </div>
        ) : (
          <React.Fragment>
            <div>
              {type === 'document' ? (
                <Typography variant="body2">
                  <a target="_blank" href={value}>
                    {value}
                  </a>
                </Typography>
              ) : (
                <a target="_blank" href={value}>
                  <img style={{ maxHeight: 180, maxWidth: '100%', display: 'block' }} src={value} />
                </a>
              )}
              <Tooltip message="Удалить" anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <IconButton
                  className={classNames({
                    [classes.delete]: true,
                  })}
                  onClick={onDelete}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            </div>
          </React.Fragment>
        )}
      </div>
      {!!meta.error && meta.touched && (
        <Typography color="error" variant="caption" className={classes.errorText}>
          {meta.error}
        </Typography>
      )}
    </React.Fragment>
  );
}

export default FileUploader;
