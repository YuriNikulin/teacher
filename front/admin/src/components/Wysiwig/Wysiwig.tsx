import React from 'react';
import 'react-quill/dist/quill.snow.css';
import Preloader from '@components/Preloader/Preloader';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorProps } from 'react-draft-wysiwyg';
import { BaseFieldProps, CommonFieldProps } from 'redux-form';
import classNames from 'classnames';
import { RawDraftContentState } from 'draft-js';
// import {EditorProps} from '@types/react-draft-wysiwyg'

const toolbar = {
  options: ['inline', 'blockType', 'list', 'textAlign', 'image'],
  inline: { inDropdown: true },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: true },
  blockType: {
    options: ['Normal', 'H1', 'H2', 'H3', 'H4'],
  },
  image: { alt: { present: true, mandatory: true } },
};

interface Props extends Partial<EditorProps> {
  addWhitespaceOnTab?: boolean;
  [key: string]: any;
}

interface IWysiwigElement {
  Editor: React.ElementType<EditorProps>;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      position: 'relative',
    },
    editor: {
      maxWidth: 535,
      paddingLeft: theme.spacing(2),
      fontFamily: theme.typography.fontFamily,
    },
    editorFocused: {
      // outline: `2px solid ${theme.palette.primary.dark}`,
      // borderWidth: '2px',
      // borderColor: theme.palette.primary.dark,
    },
    border: {
      border: `1px solid`,
      borderColor: 'rgba(0, 0, 0, 0.23)',
      borderRadius: theme.shape.borderRadius,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      transition: 'border-color .2s ease-in-out',
    },
    borderFocused: {
      borderWidth: 2,
      borderColor: theme.palette.primary.dark,
    },
  };
});

function Wysiwig(props: Props) {
  const classes = useStyles();
  const [isFocused, setIsFocused] = React.useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const [WysiwigComponent, setWysiwigComponent] = React.useState<IWysiwigElement | null>(null);
  React.useEffect(() => {
    import('react-draft-wysiwyg').then(Module => {
      setWysiwigComponent(Module);
    });
  }, []);

  return (
    <div
      className={classNames({
        [classes.container]: true,
        // [classes.editorFocused]: isFocused,
      })}
    >
      {WysiwigComponent ? (
        <React.Fragment>
          <WysiwigComponent.Editor
            toolbar={{ ...toolbar, image: { ...toolbar.image } }}
            editorClassName={classNames({
              [classes.editor]: true,
              [classes.editorFocused]: isFocused,
            })}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={value => {
              console.log(value);
            }}
          />
          <div
            className={classNames({
              [classes.border]: true,
              [classes.borderFocused]: isFocused,
            })}
          />
        </React.Fragment>
      ) : (
        <Preloader position="absolute" />
      )}
    </div>
  );
}

export default Wysiwig;
