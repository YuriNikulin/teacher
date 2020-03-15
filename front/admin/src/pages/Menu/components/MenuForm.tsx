import React, { Dispatch } from 'react';
import { reduxForm, InjectedFormProps, getFormMeta } from 'redux-form';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { validate } from '@helpers/validate';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IStore } from '@store/reducer';
import { MENU_FORM_NAME } from '../redux/constants';
import Field from '@components/Field/Field';
import Form from '@components/Form/Form';
import { IUser } from '@pages/Auth/types';
import { Error, IMenu } from '../types';
import { pagesSelector } from '@pages/Page/redux/selectors';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { IPage } from '@pages/Page/types';
import { getPagesListRequest } from '@pages/Page/redux/actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UrlAutocomplete from './UrlAutocomplete';

interface IProps {
  title: string;
  isLoading: boolean;
  pages: IPage[];
  getPagesListRequest: Function;
  submitText?: string;
}

const MenuForm: React.FunctionComponent<InjectedFormProps & IProps> = props => {
  const { handleSubmit, title, isLoading, pages, getPagesListRequest, submitText } = props;

  React.useEffect(() => {
    if (!pages || !pages.length) {
      getPagesListRequest();
    }
  }, []);

  return (
    <>
      <Typography className="title" variant="h6">
        {title}
      </Typography>
      <Form
        onSubmit={handleSubmit}
        submit={
          <Button type="submit" variant="contained" color="primary" isLoading={isLoading} spinnerColor="green">
            {submitText || 'Сохранить'}
          </Button>
        }
      >
        <Field
          name="title"
          component={Input}
          customLabel="Название"
          placeholder="Главная"
          fullWidth
          variant="outlined"
        />
        <Field
          name="url"
          component={UrlAutocomplete}
          freeSolo
          customLabel="Ссылка"
          placeholder="/"
          renderInput={(params: any) => {
            return <TextField fullWidth variant="outlined" {...params} />;
          }}
          options={pages}
          initialValue={props.initialValues && (props.initialValues as any).url}
          getOptionLabel={(params: any) => {
            return params.url;
          }}
        />
        <Field
          name="order"
          component={Input}
          customLabel="Порядковый номер"
          placeholder="2"
          type="number"
          fullWidth
          variant="outlined"
        />
        <div />
      </Form>
    </>
  );
};

export default compose<any>(
  reduxForm({
    form: MENU_FORM_NAME,
    enableReinitialize: true,
    validate: validate<Partial<IMenu>>({
      url: {
        isRequired: true,
      },
      title: {
        isRequired: true,
      },
    }),
  }),
  connect(
    (store: IStore) => {
      // console.log(getFormMeta(MENU_FORM_NAME)(store));
      return {
        pages: pagesSelector(store),
        // error: errorSelector(store),
      };
    },
    {
      getPagesListRequest,
    },
  ),
)(MenuForm);
