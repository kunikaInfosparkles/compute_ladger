import React from "react";
import { Input, InputNumber, Select, Checkbox, Switch, Form } from "antd";
import { Controller } from "react-hook-form";
import { UploadIcon } from "../icon/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";


const { TextArea } = Input;

// Text Input
export const TextInput = ({ control, name, label, rules, placeholder, maxLength, readOnly, suffix, disable }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <Form.Item
        layout="vertical"
        label={label}
        required={!!rules?.required}
        validateStatus={error ? "error" : ""}
        help={error?.message}
      >
        <Input {...field} placeholder={placeholder} maxLength={maxLength} readOnly={readOnly} disabled={disable} />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </Form.Item>
    )}
  />
);

// Number Input
export const NumberInput = ({ control, name, label, rules, placeholder, maxLength, minlength,readOnly,disabled }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <Form.Item
        layout="vertical"
        label={label}
        required={!!rules?.required}
        validateStatus={error ? "error" : ""}
        help={error?.message}
      >
        <Input
          {...field}
          style={{ width: "100%" }}
          inputMode="numeric"
          placeholder={placeholder}
          {...(minlength !== undefined ? { min: minlength } : {})}
          {...(maxLength !== undefined ? { max: maxLength } : {})}
          type="number"
          readOnly={readOnly}
          disabled={disabled}
        />
      </Form.Item>
    )}
  />
);



//Select Input
export const SelectInput = ({ control, name, label, options = [], rules, placeholder }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <Form.Item
        layout="vertical"
        label={label}
        required={!!rules?.required}
        validateStatus={error ? "error" : ""}
        help={error?.message}
      >
        <Select {...field} options={options} placeholder={placeholder} allowClear />
      </Form.Item>
    )}
  />
);


// Checkbox
export const CheckboxInput = ({ control, name, label, rules }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <Form.Item layout="vertical">
        <Checkbox
          checked={field.value || false}
          onChange={(e) => field.onChange(e.target.checked)}
        >
          {label}
        </Checkbox>
      </Form.Item>
    )}
  />
);

// Switch
export const SwitchInput = ({ control, name, label, rules }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <Form.Item layout="vertical" label={label}>
        <Switch
          checked={field.value || false}
          onChange={field.onChange}
        />
      </Form.Item>
    )}
  />
);

// TextArea
export const TextAreaInput = ({
  control,
  name,
  label,
  rules,
  placeholder,
  className,
  maxLength
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <Form.Item
        layout="vertical"
        label={label}
        required={!!rules?.required}
        validateStatus={error ? "error" : ""}
        help={error?.message}
      >
        <TextArea
          {...field}
          className={className}
          rows={4}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </Form.Item>
    )}
  />
);

// Password Input
export const PasswordInput = ({ control, name, label, rules, placeholder, maxLength }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <Form.Item
        layout="vertical"
        label={label}
        required={!!rules?.required}
        validateStatus={error ? "error" : ""}
        help={error?.message}
       
      >
        <Input.Password {...field} placeholder={placeholder}  maxLength={maxLength}/>
      </Form.Item>
    )}
  />
);

export const UploadInput = ({
  control,
  name,
  handleChange,
  upload_text,
  fileType = "image",
  acceptedFormats = null
}) => {
  const getAcceptAttribute = () => {
    if (acceptedFormats) return acceptedFormats;
    switch (fileType) {
      case "image":
        return "image/*";
      case "file":
        return "*/*";
      case "filesImages":
        return "image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt";
      case "video":
        return "video/*";
      default:
        return "image/*";
    }
  };
  const fileInputId = `file-input-${name}`;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          layout="vertical"
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <div className="custom-upload-main"
            onClick={() => document.getElementById(fileInputId).click()}>
            <input
              type="file"
              accept={getAcceptAttribute()}
              id={fileInputId}
              name={field.name}
              onChange={(e) => {
                handleChange?.(e);
                field.onChange(e.target.files[0]);
              }}
              className="upload-input-custom"
              hidden
            />
            <UploadIcon />
            <p>{upload_text}</p>
          </div>
        </Form.Item>
      )}
    />
  );
};

export const DatePickerInput = ({
  control,
  name,
  label,
  rules,
  placeholder = "Select date",
  format = "YYYY-MM-DD",
  disabledDate
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <Form.Item
        layout="vertical"
        label={label}
        required={!!rules?.required}
        validateStatus={error ? "error" : ""}
        help={error?.message}
      >
        <DatePicker
          {...field}
          placeholder={placeholder}
          format={format}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(date ? date.format(format) : null)}
          style={{ width: "100%" }}
          disabledDate={disabledDate}
        />
      </Form.Item>
    )}
  />
);

