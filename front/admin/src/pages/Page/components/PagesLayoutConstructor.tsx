import React from 'react';
import { connect } from 'react-redux';
import { onePageSelector, isFormLoadingSelector, oneDraftSelector } from '../redux/selectors';
import { IStore } from '@store/reducer';
import { IPage, ILayout, IBlock } from '../types';
import { getPageRequest, changeDraft, deleteDraft } from '../redux/actions';
import api, { IResponse } from '@helpers/api';
import { onePageActionApiUrl, changePageLayoutApiUrl } from '../redux/saga';
import Preloader from '@components/Preloader/Preloader';
import PageLayoutConstructorHeader from './PageLayoutConstructorHeader';
import PagesLayoutConstructorBody from './PagesLayoutConstructorBody';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PagesList from './PagesList';
import Dialog from '@components/Dialog/Dialog';
import { isLoadingSelector } from '@pages/Page/redux/selectors';
import BlockForm from './BlockForm';
import { isEqual } from '@helpers/utils';

interface Props {
  activePageId: string;
  getPageRequest: Function;
  isListLoading: boolean;
  isFormLoading: boolean;
  activePage?: IPage;
  activeDraft?: ILayout;
  changeDraft: Function;
  deleteDraft: Function;
}

interface IState {
  isLoading: boolean;
  activePage: IPage | null;
  layout: ILayout | null;
  showAddBlockModal: boolean;
}

function PagesLayoutConstructor(props: Props) {
  const { activePageId, isListLoading, isFormLoading, activeDraft, deleteDraft } = props;

  const [activePage, setActivePage] = React.useState<IPage | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [showAddBlockModal, setShowAddBlockModal] = React.useState<boolean>(false);

  const getPage = async () => {
    setIsLoading(true);
    const res = await api.makeRequest<IPage>({
      url: `${onePageActionApiUrl}/${activePageId}`,
      method: 'GET',
    });

    if (res.success && typeof res.data === 'object') {
      setActivePage(res.data);
    } else {
      setActivePage(null);
    }

    setIsLoading(false);
  };

  React.useEffect(() => {
    getPage();
  }, [activePageId]);

  React.useEffect(() => {
    if (props.activePage) {
      setActivePage({ ...activePage, ...props.activePage });
    }
  }, [isListLoading, isFormLoading]);

  const handleAddModalClose = () => {
    setShowAddBlockModal(false);
  };

  const handleAddModalOpen = () => {
    setShowAddBlockModal(true);
  };

  const currentLayout = activeDraft || (activePage && activePage.blocks);

  const changeDraft = (config: { pageId: IPage['id']; newDraft: ILayout }) => {
    props.changeDraft(config);
  };

  const handleAddBlock = (values: IBlock) => {
    if (!currentLayout) {
      return;
    }

    changeDraft({
      pageId: activePageId,
      newDraft: [...currentLayout, { ...values, id: `${activePageId}_${Date.now()}`, isNew: true }],
    });
    setShowAddBlockModal(false);
  };

  const handleBlockDelete = (id: IBlock['id'], value?: boolean) => {
    if (!currentLayout) {
      return;
    }

    const deletedIndex = currentLayout.findIndex(item => item.id === id);
    const newBlock = { ...currentLayout[deletedIndex] };
    if (value === false) {
      delete newBlock.isDeleted;
    } else {
      newBlock.isDeleted = true;
    }
    changeDraft({
      pageId: activePageId,
      newDraft: [...currentLayout.slice(0, deletedIndex), newBlock, ...currentLayout.slice(deletedIndex + 1)],
    });
  };

  const handleBlockChange = (values: IBlock) => {
    if (!currentLayout || !activePage) {
      return;
    }
    const changedIndex = currentLayout.findIndex(item => item.id === values.id);
    const newItem = { ...values };
    const initialItem = activePage.blocks && activePage.blocks.find(item => item.id === values.id);

    if (isEqual(newItem, initialItem, ['name', 'layout', 'styles', 'title'])) {
      delete newItem.isTouched;
    } else {
      newItem.isTouched = true;
    }

    console.log(newItem);

    changeDraft({
      pageId: activePageId,
      newDraft: [...currentLayout.slice(0, changedIndex), newItem, ...currentLayout.slice(changedIndex + 1)],
    });
  };

  const handleBlockChangeCancel = (id: IBlock['id']) => {
    const initialItem = activePage && activePage.blocks && activePage.blocks.find(item => item.id === id);
    if (!initialItem) return;
    handleBlockChange(initialItem);
  };

  const handleChangesDecline = () => {
    deleteDraft(activePageId);
  };

  const handleChangesAccept = async () => {
    if (!currentLayout || !activePage) {
      return;
    }
    setIsLoading(true);

    const res = await api.makeRequest<ILayout>({
      url: changePageLayoutApiUrl,
      method: 'POST',
      body: {
        id: activePageId,
        data: currentLayout.filter(block => !(block.isDeleted && block.isNew)),
      },
    });

    if (res.success) {
      handleChangesDecline();
      getPage();
      return;
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader position="absolute" size={60} />;
  }

  if (!currentLayout || !activePage) {
    return (
      <Container>
        <Typography>Не удалось загрузить страницу</Typography>
      </Container>
    );
  }
  return (
    <React.Fragment>
      <PageLayoutConstructorHeader
        onEdit={() => {
          PagesList.WrappedComponent.setActiveEditedModal(activePage);
        }}
        onDelete={() => {
          PagesList.WrappedComponent.handleDelete(activePage);
        }}
        onAdd={handleAddModalOpen}
        page={activePage}
        hasChanges={!!activeDraft}
        onChangesAccept={handleChangesAccept}
        onChangesDecline={handleChangesDecline}
      />
      <PagesLayoutConstructorBody
        onBlockAddClick={handleAddModalOpen}
        onBlockDelete={handleBlockDelete}
        blocks={currentLayout}
        onBlockChange={handleBlockChange}
        onBlockChangeCancel={handleBlockChangeCancel}
      />
      {showAddBlockModal && (
        <Dialog title="Добавить блок" open maxWidth="md" fullWidth showCloseIcon onClose={handleAddModalClose}>
          <BlockForm onSubmit={handleAddBlock} submitText="Добавить" />
        </Dialog>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (store: IStore, ownProps: Props) => {
  return {
    activePage: onePageSelector(store, ownProps.activePageId),
    activeDraft: oneDraftSelector(store, ownProps.activePageId),
    isListLoading: isLoadingSelector(store),
    isFormLoading: isFormLoadingSelector(store),
  };
};

const mapDispatchToProps = {
  getPageRequest,
  changeDraft,
  deleteDraft,
};

export default connect(mapStateToProps, mapDispatchToProps)(PagesLayoutConstructor);
