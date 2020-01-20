import React, { useState } from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';

import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { validate } from '@helpers/validate';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ILoginState, Error } from '../types';
import { IStore } from '@store/reducer';
import { isLoadingSelector, errorsSelector } from '../redux/selectors';
import { LOGIN_FORM_NAME } from '../redux/constants';
import Field from '@components/Field/Field';
import Form from '@components/Form/Form';

interface IProps {
  isLoading: boolean;
  error?: Error;
}

const LoginForm: React.FunctionComponent<InjectedFormProps & IProps> = props => {
  const { handleSubmit, isLoading, error } = props;

  return (
    <Form
      onSubmit={handleSubmit}
      submit={
        <Button type="submit" variant="contained" color="primary" isLoading={isLoading} spinnerColor="green">
          Войти
        </Button>
      }
    >
      <Field name="login" component={Input} label="Логин" fullWidth error={typeof error === 'object' && error.login} />
      <Field
        name="password"
        component={Input}
        type="password"
        label="Пароль"
        fullWidth
        error={typeof error === 'object' && error.password}
      />
    </Form>
  );
};

export default compose<any>(
  reduxForm({
    form: LOGIN_FORM_NAME,
    validate: validate<Partial<ILoginState>>({
      login: {
        isRequired: true,
      },
    }),
  }),
  connect((store: IStore) => {
    return {
      isLoading: isLoadingSelector(store),
      error: errorsSelector(store),
    };
  }, {}),
)(LoginForm);
