import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import IconButton from 'material-ui/core/IconButton';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@components/Tooltip/Tooltip';

interface Button {
  component: React.ReactElement;
  description?: string;
  onClick?: () => any;
}

interface Item {
  title: string;
  description?: string;
  buttons?: Button[];
  id?: string | number;
  onClick?: () => any;
  selected?: boolean;
}

interface Props {
  items: Item[];
}

function _List(props: Props) {
  const { items } = props;

  if (!items.length) {
    return <Typography>Ничего не найдено.</Typography>;
  }

  return (
    <React.Fragment>
      <List>
        {items.map((item: Item, index) => {
          const { id, title, description, buttons, onClick } = item;
          return (
            <ListItem button dense key={id || index} onClick={onClick} selected={item.selected}>
              <ListItemText primary={title} secondary={description}></ListItemText>
              {buttons && (
                <ListItemSecondaryAction key={index}>
                  {buttons.map((item: Button, index) => {
                    const _button = (
                      <IconButton size="small" key={index} onClick={item.onClick ? item.onClick : undefined}>
                        {item.component}
                      </IconButton>
                    );
                    return item.description ? (
                      <Tooltip
                        key={index}
                        message={item.description}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                      >
                        {_button}
                      </Tooltip>
                    ) : (
                      { _button }
                    );
                  })}
                </ListItemSecondaryAction>
              )}
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
}

export default _List;
