import React from 'react';
import { reduxForm, InjectedFormProps, WrappedFieldArrayProps, formValueSelector } from 'redux-form';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { validate } from '@helpers/validate';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IPage, Error, IBlock, IAttachment } from '../types';
import { IStore } from '@store/reducer';
import { isFormLoadingSelector, errorSelector } from '../redux/selectors';
import { BLOCK_FORM_NAME } from '../redux/constants';
import Field from '@components/Field/Field';
import { FieldArray, change } from 'redux-form';
import Form, { FormItem } from '@components/Form/Form';
import Wysiwig from '@components/Wysiwig/Wysiwig';
import FileUploader from '@components/FileUploader/FileUploader';
import { uploadFile, IResponse } from '@helpers/api';
import { makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@components/Tooltip/Tooltip';
import Slide from '@material-ui/core/Slide';

interface IProps {
  isLoading: boolean;
  error?: any;
  submitText?: string;
  onImageUpload?: (data: any) => any;
  pageId?: IPage['id'];
  dispatch: Function;
}

const selector = formValueSelector(BLOCK_FORM_NAME);

const useStyles = makeStyles((theme: Theme) => ({
  documentLink: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
  documentLinkActive: {
    color: theme.palette.primary.main,
  },
  attachmentContainer: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    marginBottom: theme.spacing(4),

    '&:first-child': {
      paddingTop: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
  },
}));

const renderAttachments = (props: WrappedFieldArrayProps<any> & { dispatch: any; pageId?: string }) => {
  const { dispatch, pageId } = props;
  const classes = useStyles();
  const deleteAttachment = (item: number) => {
    props.fields.remove(item);
  };

  const handleDelete = (name: string) => {
    dispatch(change(BLOCK_FORM_NAME, name, ''));
  };

  const handleChange = (name: string, value: string | number) => {
    dispatch(change(BLOCK_FORM_NAME, name, value));
  };

  const handleDrop = React.useCallback((file: File, name: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('page_id', pageId || '');
    uploadFile(formData).then((res: IResponse<any>) => {
      dispatch(change(BLOCK_FORM_NAME, name, res.data.url));
    });
  }, []);

  return (
    <React.Fragment>
      {props.fields.map((item: string, index: number, data) => {
        const fileName = `${item}.url`;
        const textName = `${item}.text`;
        const previewName = `${item}.preview`;
        const linkVariantName = `${item}.linkVariant`;
        // console.log(props.fields.get(index));
        const isText = props.fields.get(index).linkVariant === 'text';

        const getLabel = (
          <span>
            <span
              onClick={isText ? undefined : () => handleChange(linkVariantName, 'text')}
              className={classNames({
                [classes.documentLink]: true,
                [classes.documentLinkActive]: isText,
              })}
            >
              Текст ссылки
            </span>
            &nbsp;/&nbsp;
            <span
              onClick={!isText ? undefined : () => handleChange(linkVariantName, 'preview')}
              className={classNames({
                [classes.documentLink]: true,
                [classes.documentLinkActive]: !isText,
              })}
            >
              Превью
            </span>
          </span>
        );

        return (
          <Slide key={index} in={true} direction="up">
            <div className={classes.attachmentContainer}>
              <FormItem>
                <Field
                  name={fileName}
                  component={FileUploader}
                  onFileDrop={(file: File) => handleDrop(file, fileName)}
                  onDelete={() => handleDelete(fileName)}
                  customLabel={
                    <span>
                      Файл
                      <Tooltip message="Удалить файл" anchorOrigin={{ horizontal: 'right', vertical: 'center' }}>
                        <IconButton size="small" style={{ marginLeft: 8 }} onClick={() => deleteAttachment(index)}>
                          <DeleteIcon fontSize="small"></DeleteIcon>
                        </IconButton>
                      </Tooltip>
                    </span>
                  }
                  placeholder="Перетащите PDF файл"
                  fullWidth
                  variant="outlined"
                  type="document"
                />
              </FormItem>
              <FormItem key={index}>
                {isText ? (
                  <Field
                    name={textName}
                    component={Input}
                    variant="outlined"
                    placeholder="Текст ссылки"
                    fullWidth
                    customLabel={getLabel}
                  />
                ) : (
                  <Field
                    name={previewName}
                    component={FileUploader}
                    onFileDrop={(file: File) => handleDrop(file, previewName)}
                    onDelete={() => handleDelete(previewName)}
                    placeholder="Перетащите изображение"
                    customLabel={getLabel}
                  />
                )}
              </FormItem>
            </div>
          </Slide>
        );
      })}
      <Button variant="outlined" onClick={() => props.fields.push({ linkVariant: 'text' })}>
        Прикрепить файл
      </Button>
    </React.Fragment>
  );
};

const BlockForm: React.FunctionComponent<InjectedFormProps & IProps> = props => {
  const { isLoading, error, handleSubmit, submitText, onImageUpload, pageId, dispatch } = props;

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
        editorSize="large"
        variant="outlined"
        onImageUpload={onImageUpload}
        pageId={pageId}
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
      <FieldArray
        name="attachments"
        component={renderAttachments}
        dispatch={dispatch}
        pageId={pageId}
        rerenderOnEveryChange
        // foo={Math.random()}
      />
    </Form>
  );
};

export default compose<any>(
  reduxForm({
    form: BLOCK_FORM_NAME,
    validate: (values: IBlock) => {
      const errors: any = {};
      if (values.attachments) {
        const attachmentsArrayErrors: Partial<IAttachment>[] = [];
        values.attachments.forEach((attachment: IAttachment, index: number) => {
          const attachmentErrors: Partial<IAttachment> = {};
          if (!attachment.url) {
            attachmentErrors.url = 'Необходимо загрузить файл';
          }
          if (attachment.linkVariant === 'text' && !attachment.text) {
            attachmentErrors.text = 'Необходимо ввести текст ссылки';
          } else if (attachment.linkVariant === 'preview' && !attachment.preview) {
            attachmentErrors.preview = 'Необходимо загрузить превью для документа';
          }
          attachmentsArrayErrors[index] = attachmentErrors;
        });

        errors.attachments = attachmentsArrayErrors;
      }

      return errors;
    },
  }),
  connect((store: IStore) => {
    return {
      isLoading: isFormLoadingSelector(store),
      error: errorSelector(store),
      attachments: selector(store, 'attachments'),
    };
  }, null),
)(BlockForm);
