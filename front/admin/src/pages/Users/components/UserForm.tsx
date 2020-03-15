import React, { Dispatch } from 'react';
import { reduxForm, InjectedFormProps, reset } from 'redux-form';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { validate } from '@helpers/validate';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IStore } from '@store/reducer';
import { USER_FORM_NAME } from '../redux/constants';
import Field from '@components/Field/Field';
import Form from '@components/Form/Form';
import { IUser } from '@pages/Auth/types';
import { Error } from '../types';
import { errorSelector } from '../redux/selectors';
import Typography from '@material-ui/core/Typography';

interface IProps {
  isLoading: boolean;
  error?: Error;
  submitText?: string;
  isAdmin: boolean;
  login: string;
  mode?: 'create' | 'edit';
}

const UserForm: React.FunctionComponent<InjectedFormProps & IProps> = props => {
  const { isLoading, error, handleSubmit, submitText, isAdmin, login, mode } = props;

  return (
    <>
      <Typography className="title" variant="h6">
        {login}
      </Typography>
      <Form
        onSubmit={handleSubmit}
        submit={
          <Button type="submit" variant="contained" color="primary" isLoading={isLoading} spinnerColor="green">
            {submitText || 'Отправить'}
          </Button>
        }
      >
        <Field
          name="login"
          component={Input}
          customLabel="Логин"
          placeholder="Admin"
          fullWidth
          variant="outlined"
          error={typeof error === 'object' && error.login}
        />
        {mode === 'edit' ? (
          <Field
            name="currentPassword"
            component={Input}
            customLabel={isAdmin ? 'Пароль администратора' : 'Текущий пароль'}
            type="password"
            fullWidth
            variant="outlined"
            error={typeof error === 'object' && error.currentPassword}
          />
        ) : null}
        <Field
          name="newPassword"
          component={Input}
          customLabel={mode === 'create' ? 'Пароль' : 'Новый пароль'}
          type="password"
          fullWidth
          variant="outlined"
          error={typeof error === 'object' && (error.newPassword || error.password)}
        />
      </Form>
    </>
  );
};

export default compose<any>(
  reduxForm({
    form: USER_FORM_NAME,
    enableReinitialize: true,
    validate: validate<Partial<IUser>>({
      login: {
        isRequired: true,
      },
      currentPassword: {
        isRequired: true,
      },
    }),
  }),
  connect((store: IStore) => {
    return {
      error: errorSelector(store),
    };
  }, {}),
)(UserForm);
