import React from 'react';
import Header from '@components/Header/Header';
import SideMenu from '@components/SideMenu/SideMenu';
import FlexWrapper from '@components/FlexWrapper/FlexWrapper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@components/Tooltip/Tooltip';
import { routes } from '@constants/routes';
import { connect } from 'react-redux';
import { IStore } from '@store/reducer';
import { menusSelector, isLoadingSelector, oneMenuSelector } from './redux/selectors';
import MenuList from './components/MenuList';
import { getMenusListRequest, addMenuRequest, changeMenuRequest } from './redux/actions';
import { IMenu } from './types';
import MenuForm from './components/MenuForm';
import Container from '@material-ui/core/Container';
import { isFormLoadingSelector } from '@pages/Menu/redux/selectors';

interface IProps {
  menus: IMenu[];
  isLoading: boolean;
  isFormLoading: boolean;
  getMenusListRequest: Function;
  addMenuRequest: Function;
  activeMenuId?: string;
  activeMenu?: IMenu;
  changeMenuRequest: Function;
}

const Menu: React.FunctionComponent<IProps> = props => {
  const [isCreate, setIsCreate] = React.useState(false);
  React.useEffect(() => {
    document.title = routes.menu.title();
    if (!props.menus || !props.menus.length) {
      props.getMenusListRequest();
    }
  }, []);

  const handleCreate = (values: IMenu) => {
    props.addMenuRequest({ ...values, order: values.order || undefined });
  };

  const handleEdit = (values: IMenu) => {
    props.changeMenuRequest({ ...values, order: values.order || undefined });
  };

  const switchMode = () => {
    setIsCreate(true);
  };

  const handleMenuSelect = () => {
    setIsCreate(false);
  };

  return (
    <React.Fragment>
      <FlexWrapper
        header={<Header />}
        sidemenu={
          <SideMenu
            title="Список пунктов меню"
            footer={
              <Tooltip message="Создать пункт меню" anchorOrigin={{ vertical: 'center', horizontal: 'right' }}>
                <Fab color="primary" size="small" onClick={switchMode}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            }
          >
            <MenuList
              items={props.menus}
              onSelect={handleMenuSelect}
              isLoading={props.isLoading}
              activeMenuId={!isCreate && props.activeMenuId}
            />
          </SideMenu>
        }
        content={
          <Container>
            {(isCreate || props.activeMenu) && (
              <MenuForm
                initialValues={isCreate ? null : props.activeMenu}
                title={isCreate ? 'Создание пункта меню' : props.activeMenu?.title}
                onSubmit={isCreate ? handleCreate : handleEdit}
                isLoading={props.isFormLoading}
                submitText={isCreate ? 'Сохранить' : 'Изменить'}
              />
            )}
          </Container>
        }
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: IStore, ownProps: IProps) => {
  return {
    menus: menusSelector(state),
    isLoading: isLoadingSelector(state),
    isFormLoading: isFormLoadingSelector(state),
    activeMenu: ownProps.activeMenuId ? oneMenuSelector(state, ownProps.activeMenuId) : null,
  };
};

const mapDispatchToProps = {
  getMenusListRequest,
  addMenuRequest,
  changeMenuRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
