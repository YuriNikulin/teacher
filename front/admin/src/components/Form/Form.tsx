import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Form, SubmitHandler } from 'redux-form';

interface Props {
  children: Array<React.ReactElement>;
  submit: React.ReactElement;
  onSubmit: SubmitHandler;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    item: {
      marginBottom: theme.spacing(3),
      maxWidth: '100%',
    },
    submit: {
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
  };
});

function _Form(props: Props) {
  const classes = useStyles();
  const { children, submit, onSubmit } = props;

  return (
    <Form onSubmit={onSubmit}>
      <Grid container direction="column">
        {React.Children.map(children, (item, index) => {
          return <FormItem key={index}>{item}</FormItem>;
        })}
        <div className={classes.submit}>{submit}</div>
      </Grid>
    </Form>
  );
}

export function FormItem(props: any) {
  const classes = useStyles();
  return <div className={classes.item}>{props.children}</div>;
}

export default _Form;
