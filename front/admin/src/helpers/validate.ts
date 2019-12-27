export interface IValidateRule {
  validator: (value: any) => boolean;
  message: string;
}

// export interface IValidateConfig<T> {
export type IValidateConfig<T> = {
  [P in keyof T]: {
    isRequired?: boolean;
    rules?: Array<IValidateRule>
  }
}

export const validate = <T>(config: IValidateConfig<T>) => {
  return (values: T) => {
    const errors: Partial<Record<keyof T, string>> = {};
    if (!config) {
      return errors;
    }

    for (let key in config) {
      const currentValue = values[key];
      const currentConfig = config[key];
      if (currentConfig.isRequired && !currentValue) {
        errors[key] = 'Необходимо заполнить это поле';
        continue;
      }

      if (currentValue && currentConfig.rules) {
        for (let ruleKey = 0; ruleKey < currentConfig.rules.length; ruleKey++) {
          const currentRule = currentConfig.rules[ruleKey];
          if (currentRule.validator(currentValue)) {
            errors[key] = currentRule.message;
            break;
          }
        }
      }
    }

    return errors;
  }
}

export const helpers = {
  minLength: (min: number) => (value?: any) => {
    if (value && value.length !== undefined) {
      return value.length < min;
    } else {
      return false;
    }
  }
}