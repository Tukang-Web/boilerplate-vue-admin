<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <router-link :to="{ name: createRouteName }" class="btn btn-primary" v-if="canCreate">
            {{ createLabel }}
        </router-link>
        <div class="ms-auto">
            <div class="input-group">
                <input type="text" class="form-control" :placeholder="searchPlaceholder" :value="search"
                    @input="updateSearch($event.target.value)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    search: {
        type: String,
        required: true,
    },
    createRouteName: {
        type: String,
        required: true,
    },
    createLabel: {
        type: String,
        required: true,
    },
    searchPlaceholder: {
        type: String,
        required: true,
    },
    canCreate: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['update:search']);

const updateSearch = (newSearch) => {
    emit('update:search', newSearch);
};
</script>
