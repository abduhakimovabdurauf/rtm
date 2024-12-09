import {useStore} from "vuex";
import {computed, reactive} from "vue";

export function useCreateForm() {
    const store = useStore();
    const newCourse = reactive({
        name: '',
        duration: '',
        price: '',
        description: '',
        status: 'active',
        image: null,
    });

    const isFormValid = computed(() => {
        return (
            newCourse.name.trim() &&
            newCourse.duration.trim() &&
            newCourse.price > 0 &&
            newCourse.description.trim() &&
            newCourse.status.trim()
        );
    });

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', newCourse.name);
            formData.append('duration', newCourse.duration);
            formData.append('price', newCourse.price);
            formData.append('description', newCourse.description);
            formData.append('status', newCourse.status);
            if (newCourse.image) formData.append('image', newCourse.image);

            await store.dispatch('course/addCourse', formData);
            closeModal();

            newCourse.name = '';
            newCourse.duration = '';
            newCourse.price = '';
            newCourse.description = '';
            newCourse.status = 'active';
            newCourse.image = null;
        } catch (e) {
            console.error(e);
        }
    };

    const handleImageUpload = (event) => {
        newCourse.image = event.target.files[0];
    };

    function closeModal() {
        emit('close');
    }

    return {
        newCourse,
        handleSubmit,
        closeModal,
        handleImageUpload,
        isFormValid,
    };
}