import React, { Dispatch } from 'react';
import { reduxForm, InjectedFormProps, getFormMeta, change } from 'redux-form';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { validate } from '@helpers/validate';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IStore } from '@store/reducer';
import Field from '@components/Field/Field';
import Form from '@components/Form/Form';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { SETTINGS_FORM_NAME } from '../redux/constants';
import { ISettings } from '../types';
import FileUploader from '@components/FileUploader/FileUploader';
import { uploadFile, IResponse } from '@helpers/api';

interface IProps {
  isLoading: boolean;
  dispatch: Function;
}

const SettingsForm: React.FunctionComponent<InjectedFormProps & IProps> = props => {
  const { handleSubmit, isLoading, dispatch } = props;

  const handleDrop = React.useCallback((file: File, name: string) => {
    const formData = new FormData();
    formData.append('image', file);
    uploadFile(formData).then((res: IResponse<any>) => {
      dispatch(change(SETTINGS_FORM_NAME, name, res.data.url));
    });
  }, []);

  const handleDelete = (name: string) => {
    dispatch(change(SETTINGS_FORM_NAME, name, ''));
  };

  return (
    <>
      <Typography className="title" variant="h6">
        Настройки сайта
      </Typography>
      <Form
        onSubmit={handleSubmit}
        submit={
          <Button type="submit" variant="contained" color="primary" isLoading={isLoading} spinnerColor="green">
            Сохранить
          </Button>
        }
      >
        <Field
          name="favicon"
          component={FileUploader}
          onFileDrop={(file: File) => handleDrop(file, 'favicon')}
          onDelete={() => handleDelete('favicon')}
          placeholder="Перетащите изображение"
          customLabel="Иконка сайта"
        />
        <Field
          name="logo"
          component={FileUploader}
          onFileDrop={(file: File) => handleDrop(file, 'logo')}
          onDelete={() => handleDelete('logo')}
          placeholder="Перетащите изображение"
          customLabel="Логотип сайта"
        />
        <Field
          name="site_background"
          component={Input}
          variant="outlined"
          placeholder="#eeeee"
          fullWidth
          customLabel="Фон сайта"
        />
        <Field
          name="site_background_image"
          component={FileUploader}
          onFileDrop={(file: File) => handleDrop(file, 'site_background_image')}
          onDelete={() => handleDelete('site_background_image')}
          placeholder="Перетащите изображение"
          customLabel="Фон сайта (изображение)"
        />
        <Field
          name="content_background"
          component={Input}
          variant="outlined"
          placeholder="#eeeee"
          fullWidth
          customLabel="Фон контента"
        />
        <div />
      </Form>
    </>
  );
};

export default compose<any>(
  reduxForm({
    form: SETTINGS_FORM_NAME,
    enableReinitialize: true,
    validate: validate<Partial<ISettings>>({}),
  }),
  connect((store: IStore) => {
    return {};
  }, {}),
)(SettingsForm);
