import React from 'react';
import Header from '@components/Header/Header';
import SideMenu from '@components/SideMenu/SideMenu';
import FlexWrapper from '@components/FlexWrapper/FlexWrapper';
import UsersList from './components/UsersList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { reset } from 'redux-form';
import Tooltip from '@components/Tooltip/Tooltip';
import { routes } from '@constants/routes';
import { IUser } from '@pages/Auth/types';
import UserForm from './components/UserForm';
import { connect } from 'react-redux';
import { IStore } from '@store/reducer';
import { oneUserSelector, usersSelector } from './redux/selectors';
import { userSelector } from '@pages/Auth/redux/selectors';
import { changeUserRequest, createUserRequest } from './redux/actions';
import Container from '@material-ui/core/Container';
import { navigate } from 'hookrouter';

interface IProps {
  activeUserLogin?: IUser['login'];
  activeUser?: IUser | null;
  currentUser: IUser;
  changeUserRequest: Function;
  createUserRequest: Function;
  users: IStore['user']['users'];
  reset: Function;
}

const Users: React.FunctionComponent<IProps> = props => {
  const { activeUserLogin, activeUser, currentUser, changeUserRequest, createUserRequest, users, reset } = props;
  const [isCreateMode, setIsCreateMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.title = routes.users.title();
  }, []);

  React.useEffect(() => {
    setIsCreateMode(false);
  }, [activeUserLogin]);

  const switchToCreateMode = () => {
    setIsCreateMode(true);
  };

  const handleEdit = (values: IUser) => {
    changeUserRequest({
      login: activeUserLogin,
      newData: values,
    });
  };

  const handleCreate = (values: IUser) => {
    createUserRequest(values);
  };

  const handleUserSelect = () => {
    setIsCreateMode(false);
  };

  return (
    <React.Fragment>
      <FlexWrapper
        header={<Header />}
        sidemenu={
          currentUser.is_admin ? (
            <SideMenu
              title="Список пользователей"
              footer={
                <Tooltip message="Создать пользователя" anchorOrigin={{ vertical: 'center', horizontal: 'right' }}>
                  <Fab color="primary" size="small" onClick={switchToCreateMode}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
              }
            >
              <UsersList
                showCreateModal={() => setIsCreateMode(true)}
                onCreateModalClose={() => setIsCreateMode(false)}
                onUserSelect={handleUserSelect}
                activeUserLogin={!isCreateMode && activeUserLogin}
              />
            </SideMenu>
          ) : (
            <span />
          )
        }
        content={
          activeUserLogin || isCreateMode ? (
            <Container>
              <UserForm
                onSubmit={isCreateMode ? handleCreate : handleEdit}
                initialValues={activeUser && !isCreateMode ? activeUser : null}
                isAdmin={currentUser.is_admin}
                login={!isCreateMode ? activeUserLogin : 'Создание пользователя'}
                mode={isCreateMode ? 'create' : 'edit'}
              />
            </Container>
          ) : (
            undefined
          )
        }
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: IStore, ownProps: IProps) => {
  return {
    activeUser: ownProps.activeUserLogin ? oneUserSelector(state, ownProps.activeUserLogin) : null,
    currentUser: userSelector(state),
    users: usersSelector(state),
  };
};

const mapDispatchToProps = {
  changeUserRequest,
  createUserRequest,
  reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
