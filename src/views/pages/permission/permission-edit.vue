<script setup>
import { useI18n } from 'vue-i18n';
import { usePermissionStore } from '@/stores/permission';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref, onMounted, onBeforeMount } from 'vue';
import { Card, Row, Col, Button } from '@/components/index';

const { t } = useI18n();

const title = t('permission.edit.title');
const items = [
    { text: t('tukangweb') },
    { text: title, active: true },
];

const route = useRoute();

const permission = ref({
    id: 0,
    name: '',
});


const permissionStore = usePermissionStore();
const { loading, error } = storeToRefs(permissionStore);
const { updatePermission, fetchPermission } = permissionStore;


const fetchPermissionData = async () => {
    const data = await fetchPermission(route.params.id);

    permission.value = data;
};

const handleSubmit = async () => {
    await updatePermission(permission.value);
};

onMounted(() => {
    fetchPermissionData();
});

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
                        <div v-if="loading" class="text-center">
                            <i class="fa fa-spinner fa-spin fa-2x"></i>
                        </div>
                        <form v-if="!loading">
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
                        <span v-else>{{ t('permission.edit.submit') }}</span>
                    </Button>
                </template>
            </Card>
            </Col>
        </Row>
    </Layout>
</template>
