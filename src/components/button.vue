<template>
    <component :is="linkComponent" :to="to" :class="['btn', buttonClasses]" :disabled="disabled" @click="handleClick">
        <slot></slot>
    </component>
</template>

<script>
export default {
    name: 'ButtonComponent',
    props: {
        variant: {
            type: String,
            default: 'primary',
        },
        size: {
            type: String,
            default: 'md',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        itemId: {
            type: [String, Number],
            default: null,
        },
        handleClick: {
            type: Function,
            default: () => { },
        },
        to: {
            type: [String, Object],
            default: null,
        },
    },
    computed: {
        buttonClasses() {
            return [
                `btn-${this.variant}`,
                `btn-${this.size}`,
                this.disabled ? 'disabled' : '',
            ];
        },
        linkComponent() {
            return this.to ? 'router-link' : 'button';
        },
    },
};
</script>