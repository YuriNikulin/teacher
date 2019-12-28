import React from 'react';
import { connect } from 'react-redux';
import { getPagesListRequest, createPageRequest } from '../redux/actions';
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

interface Props {
  getPagesListRequest: Function;
  createPageRequest: Function;
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
  } = props;
  React.useEffect(() => {
    getPagesListRequest();
  }, []);

  React.useEffect(() => {
    if (!isFormLoading && !error) {
      if (showCreateModal) {
        onCreateModalClose();
      }
    }
  }, [isFormLoading]);

  const handleCreate = (values: any) => {
    createPageRequest(values);
  };

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
              { component: <SettingsRoundedIcon fontSize="small" />, description: 'Редактировать' },
              { component: <DeleteIcon color="error" fontSize="small" />, description: 'Удалить' },
            ],
          };
        })}
      />
      {showCreateModal && (
        <Dialog title="Создать страницу" open maxWidth="sm" fullWidth showCloseIcon onClose={onCreateModalClose}>
          <PagesForm onSubmit={handleCreate} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(PagesList);
