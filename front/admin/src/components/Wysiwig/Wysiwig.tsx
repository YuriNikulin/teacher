import React from 'react';
import 'react-quill/dist/quill.snow.css';
import Preloader from '@components/Preloader/Preloader';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ReactQuillImageUploader, { saveImageSrc } from 'react-quill-image-uploader';

interface Props {}

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      position: 'relative',
      maxWidth: '100%',

      '& .quill': {
        height: 300,
      },
    },
  };
});

function Wysiwig(props: Props) {
  const classes = useStyles();
  const {} = props;
  const [ReactQuill, setReactQuill] = React.useState<any>(null);
  React.useEffect(() => {
    import('react-quill').then(Module => {
      setReactQuill(React.createFactory(Module.default));
    });
  }, []);

  const Component = ReactQuill
    ? React.cloneElement(ReactQuill, {
        modules: {},
      })
    : null;
  return (
    <div className={classes.container}>{Component ? <div>{Component}</div> : <Preloader position="absolute" />}</div>
  );
}

export default Wysiwig;
