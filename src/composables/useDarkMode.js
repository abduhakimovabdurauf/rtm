import { ref, watchEffect } from "vue";

export function useDarkMode() {
    const isDark = ref(localStorage.getItem("theme") === "dark");

    const toggleDarkMode = () => {
        isDark.value = !isDark.value;
        localStorage.setItem("theme", isDark.value ? "dark" : "light");
        updateTheme();
    };

    const updateTheme = () => {
        if (isDark.value) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    watchEffect(updateTheme);

    return { isDark, toggleDarkMode };
}
