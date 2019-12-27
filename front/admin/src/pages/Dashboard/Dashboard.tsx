import React from 'react';
import Header from '@components/Header/Header';
import SideMenu from '@components/SideMenu/SideMenu';
import FlexWrapper from '@components/FlexWrapper/FlexWrapper';
import PagesList from '@pages/PagesList/PagesList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@components/Tooltip/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PagesForm from '@pages/PagesList/components/PagesForm';

interface IProps {}

const Dashboard: React.FunctionComponent<IProps> = props => {
  const [showModal, setShowModal] = React.useState<boolean>(true);

  const handleAddPageClick = () => {
    setShowModal(true);
  };
  return (
    <React.Fragment>
      <FlexWrapper
        header={<Header />}
        sidemenu={
          <SideMenu
            footer={
              <Tooltip message="Создать страницу" anchorOrigin={{ vertical: 'center', horizontal: 'right' }}>
                <Fab color="primary" size="small" onClick={handleAddPageClick}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            }
          >
            <PagesList />
          </SideMenu>
        }
        content={<div>CONTENT</div>}
      />
      {showModal && (
        <Dialog open maxWidth="sm" fullWidth>
          <DialogTitle>Создать страницу</DialogTitle>
          <DialogContent>
            <PagesForm />
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
