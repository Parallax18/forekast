export const formDataToObject = (formData: FormData): Record<string, any> => {
  const obj: Record<string, any> = {};
  formData.forEach((value, key) => {
    if (obj[key]) {
      // If key already exists, convert it to an array and append the new value
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  });
  return obj;
};
