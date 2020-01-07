import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { validate } from '@helpers/validate';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IPage, Error, IBlock } from '../types';
import { IStore } from '@store/reducer';
import { isFormLoadingSelector, errorSelector } from '../redux/selectors';
import { BLOCK_FORM_NAME } from '../redux/constants';
import Field from '@components/Field/Field';
import Form from '@components/Form/Form';
import Wysiwig from '@components/Wysiwig/Wysiwig';

interface IProps {
  isLoading: boolean;
  error?: Error;
  submitText?: string;
}

const BlockForm: React.FunctionComponent<InjectedFormProps & IProps> = props => {
  const { isLoading, error, handleSubmit, submitText } = props;

  return (
    <Form
      onSubmit={handleSubmit}
      submit={
        <Button type="submit" variant="contained" color="primary" isLoading={isLoading} spinnerColor="green">
          {submitText || 'Отправить'}
        </Button>
      }
    >
      <Field
        name="layout"
        component={Wysiwig}
        customLabel="Содержимое блока"
        placeholder="Контент, который будет выводиться на сайте"
        fullWidth
        variant="outlined"
        error={typeof error === 'object' && error.name}
      />
      <Field
        name="name"
        component={Input}
        customLabel="Название"
        placeholder="Контакты"
        fullWidth
        variant="outlined"
        error={typeof error === 'object' && error.name}
      />

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
    form: BLOCK_FORM_NAME,
  }),
  connect((store: IStore) => {
    return {
      isLoading: isFormLoadingSelector(store),
      error: errorSelector(store),
    };
  }, {}),
)(BlockForm);
