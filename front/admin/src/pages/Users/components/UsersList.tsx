import React from 'react';
import { connect } from 'react-redux';
import { IStore } from '@store/reducer';
import { getUsersRequest, deleteUserRequest } from '../redux/actions';
import { isLoadingSelector, usersSelector } from '../redux/selectors';
import { IUsersReducer } from '../types';
import Preloader from '@components/Preloader/Preloader';
import List from '@components/List/List';
import { IUser } from '@pages/Auth/types';
import { navigate } from 'hookrouter';
import { routes } from '@constants/routes';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirmation from '@components/Confirmation/Confirmation';
import Typography from '@material-ui/core/Typography';

interface Props {
  getUsersRequest: Function;
  users: IUsersReducer['users'];
  isLoading: IUsersReducer['isLoading'];
  onUserSelect?: Function;
  deleteUserRequest: Function;
  activeUserLogin?: string;
}

function UsersList(props: Props): any {
  const { getUsersRequest, isLoading, users, onUserSelect, deleteUserRequest, activeUserLogin } = props;

  React.useEffect(() => {
    if (!users || !users.length) {
      getUsersRequest();
    }
  }, []);

  if (isLoading) {
    return <Preloader position="absolute" />;
  }

  const handleDelete = (login: IUser['login']) => {
    Confirmation.getConfirmation({
      message: (
        <Typography>
          Вы действительно хотите удалить пользователя
          <Typography color="primary" component="span">
            {` ${login}?`}&nbsp;
          </Typography>
        </Typography>
      ),
      title: 'Удаление страницы',
      acceptText: 'Удалить',
      rejectText: 'Не удалять',
    })
      .then(() => {
        deleteUserRequest(login);
      })
      .catch(() => {});
  };

  const handleUserSelect = (user: IUser) => {
    navigate((routes.user as any).getPath(user.login));
    onUserSelect && onUserSelect(user);
  };

  return (
    <React.Fragment>
      <List
        items={users.map((user: IUser) => {
          return {
            title: user.login,
            selected: !!activeUserLogin && activeUserLogin === user.login,
            onClick: () => handleUserSelect(user),
            buttons: [
              {
                component: <DeleteIcon color="error" fontSize="small" />,
                description: 'Удалить',
                onClick: () => handleDelete(user.login),
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
    users: usersSelector(store),
    isLoading: isLoadingSelector(store),
  };
};

const mapDispatchToProps = {
  getUsersRequest,
  deleteUserRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
