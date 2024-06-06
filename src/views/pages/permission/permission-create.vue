<script setup>
import { useI18n } from 'vue-i18n';
import { usePermissionStore } from '@/stores/permission';
import { storeToRefs } from 'pinia';
import { ref, onBeforeMount } from 'vue';
import { Card, Row, Col, Button } from '@/components/index';


const { t } = useI18n();

const title = t('permission.create.title');
const items = [
    { text: t('tukangweb') },
    { text: title, active: true },
];

const permission = ref({
    name: '',
});

const permissionStore = usePermissionStore();
const { loading, error } = storeToRefs(permissionStore);
const { createPermission } = permissionStore;

const handleSubmit = async () => {
    await createPermission(permission.value);
};

onBeforeMount(() => {
    error.value = null;
});
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />

        <Row>
            <Col :size="12" class="mb-3">
            <Button :to="{ name: 'permission' }" variant="danger">
                <i class="fa fa-arrow-left"></i>
                {{ t('permission.create.back') }}
            </Button>
            </Col>
            <Col :size="12">
            <Card>
                <template #default>
                    <Row>
                        <Col :size="12">
                        <form>
                            <BFormGroup class="mb-3" label-cols-sm="12" label-cols-lg="12"
                                :label="t('permission.create.name')">
                                <BFormInput for="permissionName" id="permissionName" v-model="permission.name"
                                    type="text" :state="error?.name ? false : null"
                                    :placeholder="t('permission.create.name')" />
                                <BFormInvalidFeedback v-if="error?.name">
                                    {{ error.name.join(', ') }}
                                </BFormInvalidFeedback>
                            </BFormGroup>
                        </form>
                        </Col>
                    </Row>
                </template>
                <template #footer>
                    <Button variant="primary" @click="handleSubmit">
                        <span v-if="loading">
                            <i class="fa fa-spinner fa-spin"></i>
                        </span>
                        <span v-else>{{ t('permission.create.submit') }}</span>
                    </Button>
                </template>
            </Card>
            </Col>
        </Row>
    </Layout>
</template>
