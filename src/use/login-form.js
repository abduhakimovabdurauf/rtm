// src/use/login-form.js
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'

export function useLoginForm() {
    const { handleSubmit, isSubmitting, submitCount } = useForm()

    const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Email kiritilishi shart')
            .email('To\'g\'ri email kiriting')
    )

    const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Parol kiritilishi shart')
            .min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
    )

    const submit = handleSubmit((values) => {
        console.log(values)
    })

    const tryCount = computed(() => submitCount.value > 3)

    watch(tryCount, val => {
        if (val) {
            setTimeout(() => {
                submitCount.value = 0
            }, 3000)
        }
    })

    return {
        email,
        emailError,
        emailBlur,
        password,
        passwordError,
        passwordBlur,
        submit,
        isSubmitting,
        tryCount
    }
}
