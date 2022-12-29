import clsx from 'clsx';
import { Row, Text, TextInput } from 'design';
import React from 'react';
import {
  FieldPath,
  FieldValues,
  Message,
  useController,
  useFormContext,
  ValidationValueMessage,
} from 'react-hook-form';
import { TextInputProps, View } from 'react-native';
import { Show } from '../../shared/components/Show';
import { debounce, getDeepVal } from '../../utils';

export type ControlledInputP<TFieldValues extends FieldValues> = {
  placeholder: string;
  label: string;
  name: FieldPath<TFieldValues>;
  /**
   * It can be used to perform transformations on the value of the input before
   *  it is sent to the form. This ensures that you can send the correct value
   * to the form. For example, imagine you have a field for the number of months.
   *  Initially, this field is saved in the form as a string, but as required by
   *  another part, you have to send it as a number. With the transformValue prop,
   *  you can pass the Number constructor, and then with the form's getValue,
   *  this field will be sent as a number.
   */
  transformValue?: (v: string | number) => string | number;
  required?: Message | boolean;
  rules?: Partial<ValidationRules>;
  disabled?: boolean;
} & ControlledInputValidateProps &
  TextInputProps;

type ValidationRules = {
  min: ValidationValueMessage<number | string>;
  max: ValidationValueMessage<number | string>;
  maxLength: ValidationValueMessage<number>;
  minLength: ValidationValueMessage<number>;
  pattern: ValidationValueMessage<RegExp>;
  valueAsNumber: boolean;
  valueAsDate: boolean;
};

type ControlledInputValidateProps =
  | {
      validate?: never;
      validateMessage?: never;
    }
  | {
      validate?: (value: string) => boolean;
      validateMessage: string;
    };

export const ControlledInput = <TFieldValues extends FieldValues>(props: ControlledInputP<TFieldValues>) => {
  const { control, trigger, setValue } = useFormContext();
  const debouncedTrigger = React.useMemo(() => {
    return debounce(trigger, 1000);
  }, [trigger]);

  const {
    field: { ref, onBlur, value },
    formState: { errors },
  } = useController({
    rules: {
      required: typeof props.required === 'boolean' ? 'Esse campo é obrigatório' : props.required,
      validate: props.validate,
      ...(props.rules || {}),
    },
    name: props.name,
    control,
  });

  return (
    <ControlledInputContainer errors={errors} {...props}>
      <TextInput
        hasError={!!getDeepVal(errors, props.name)}
        ref={ref}
        onChangeText={(v: string | number) => {
          const maybeTransformedV = props.transformValue ? props.transformValue(v) : v;
          setValue(props.name, maybeTransformedV as any);
          debouncedTrigger(props.name);
        }}
        editable={!props.disabled}
        value={value}
        testID={`controlled-input:${props.name}`}
        {...props}
        onBlur={(e: unknown) => {
          debouncedTrigger(props.name);
          onBlur();
          props.onBlur?.(e as any);
        }}
      />
    </ControlledInputContainer>
  );
};
type ControlledInputContainerP = {
  children: React.ReactNode;
  errors: { [key: string]: any };
} & ControlledInputP<FieldValues>;

const ControlledInputContainer = ({ children, errors, ...props }: ControlledInputContainerP) => {
  return (
    <View>
      <Text>{props.label}</Text>
      <Row xClassName={clsx(['itens-center rounded-lg flex-grow'])}>
        <View className="flex-grow">{children}</View>
      </Row>
      <Show
        when={!!getDeepVal(errors, props.name)}
        renderItem={() => (
          <Text testID={`controlled-input-error:${props.name}`} xClassName="text-red-500 text-xs">
            {getDeepVal(errors, props.name)?.type === 'validate'
              ? props.validateMessage
              : getDeepVal(errors, props.name)?.message}
          </Text>
        )}
      />
    </View>
  );
};
