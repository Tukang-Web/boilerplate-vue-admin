<template>
    <div v-if="message" :class="['alert', alertClass, 'alert-dismissible', 'fade', 'show']" role="alert">
        <strong>{{ message }}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="closeAlert"></button>
    </div>
</template>

<script>
export default {
    name: 'AlertComponent',
    props: {
        type: {
            type: String,
            default: 'success',
            validator: function (value) {
                return ['success', 'error', 'warning', 'info'].includes(value);
            }
        },
        message: {
            type: String,
            default: ''
        }
    },
    emits: ['close'],
    computed: {
        alertClass() {
            switch (this.type) {
                case 'success':
                    return 'alert-success';
                case 'error':
                    return 'alert-danger';
                case 'warning':
                    return 'alert-warning';
                case 'info':
                    return 'alert-info';
                default:
                    return '';
            }
        }
    },
    methods: {
        closeAlert() {
            this.$emit('close');
        }
    }
};
</script>
