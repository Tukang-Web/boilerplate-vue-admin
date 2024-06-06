<template>
    <div :class="colClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Col',
    props: {
        size: {
            type: [String, Number],
            default: null
        },
        sm: {
            type: [String, Number],
            default: null
        },
        md: {
            type: [String, Number],
            default: null
        },
        lg: {
            type: [String, Number],
            default: null
        },
        xl: {
            type: [String, Number],
            default: null
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    computed: {
        colClass() {
            const classes = [];

            if (this.size !== null) {
                classes.push(`col-${this.size}`);
            }

            if (this.sm !== null) {
                classes.push(`col-sm-${this.sm}`);
            }
            if (this.md !== null) {
                classes.push(`col-md-${this.md}`);
            }
            if (this.lg !== null) {
                classes.push(`col-lg-${this.lg}`);
            }
            if (this.xl !== null) {
                classes.push(`col-xl-${this.xl}`);
            }

            if (this.customClass) {
                classes.push(this.customClass);
            }

            return classes.join(' ');
        }
    }
};
</script>
