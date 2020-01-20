import React from 'react';
import { IPage } from '../types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@components/Tooltip/Tooltip';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@components/Button/Button';
import Fade from '@material-ui/core/Fade';

interface Props {
  page: IPage;
  onEdit: () => void;
  onDelete: () => void;
  onAdd: () => void;
  hasChanges: boolean;
  onChangesAccept: () => void;
  onChangesDecline: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    marginLeft: theme.spacing(1.5),
    flexShrink: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

function PageLayoutConstructorHeader(props: Props) {
  const classes = useStyles();
  const { page, onEdit, onDelete, onAdd, hasChanges, onChangesAccept, onChangesDecline } = props;

  return (
    <Container maxWidth={false} className={classes.container}>
      <Typography className={classes.title} variant="h6">
        {page.name}
      </Typography>
      <Fade in={hasChanges}>
        <div>
          <Button className={classes.item} variant="contained" color="primary" size="large" onClick={onChangesAccept}>
            Сохранить изменения
          </Button>
          <Button className={classes.item} variant="outlined" color="default" size="large" onClick={onChangesDecline}>
            Отменить изменения
          </Button>
        </div>
      </Fade>
      <Tooltip message="Добавить блок" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Fab className={classes.item} color="primary" size="medium" onClick={onAdd}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Tooltip message="Редактировать страницу" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Fab className={classes.item} color="secondary" size="medium" onClick={onEdit}>
          <SettingsRoundedIcon />
        </Fab>
      </Tooltip>
      <Tooltip message="Удалить страницу" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Fab className={classes.item} color="default" size="medium" onClick={onDelete}>
          <DeleteIcon color="error" fontSize="small" />
        </Fab>
      </Tooltip>
    </Container>
  );
}

export default PageLayoutConstructorHeader;
