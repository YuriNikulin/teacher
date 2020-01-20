import React from 'react';
import Header from '@components/Header/Header';
import SideMenu from '@components/SideMenu/SideMenu';
import FlexWrapper from '@components/FlexWrapper/FlexWrapper';
import PagesList from '@pages/Page/components/PagesList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@components/Tooltip/Tooltip';
import PagesLayoutConstructor from './components/PagesLayoutConstructor';
import { routes } from '@constants/routes';
import { onePageSelector } from './redux/selectors';
import { connect } from 'react-redux';
import { IStore } from '@store/reducer';
import { IPage } from './types';

interface IProps {
  activePageId: number;
  activePage?: IPage;
}

const Page: React.FunctionComponent<IProps> = props => {
  const { activePageId, activePage } = props;
  const [showModal, setShowModal] = React.useState<boolean>(false);
  React.useEffect(() => {
    document.title = routes.page.title(activePage ? activePage.name : '');
  }, [activePage]);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <FlexWrapper
        header={<Header />}
        sidemenu={
          <SideMenu
            title="Список страниц"
            footer={
              <Tooltip message="Создать страницу" anchorOrigin={{ vertical: 'center', horizontal: 'right' }}>
                <Fab color="primary" size="small" onClick={openModal}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            }
          >
            <PagesList showCreateModal={showModal} onCreateModalClose={closeModal} activePage={activePageId} />
          </SideMenu>
        }
        content={<PagesLayoutConstructor activePageId={activePageId} />}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: IStore, ownProps: IProps) => {
  return {
    activePage: onePageSelector(state, ownProps.activePageId),
  };
};

export default connect(mapStateToProps, null)(Page);
