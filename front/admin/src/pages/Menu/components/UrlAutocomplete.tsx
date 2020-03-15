import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Input from '@components/Input/Input';

interface IProps {
  [key: string]: any;
}

const UrlAutocomplete: React.FunctionComponent<IProps> = props => {
  const { initialValue } = props;
  const [value, setValue] = React.useState<string | null>(null);
  // console.log(initialValue);
  // console.log(props);
  React.useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleInputChange = (e: any, value: string) => {
    setValue(value);
  };
  return (
    <Autocomplete
      getOptionLabel={(params: any) => {
        return params.url;
      }}
      renderInput={params => <Input variant="outlined" customLabel="Ссылка" placeholder="/" {...props} {...params} />}
      options={props.options || []}
      onInputChange={handleInputChange}
      inputValue={value || ''}
      freeSolo
    />
  );
};

export default UrlAutocomplete;
