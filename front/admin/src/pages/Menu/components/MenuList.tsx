import React from 'react';
import { connect } from 'react-redux';
import { IStore } from '@store/reducer';
import List from '@components/List/List';
import Preloader from '@components/Preloader/Preloader';
import DeleteIcon from '@material-ui/icons/Delete';
import { IMenu } from '../types';
import { routes } from '@constants/routes';
import { navigate } from 'hookrouter';
import Typography from '@material-ui/core/Typography';
import Confirmation from '@components/Confirmation/Confirmation';
import { deleteMenuRequest } from '../redux/actions';

interface Props {
  isLoading: boolean;
  items: IMenu[];
  activeMenuId?: string;
  onSelect?: Function;
  deleteMenuRequest: Function;
}

function MenuList(props: Props): any {
  const { items, isLoading, activeMenuId, deleteMenuRequest } = props;
  if (isLoading) {
    return <Preloader position="absolute" />;
  }

  const handleDelete = (menu: IMenu) => {
    Confirmation.getConfirmation({
      message: (
        <Typography>
          Вы действительно хотите удалить пункт меню
          <Typography color="primary" component="span">
            {` ${menu.title}?`}&nbsp;
          </Typography>
        </Typography>
      ),
      title: 'Удаление страницы',
      acceptText: 'Удалить',
      rejectText: 'Не удалять',
    })
      .then(() => {
        deleteMenuRequest(menu.id);
      })
      .catch(() => {});
  };

  return (
    <React.Fragment>
      <List
        items={items.map((menu: IMenu) => {
          return {
            title: menu.title,
            description: menu.url,
            selected: !!activeMenuId && activeMenuId === menu.id,
            onClick: () => {
              navigate(routes.menu.getPath(menu.id));
              props.onSelect && props.onSelect();
            },
            buttons: [
              {
                component: <DeleteIcon color="error" fontSize="small" />,
                description: 'Удалить',
                onClick: () => handleDelete(menu),
              },
            ],
          };
        })}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (store: IStore) => {
  return {
    // pages: pagesSelector(store),
    // isLoading: isLoadingSelector(store),
    // isFormLoading: isFormLoadingSelector(store),
    // error: errorSelector(store),
  };
};

const mapDispatchToProps = {
  deleteMenuRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
