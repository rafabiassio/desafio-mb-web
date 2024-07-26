import { createApp, ref, reactive, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' //TODO: prod cdn

import { handleErrorsAlert, handleRegister, validateFirstStep, validateSecondStep, validateThirdStep, validateAllData, validateEqualPasswords } from '../../utils/validators'


createApp({
  setup() {
    const formData = reactive({
      email: '',
      documentType: '',
      name: '',
      CPF: '',
      CNPJ: '',
      date: '',
      phone: '',
      password: ''
    });
    const step = ref(1)
    const confirmPassword = ref('')

    const title = computed(() => {
      const stepTitle = {
        1: 'Seja bem vindo(a)',
        2: formData.documentType === 'PF' ? 'Pessoa física' : 'Pessoa jurídica',
        3: 'Senha de acesso',
        4: 'Revise suas informações',
      }

      return stepTitle[step.value];
    })

    const handleBack = () => {
      step.value -= 1;

      if (confirmPassword.value) {
        confirmPassword.value = ''
      }
    };

    const handleFirstStepSubmit = () => {
      const errors = validateFirstStep(formData)

      if (!errors.length) {
        step.value += 1;
      } else {
        handleErrorsAlert(errors)
      }
    };

    const handleSecondStepSubmit = () => {
      const errors = validateSecondStep(formData)

      if (!errors.length) {
        step.value += 1;
      } else {
        handleErrorsAlert(errors)
      }
    };

    const handleThirdStepSubmit = () => {
      const errors = validateThirdStep(formData)

      if (!errors.length) {
        step.value += 1;
      } else {
        handleErrorsAlert(errors)
      }
    };

    const handleFourthStepSubmit = () => {
      const errors = validateAllData(formData)
      errors.push(validateEqualPasswords(formData.password, confirmPassword))

      if (!errors.flat().length) {
        handleRegister(formData)
      } else {
        handleErrorsAlert(errors)
      }
    };

    return {
      form: formData,
      step,
      title,
      confirmPassword,
      handleBack,
      handleFirstStepSubmit,
      handleSecondStepSubmit,
      handleThirdStepSubmit,
      handleFourthStepSubmit
    }
  }
}).mount('#registration')

