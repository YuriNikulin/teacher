import React from 'react';
import LoginForm from './components/LoginForm';
import { ILoginState } from './types';
import { connect } from 'react-redux';
import { loginRequest } from './redux/actions';
import Dialog from '@components/Dialog/Dialog';

interface IProps {
  loginRequest: Function;
}

const Login: React.FunctionComponent<IProps> = props => {
  const handleSubmit = (values: ILoginState) => {
    props.loginRequest(values);
  };

  return (
    <div>
      <Dialog open maxWidth="xs" fullWidth title="Вход">
        <LoginForm onSubmit={handleSubmit} />
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = {
  loginRequest,
};

export default connect(null, mapDispatchToProps)(Login);
