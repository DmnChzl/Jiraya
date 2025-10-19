export const html = (strings: TemplateStringsArray, ...values: any[]) => {
  return strings.reduce((result, str, idx) => {
    const value = values[idx];

    if (Array.isArray(value)) {
      return result + str + value.join('');
    }

    return result + str + (value ?? '');
  }, '');
};
