import React from 'react';
import { connect } from 'react-redux';
import { getPagesListRequest, createPageRequest, deletePageRequest, editPageRequest } from '../redux/actions';
import { IStore } from '@store/reducer';
import { pagesSelector, isLoadingSelector, isFormLoadingSelector, errorSelector } from '../redux/selectors';
import { IPage } from '../types';
import Preloader from '@components/Preloader/Preloader';
import List from '@components/List/List';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@components/Dialog/Dialog';
import PagesForm from '@pages/Page/components/PagesForm';
import { IPageReducer } from '../types';
import Confirmation from '@components/Confirmation/Confirmation';
import { Typography } from '@material-ui/core';

interface Props {
  getPagesListRequest: Function;
  createPageRequest: Function;
  deletePageRequest: Function;
  editPageRequest: Function;
  pages: IPageReducer['pages'];
  isLoading: IPageReducer['isLoading'];
  showCreateModal?: boolean;
  onCreateModalClose: () => any;
  isFormLoading: IPageReducer['isFormLoading'];
  error?: IPageReducer['error'];
}

function PagesList(props: Props) {
  const {
    getPagesListRequest,
    pages,
    isLoading,
    showCreateModal,
    onCreateModalClose,
    createPageRequest,
    isFormLoading,
    error,
    deletePageRequest,
    editPageRequest,
  } = props;
  const [activeEditedModal, setActiveEditedModal] = React.useState<IPage | null>(null);
  React.useEffect(() => {
    getPagesListRequest();
  }, []);

  React.useEffect(() => {
    if (!isFormLoading && !error) {
      if (showCreateModal) {
        onCreateModalClose();
      }

      setActiveEditedModal(null);
    }
  }, [isFormLoading]);

  const handleCreate = (values: any) => {
    createPageRequest(values);
  };

  const handleEdit = (values: any) => {
    editPageRequest(values);
  };

  const handleDelete = (page: IPage) => {
    Confirmation.getConfirmation({
      message: (
        <Typography>
          Вы действительно хотите удалить страницу{' '}
          <Typography color="primary" component="span">
            {`${page.name}`}&nbsp;
          </Typography>
          (
          <Typography component="span" variant="body2" color="textSecondary">
            {page.url}
          </Typography>
          ) ?
        </Typography>
      ),
      title: 'Удаление страницы',
      acceptText: 'Удалить',
      rejectText: 'Не удалять',
    })
      .then(() => {
        deletePageRequest(page.id);
      })
      .catch(() => {});
  };

  const handleEditClick = (page: IPage) => setActiveEditedModal(page);

  if (isLoading) {
    return <Preloader position="absolute" />;
  }

  return (
    <React.Fragment>
      <List
        items={pages.map((page: IPage) => {
          return {
            title: page.name,
            description: page.url,
            buttons: [
              {
                component: <SettingsRoundedIcon fontSize="small" />,
                description: 'Редактировать',
                onClick: () => handleEditClick(page),
              },
              {
                component: <DeleteIcon color="error" fontSize="small" />,
                description: 'Удалить',
                onClick: () => handleDelete(page),
              },
            ],
          };
        })}
      />
      {showCreateModal && (
        <Dialog title="Создать страницу" open maxWidth="sm" fullWidth showCloseIcon onClose={onCreateModalClose}>
          <PagesForm onSubmit={handleCreate} submitText="Создать" />
        </Dialog>
      )}
      {!!activeEditedModal && (
        <Dialog
          title="Редактировать страницу"
          open
          maxWidth="sm"
          fullWidth
          showCloseIcon
          onClose={() => setActiveEditedModal(null)}
        >
          <PagesForm onSubmit={handleEdit} submitText="Сохранить" initialValues={activeEditedModal} />
        </Dialog>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (store: IStore) => {
  return {
    pages: pagesSelector(store),
    isLoading: isLoadingSelector(store),
    isFormLoading: isFormLoadingSelector(store),
    error: errorSelector(store),
  };
};

const mapDispatchToProps = {
  getPagesListRequest,
  createPageRequest,
  deletePageRequest,
  editPageRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(PagesList);
