// utils/objectToFormData.js
export function objectToFormData(obj, form = new FormData(), namespace = "") {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const formKey = namespace ? `${namespace}[${key}]` : key;
    const value = obj[key];

    if (value === undefined || value === null) continue;

    if (value instanceof File) {
      form.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File) {
          //  Always append with the same key (no index)
          form.append(formKey, item);
        } else if (item?.originFileObj) {
          form.append(formKey, item.originFileObj);
        } else {
          form.append(formKey, item);
        }
      });
    } else if (value instanceof Object && !(value instanceof Date)) {
      objectToFormData(value, form, formKey);
    } else {
      form.append(formKey, value);
    }
  }
  return form;
}