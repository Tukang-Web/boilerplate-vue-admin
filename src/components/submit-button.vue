<template>
    <button :disabled="disabled" class="btn btn-primary" @click="onClick">
        <span v-if="loading">
            <i class="fa fa-spinner fa-spin"></i>
        </span>

        <span v-else>
            {{ label }}
        </span>
    </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: 'Submit',
    },
});

const emit = defineEmits(['click']);

const onClick = () => {
    emit('click');
};
</script>
