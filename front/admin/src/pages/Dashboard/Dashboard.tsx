import React from 'react';
import Header from '@components/Header/Header';
import SideMenu from '@components/SideMenu/SideMenu';
import FlexWrapper from '@components/FlexWrapper/FlexWrapper';
import PagesList from '@pages/Page/components/PagesList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@components/Tooltip/Tooltip';

interface IProps {}

const Dashboard: React.FunctionComponent<IProps> = props => {
  const [showModal, setShowModal] = React.useState<boolean>(true);

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
            footer={
              <Tooltip message="Создать страницу" anchorOrigin={{ vertical: 'center', horizontal: 'right' }}>
                <Fab color="primary" size="small" onClick={openModal}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            }
          >
            <PagesList showCreateModal={showModal} onCreateModalClose={closeModal} />
          </SideMenu>
        }
        content={<div>CONTENT</div>}
      />
    </React.Fragment>
  );
};

export default Dashboard;
