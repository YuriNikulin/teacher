import React from 'react';
import { connect } from 'react-redux';
import { getPagesListRequest } from '../redux/actions';
import { IStore } from '@store/reducer';
import { pagesSelector, isLoadingSelector } from '../redux/selectors';
import { IPage } from '../types';
import Preloader from '@components/Preloader/Preloader';
import List from '@components/List/List';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@components/Dialog/Dialog';
import PagesForm from '@pages/Page/components/PagesForm';

interface Props {
  getPagesListRequest: Function;
  pages: Array<IPage>;
  isLoading: boolean;
  showCreateModal?: boolean;
  onCreateModalClose?: () => any;
}

function PagesList(props: Props) {
  const { getPagesListRequest, pages, isLoading, showCreateModal, onCreateModalClose } = props;
  React.useEffect(() => {
    getPagesListRequest();
  }, []);

  const handleSubmit = (values: any) => {
    console.log(values);
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
          <PagesForm onSubmit={handleSubmit} />
        </Dialog>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (store: IStore) => {
  return {
    pages: pagesSelector(store),
    isLoading: isLoadingSelector(store),
  };
};

const mapDispatchToProps = {
  getPagesListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(PagesList);
