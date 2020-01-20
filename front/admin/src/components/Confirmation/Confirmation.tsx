import React from 'react';
import Dialog from '@components/Dialog/Dialog';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface Config {
  message: string;
  title?: string;
  onAccept: () => any;
  onReject?: () => any;
  acceptText?: string;
  rejectText?: string;
}

interface IConfirmation {
  getConfirmation?: () => any;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    buttons: {
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),

      '& > * + *': {
        marginLeft: theme.spacing(3),
      },
    },
  };
});

const Confirmation: any = () => {
  const classes = useStyles();
  const [config, setConfig] = React.useState<Config | null>(null);

  const handleReject = () => {
    if (config) {
      config.onReject && config.onReject();
    }

    setConfig(null);
  };

  const onAccept = () => {
    if (config) {
      config.onAccept && config.onAccept();
    }

    setConfig(null);
  };

  Confirmation.getConfirmation = (config: Pick<Config, 'message' | 'title' | 'acceptText' | 'rejectText'>) => {
    const promise = new Promise((resolve, reject) => {
      setConfig({
        message: config.message,
        title: config.title,
        acceptText: config.acceptText,
        rejectText: config.rejectText,
        onAccept: resolve,
        onReject: reject,
      });
    });

    return promise;
  };

  if (!config) return null;

  return (
    <Dialog open showCloseIcon onClose={handleReject} title={config.title}>
      {config.message}
      <div className={classes.buttons}>
        <Button onClick={onAccept} color="secondary" variant="contained">
          {config.acceptText || 'Принять'}
        </Button>
        <Button onClick={handleReject} variant="outlined">
          {config.rejectText || 'Отмена'}
        </Button>
      </div>
    </Dialog>
  );
};

export default Confirmation;
