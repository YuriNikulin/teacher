import React, { useState } from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { validate, helpers as validateHelpers } from '@helpers/validate';
import { fields } from '@constants/validation';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IPage, Error } from '../types';
import { IStore } from '@store/reducer';
import { isLoadingSelector } from '../redux/selectors';
import { PAGE_FORM_NAME } from '../redux/constants';
import Wysiwig from '@components/Wysiwig/Wysiwig';
import Field from '@components/Field/Field';
import Form from '@components/Form/Form';

interface IProps {
  isLoading: boolean;
  error?: Error;
}

const PagesForm: React.FunctionComponent<InjectedFormProps & IProps> = props => {
  const { isLoading, error, handleSubmit } = props;

  return (
    <Form
      onSubmit={handleSubmit}
      submit={
        <Button type="submit" variant="contained" color="primary" isLoading={isLoading} spinnerColor="green">
          Войти
        </Button>
      }
    >
      <Field
        name="name"
        component={Input}
        customLabel="Название"
        placeholder="Главная"
        fullWidth
        variant="outlined"
        error={typeof error === 'object' && error.name}
      />
      <Field name="url" component={Input} customLabel="Адрес" placeholder="/news" fullWidth variant="outlined" />
      <Field
        name="title"
        component={Input}
        customLabel="Заголовок"
        placeholder="Главная"
        fullWidth
        variant="outlined"
      />
      <Field
        name="styles"
        component={Input}
        placeholder=".page { display: block; } .article { display: inline-block; font-size: 16px; }"
        fullWidth
        customLabel="Стили на странице"
        variant="outlined"
        multiline
      />
    </Form>
  );
};

export default compose<any>(
  reduxForm({
    form: PAGE_FORM_NAME,
    validate: validate<Partial<IPage>>({
      name: {
        isRequired: true,
      },
      url: {
        isRequired: true,
      },
    }),
  }),
  connect((store: IStore) => {
    return {
      isLoading: isLoadingSelector(store),
      // error: errorsSelector(store),
    };
  }, {}),
)(PagesForm);
