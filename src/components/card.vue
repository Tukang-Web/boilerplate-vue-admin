<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title" v-if="title">
                {{ title }}
            </h4>

            <div class="row">
                <div class="col-12">
                    <slot></slot>
                </div>
            </div>
        </div>
        <div class="card-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>
