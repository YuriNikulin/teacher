import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginForm from './components/LoginForm';
import { ILoginState } from './types';
import { connect } from 'react-redux';
import { loginRequest } from './redux/actions';

interface IProps {
  loginRequest: Function;
}

const Login: React.FunctionComponent<IProps> = props => {
  const handleSubmit = (values: ILoginState) => {
    props.loginRequest(values);
  };

  return (
    <div>
      <Dialog open maxWidth="xs" fullWidth>
        <DialogTitle>Вход</DialogTitle>
        <DialogContent style={{ maxWidth: 500 }}>
          <LoginForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = {
  loginRequest,
};

export default connect(null, mapDispatchToProps)(Login);
