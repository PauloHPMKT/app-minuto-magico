interface ValidationFn<T> {
  (data: T): string | undefined;
}

export const useValidation = () => {
  const checkAllFieldsRequired: ValidationFn<Record<string, any>> = (data) => {
    const requiredFields = Object.keys(data) as Array<keyof typeof data>;
    const allFieldsVerified = requiredFields.every(field => !data[field]);
    if (allFieldsVerified) {
      return 'Todos os campos são obrigatórios';
    }
  };

  const checkSpecificFields: ValidationFn<Record<string, any>> = (data) => {
    const requiredFields = Object.keys(data) as Array<keyof typeof data>;
    for (const field of requiredFields) {
      if (!data[field]) {
        return field === 'totalMinutes'
          ? 'Informe o total de minutos'
          : 'Informe a criança que irá brincar';
      }
    }
  };

  const checkMinimumTime: ValidationFn<{ totalMinutes: string }> = (data) => {
    if (parseInt(data.totalMinutes) < 10) {
      return 'O tempo mínimo é de 10 minutos';
    }
  };

  const formValidation: ValidationFn<Record<string, any>> = (data) => {
      return (
        checkAllFieldsRequired(data) ||
        checkSpecificFields(data) ||
        checkMinimumTime(data as { totalMinutes: string })
      );
    };

  return {
    formValidation,
  }
}
