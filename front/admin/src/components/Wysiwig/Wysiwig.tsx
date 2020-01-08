import React from 'react';
import 'react-quill/dist/quill.snow.css';
import Preloader from '@components/Preloader/Preloader';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorProps } from 'react-draft-wysiwyg';
import classNames from 'classnames';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
// import {EditorProps} from '@types/react-draft-wysiwyg'

const toolbar = {
  options: ['inline', 'blockType', 'list', 'textAlign', 'image'],
  inline: { inDropdown: true },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4'],
  },
  image: { inDropdown: true, alt: { present: true, mandatory: true } },
};

interface Props {
  addWhitespaceOnTab?: boolean;
  onChange?: (value: string) => any;
  editorSize?: 'medium' | 'large';
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
      paddingLeft: theme.spacing(2) - 2,
      fontFamily: theme.typography.fontFamily,
      maxWidth: '100%',
      overflow: 'hidden',
    },
    'editor--large': {
      minHeight: 250,
    },
    'editor--medium': {
      minHeight: 200,
    },
    editorFocused: {},
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
    wrapperClassname: {
      position: 'relative',
      zIndex: 1,
      padding: 2,
    },
    toolbar: {
      background: 'none',
      borderLeft: 'none',
      borderTop: 'none',
      borderRight: 'none',
    },
  };
});

function Wysiwig(props: Props & Partial<EditorProps>) {
  const { editorSize = 'medium' } = props;
  const classes = useStyles();
  const [isFocused, setIsFocused] = React.useState(false);
  const [editorState, setEditorState] = React.useState<any>(undefined);
  const handleFocus = () => {
    setIsFocused(true);
    if (props.input) {
      props.input.onFocus();
    }
  };
  const handleBlur = () => {
    setIsFocused(false);
    if (props.input) {
      props.input.onBlur();
    }
  };
  const [WysiwigComponent, setWysiwigComponent] = React.useState<IWysiwigElement | null>(null);
  React.useEffect(() => {
    import('react-draft-wysiwyg').then(Module => {
      setWysiwigComponent(Module);
      if (props.input && props.input.value) {
        const contentBlock = htmlToDraft(props.input.value);
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks)));
      }
    });
  }, []);

  const handleChange = (value: any) => {
    const _value = draftToHtml(value);
    if (props.input) {
      props.input.onChange(_value);
    }
  };

  const onEditorStateChange = (state: any) => {
    setEditorState(state);
  };

  // console.log(value);

  return (
    <div
      className={classNames({
        [classes.container]: true,
        // [classes.editorFocused]: isFocused,
      })}
    >
      {WysiwigComponent ? (
        <React.Fragment>
          <div
            className={classNames({
              [classes.border]: true,
              [classes.borderFocused]: isFocused,
            })}
          />
          <WysiwigComponent.Editor
            toolbar={{ ...toolbar, image: { ...toolbar.image } }}
            editorClassName={classNames({
              [classes.editor]: true,
              [classes.editorFocused]: isFocused,
              [(classes as any)[`editor--${editorSize}`]]: true,
            })}
            wrapperClassName={classNames({
              [classes.wrapperClassname]: true,
            })}
            toolbarClassName={classNames({
              [classes.toolbar]: true,
            })}
            editorState={editorState}
            {...props}
            onEditorStateChange={onEditorStateChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </React.Fragment>
      ) : (
        <Preloader position="absolute" />
      )}
    </div>
  );
}

export default Wysiwig;
