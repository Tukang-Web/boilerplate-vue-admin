<template>
    <div :class="['row', customClass]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Row',
    props: {
        customClass: {
            type: String,
            default: ''
        }
    }
};
</script>
