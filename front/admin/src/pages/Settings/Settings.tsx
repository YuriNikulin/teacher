import React from 'react';
import Header from '@components/Header/Header';
import FlexWrapper from '@components/FlexWrapper/FlexWrapper';
import { routes } from '@constants/routes';
import { connect } from 'react-redux';
import { IStore } from '@store/reducer';
import Container from '@material-ui/core/Container';
import SettingsForm from './components/SettingsForm';
import { ISettings } from './types';
import { getSettingsRequest, changeSettingsRequest } from './redux/actions';
import { isLoadingSelector, settingsSelector } from './redux/selectors';
import Preloader from '@components/Preloader/Preloader';

interface IProps {
  getSettingsRequest: Function;
  changeSettingsRequest: Function;
  isLoading: boolean;
  settings: ISettings;
}

const Settings: React.FunctionComponent<IProps> = props => {
  React.useEffect(() => {
    document.title = routes.settings.title();
    if (!props.settings) {
      props.getSettingsRequest();
    }
  }, []);

  const handleSubmit = (values: ISettings) => {
    props.changeSettingsRequest(values);
  };
  return (
    <React.Fragment>
      <FlexWrapper
        header={<Header />}
        content={
          <Container>
            {props.isLoading ? (
              <Preloader position="absolute" />
            ) : (
              <SettingsForm onSubmit={handleSubmit} initialValues={props.settings} />
            )}
          </Container>
        }
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: IStore, ownProps: IProps) => {
  return {
    isLoading: isLoadingSelector(state),
    settings: settingsSelector(state),
  };
};

const mapDispatchToProps = {
  getSettingsRequest,
  changeSettingsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
