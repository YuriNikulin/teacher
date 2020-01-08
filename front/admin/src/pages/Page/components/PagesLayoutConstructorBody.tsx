import React from 'react';
import { ILayout, IBlock } from '../types';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@components/Button/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@components/Tooltip/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@components/Dialog/Dialog';
import BlockForm from './BlockForm';
import ReplayIcon from '@material-ui/icons/Replay';
import Draggable, { OnDragEndParams } from '@components/Draggable/Draggable';

interface Props {
  blocks: ILayout;
  onBlockAddClick: () => void;
  onBlockDelete: (id: IBlock['id'], value: boolean) => void;
  onBlockChange: (values: IBlock) => any;
  onBlockChangeCancel: (id: IBlock['id']) => any;
  onLayoutChange: (result: OnDragEndParams) => any;
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
  const { blocks, onBlockAddClick, onBlockDelete, onBlockChange, onBlockChangeCancel, onLayoutChange } = props;
  const [activeEditedBlock, setActiveEditedBlock] = React.useState<IBlock | null>(null);
  // console.log(blocks);
  const foo = [1, 2, 3];
  // console.log(foo);

  const handleBlockChange = (values: IBlock) => {
    setActiveEditedBlock(null);
    onBlockChange(values);
  };

  const handleBlockHide = (id: IBlock['id'], value: boolean | undefined) => {
    const block = blocks.find(block => block.id === id);
    if (!block) return;
    onBlockChange({ ...block, is_hidden: value });
  };

  const Block = (props: IBlock & { isDragging?: boolean }) => {
    const { name, id, layout, isDeleted, isNew, isTouched, isDragging, is_hidden } = props;

    const displayName = name || 'Безымянный блок';
    return (
      <React.Fragment>
        <div
          className={classNames({
            [classes.block]: true,
          })}
        >
          <div
            className={classNames({
              [classes.blockContent]: true,
              [classes.blockDeleted]: isDeleted,
              [classes.blockDragging]: isDragging,
              [classes.blockHidden]: is_hidden,
            })}
          >
            <div
              className={classNames({
                [classes.blockHeader]: true,
                [classes.blockHeaderDeleted]: isDeleted,
                [classes.blockHeaderTouched]: isTouched && !is_hidden,
                [classes.blockHeaderNew]: isNew,
              })}
            >
              <Typography>{displayName}</Typography>
              <Typography variant="body2" color="textSecondary">
                {id}
              </Typography>
            </div>
            <div
              className={classNames({
                [classes.blockBody]: true,
                [classes.blockBodyDeleted]: isDeleted,
              })}
            >
              <div dangerouslySetInnerHTML={{ __html: layout }} />
            </div>
            <div
              className={classNames({
                [classes.blockToolbar]: true,
                toolbar: true,
              })}
            >
              {!isDeleted ? (
                <React.Fragment>
                  <Tooltip message="Удалить блок" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <IconButton onClick={() => onBlockDelete(id, true)}>
                      <DeleteIcon color="error" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip message="Редактировать блок" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <IconButton onClick={() => setActiveEditedBlock(props)}>
                      <SettingsRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    message={is_hidden ? 'Показывать блок' : 'Скрывать блок'}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  >
                    <IconButton onClick={() => handleBlockHide(id, !is_hidden)}>
                      {!is_hidden ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>

                  {isTouched && !is_hidden && (
                    <Tooltip message="Отменить изменения" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                      <IconButton onClick={() => onBlockChangeCancel(id)}>
                        <ReplayIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography variant="body2">Этот блок будет удалён.</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ marginLeft: 8 }}
                    onClick={() => onBlockDelete(id, false)}
                  >
                    Отменить
                  </Button>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        {!!activeEditedBlock && (
          <Dialog
            title="Редактировать блок"
            open
            maxWidth="md"
            fullWidth
            showCloseIcon
            onClose={() => setActiveEditedBlock(null)}
          >
            <BlockForm onSubmit={handleBlockChange} submitText="Сохранить" initialValues={activeEditedBlock} />
          </Dialog>
        )}
      </React.Fragment>
    );
  };
  return (
    <Container className={classes.container}>
      <div className={classes.list}>
        <Draggable onDragEnd={onLayoutChange}>
          {blocks.map((block: IBlock) => {
            return <Block key={block.id} {...block} />;
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