import React, { useState } from 'react';
import { Field, reduxForm, InjectedFormProps, Form, getFormValues } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@components/Button/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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

interface IProps {
  isLoading: boolean;
  error?: Error;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    item: {
      marginBottom: theme.spacing(2),
    },
    submit: {
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
  };
});

const PagesForm: React.FunctionComponent<InjectedFormProps & IProps> = props => {
  const { handleSubmit, isLoading, error } = props;
  const classes = useStyles();

  return (
    <Form onSubmit={handleSubmit}>
      <Grid direction="column" container>
        {/* <div className={classes.item}>
          <Field name="name" component={Input} label="Название" placeholder="Главная" fullWidth />
        </div>
        <div className={classes.item}>
          <Field name="url" component={Input} label="Адрес" placeholder="/news" fullWidth />
        </div>
        <div className={classes.item}>
          <Field name="title" component={Input} label="Заголовок" placeholder="Главная" fullWidth />
        </div> */}
        <div className={classes.item}>
          <Field
            name="styles"
            component={Wysiwig}
            label="Стили"
            placeholder=".page { display: block; } .article { display: inline-block; font-size: 16px; }"
            fullWidth
          />
        </div>
        <div className={classes.submit}>
          <Button type="submit" variant="contained" color="primary" isLoading={isLoading} spinnerColor="green">
            Войти
          </Button>
        </div>
      </Grid>
    </Form>
  );
};

export default compose<any>(
  reduxForm({
    form: PAGE_FORM_NAME,
    validate: validate<Partial<IPage>>({}),
  }),
  connect((store: IStore) => {
    return {
      isLoading: isLoadingSelector(store),
      // error: errorsSelector(store),
    };
  }, {}),
)(PagesForm);
