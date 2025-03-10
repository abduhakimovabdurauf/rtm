// src/use/login-form.js
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export function useLoginForm() {
    const store = useStore()
    const { handleSubmit, isSubmitting, submitCount } = useForm()

    const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField(
        'login',
        yup
            .string()
            .trim()
            .required('Email, login yoki telefon raqam kiritilishi shart')
    )

    const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Parol kiritilishi shart')
            .min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
    )

    const router = useRouter()
    const submit = handleSubmit(async values => {
        try {
            const login = await store.dispatch('auth/login', values);

            const roleNames = login.roles?.map(r => r.name) || [];

            const allowedRoles = ["admin", "Director"];

            if (allowedRoles.some(role => roleNames.includes(role))) {
                await router.push('/dashboard');
            } else {
                await router.push('/profile');
            }
        } catch (e) {
            console.error(e.response);
        }
    });


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
