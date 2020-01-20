import React from 'react';
import { ILayout, IBlock, IPage } from '../types';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@components/Button/Button';

import Draggable, { OnDragEndParams } from '@components/Draggable/Draggable';

import Block from './Block';

interface Props {
  blocks: ILayout;
  onBlockAddClick: () => void;
  onBlockDelete: (id: IBlock['id'], value: boolean) => void;
  onBlockChange: (values: IBlock) => any;
  onBlockChangeCancel: (id: IBlock['id']) => any;
  onLayoutChange: (result: OnDragEndParams) => any;
  pageId?: IPage['id'];
  // onBlockHide: (id: IBlock['id'], value: boolean) => any;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: 500,
    marginTop: theme.spacing(4),
  },
  block: {
    flexGrow: 1,
    paddingBottom: theme.spacing(2),
  },
  blockContent: {
    backgroundColor: '#fff',
    boxShadow: theme.shadows[1],
    position: 'relative',

    '&:hover': {
      boxShadow: theme.shadows[3],
      '& .toolbar': {
        display: 'flex',
      },
    },
  },
  blockDeleted: {
    background: 'rgba(255, 255, 255, .6)',
    '& > *:not(.toolbar)': {
      opacity: 0.3,
    },
    '& .toolbar': {
      display: 'flex',
    },
  },
  blockHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
  },
  blockHeaderDeleted: {},
  blockHeaderNew: {
    background: '#B4F9BB',
  },
  blockHeaderTouched: {
    backgroundColor: theme.palette.primary.light,
    '& *': {
      color: theme.palette.primary.contrastText,
    },
  },
  blockDragging: {
    boxShadow: theme.shadows[11],
    '& .toolbar': {
      display: 'flex',
    },
  },
  blockHidden: {
    background: theme.palette.grey[300],
    '& > *': {
      opacity: 0.6,
    },
    '& .toolbar': {
      display: 'flex',
    },
  },
  blockBody: {
    height: 150,
    overflow: 'hidden',
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
  },
  blockBodyDeleted: {
    opacity: 0.2,
  },
  blockToolbar: {
    display: 'none',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    boxShadow: theme.shadows[2],
    background: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(0.5),
    boxSizing: 'border-box',
    height: 52,
  },
  newBlockButton: {
    borderStyle: 'dashed',
  },
  list: {
    minHeight: 100,
    position: 'relative',
  },
}));

function PagesLayoutConstructorBody(props: Props) {
  const classes = useStyles();
  const { blocks, onBlockAddClick, onBlockDelete, onBlockChange, onBlockChangeCancel, onLayoutChange, pageId } = props;
  const [activeEditedBlock, setActiveEditedBlock] = React.useState<IBlock | null>(null);

  const handleBlockChange = (values: IBlock) => {
    setActiveEditedBlock(null);
    onBlockChange(values);
  };

  const handleBlockHide = (id: IBlock['id'], value: boolean | undefined) => {
    const block = blocks.find(block => block.id === id);
    if (!block) return;
    onBlockChange({ ...block, is_hidden: value });
  };

  return (
    <Container className={classes.container}>
      <div className={classes.list}>
        <Draggable onDragEnd={onLayoutChange}>
          {blocks.map((block: IBlock) => {
            return (
              <Block
                handleBlockChange={handleBlockChange}
                handleBlockHide={handleBlockHide}
                activeEditedBlock={activeEditedBlock}
                onBlockDelete={onBlockDelete}
                pageId={pageId}
                key={block.id}
                onBlockChangeCancel={onBlockChangeCancel}
                setActiveEditedBlock={setActiveEditedBlock}
                {...block}
              />
            );
          })}
        </Draggable>
      </div>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        fullWidth
        className={classes.newBlockButton}
        onClick={onBlockAddClick}
      >
        Добавить блок
      </Button>
    </Container>
  );
}

export default PagesLayoutConstructorBody;
