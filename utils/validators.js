module.exports = {
  validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  },

  validateCPF(cpfValue) {
    let cpf = cpfValue.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
      return false;
    let add = 0;
    for (let i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
      return false;
    add = 0;
    for (let i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
      return false;
    return true;
  },

  validateCNPJ(CNPJ) {

    CNPJ = CNPJ.replace(/[^\d]+/g, '');

    if (CNPJ == '') return false;

    if (CNPJ.length != 14)
      return false;

    if (CNPJ == "00000000000000" ||
      CNPJ == "11111111111111" ||
      CNPJ == "22222222222222" ||
      CNPJ == "33333333333333" ||
      CNPJ == "44444444444444" ||
      CNPJ == "55555555555555" ||
      CNPJ == "66666666666666" ||
      CNPJ == "77777777777777" ||
      CNPJ == "88888888888888" ||
      CNPJ == "99999999999999")
      return false;

    let length = CNPJ.length - 2
    let numbers = CNPJ.substring(0, length);
    let chars = CNPJ.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != chars.charAt(0))
      return false;

    length = length + 1;
    numbers = CNPJ.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != chars.charAt(1))
      return false;

    return true;

  },

  handleErrorsAlert(errors) {
    alert(errors.join("\r\n").toString())
  },

  validateFirstStep({ email, documentType }) {
    const errors = []
    if (!validateEmail(email)) {
      errors.push('Formato de email errado')
    }
    if (!documentType) {
      errors.push('Tipo de documento é obrigatório')
    }

    return errors
  },

  validateSecondStep({ name, documentType, CPF, CNPJ, date, phone }) {
    const errors = []
    if (!name) {
      errors.push('Nome é um campo obrigatório')
    }
    if (documentType === 'PF' && !validateCPF(CPF)) {
      errors.push('Formato de CPF errado')
    }
    if (documentType === 'CNPJ' && !validateCNPJ(CNPJ)) {
      errors.push('Formato de CNPJ errado')
    }
    if (!date) {
      errors.push('Data é um campo obrigatório')
    }
    if (!phone) {
      errors.push('Telefone é um campo obrigatório')
    }

    return errors
  },

  validateThirdStep({ password }) {
    const errors = []
    if (!password) {
      errors.push('Senha é um campo obrigatório')
    }

    return errors
  },

  validateEqualPasswords(password, confirmPassword) {
    let errors = []

    if (confirmPassword.value !== password) {
      errors.push('As senhas devem ser iguais')
    }

    return errors
  },

  validateAllData(formData) {
    const errors = []

    errors.push(validateFirstStep(formData))
    errors.push(validateSecondStep(formData))
    errors.push(validateThirdStep(formData))

    return errors.flat()
  },

  async handleRegister(data) {
    console.log(data)
    const response = await fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const message = `Erro ocorrido ao salvar: ${response.status}`;
      alert(message);
    } else {
      const saved = await response.json();
      alert(saved.join("\r\n"))
    }
  }
}