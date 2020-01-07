import React from 'react';
import Header from '@components/Header/Header';
import SideMenu from '@components/SideMenu/SideMenu';
import FlexWrapper from '@components/FlexWrapper/FlexWrapper';
import PagesList from '@pages/Page/components/PagesList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@components/Tooltip/Tooltip';
import PagesLayoutConstructor from './components/PagesLayoutConstructor';

interface IProps {
  activePage: number;
}

const Page: React.FunctionComponent<IProps> = props => {
  const { activePage } = props;
  const [showModal, setShowModal] = React.useState<boolean>(false);
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
            <PagesList showCreateModal={showModal} onCreateModalClose={closeModal} activePage={activePage} />
          </SideMenu>
        }
        content={<PagesLayoutConstructor activePageId={activePage} />}
      />
    </React.Fragment>
  );
};

export default Page;
