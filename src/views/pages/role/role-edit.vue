<script setup>
import { useI18n } from 'vue-i18n';
import { useRoleStore } from '@/stores/role';
import { usePermissionStore } from '@/stores/permission';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref, onMounted, onBeforeMount } from 'vue';
import Multiselect from 'vue-multiselect';
import { Card, Row, Col, Button } from '@/components/index';


const { t } = useI18n();

const title = t('role.edit.title');
const items = [
    { text: t('tukangweb') },
    { text: title, active: true },
];

const route = useRoute();

const role = ref({
    id: 0,
    name: '',
    hasPermission: []
});


const roleStore = useRoleStore();
const permissionStore = usePermissionStore();
const { loading, error } = storeToRefs(roleStore);
const { updateRole, fetchRole } = roleStore;

const { permissions } = storeToRefs(permissionStore);
const { fetchPermissions } = permissionStore;


const fetchRoleData = async () => {
    const data = await fetchRole(route.params.id);
    if (data) {
        role.value.id = data.id;
        role.value.name = data.name;
        role.value.hasPermission = data.permissions.map(permission => ({ name: permission }));
    }
};

const handleSubmit = async () => {
    const { id, name, hasPermission } = role.value;
    const payload = {
        id,
        name,
        permissions: hasPermission.map(permission => permission.name)
    };
    await updateRole(payload);
};

onMounted(() => {
    fetchPermissions();
    fetchRoleData();
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
            <Button :to="{ name: 'role' }" variant="danger">
                <i class="fa fa-arrow-left"></i>
                {{ t('role.create.back') }}
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
                                :label="t('role.create.name')">
                                <BFormInput for="roleName" id="roleName" v-model="role.name" type="text"
                                    :state="error?.name ? false : null" :placeholder="t('role.create.name')" />
                                <BFormInvalidFeedback v-if="error?.name">
                                    {{ error.name.join(', ') }}
                                </BFormInvalidFeedback>
                            </BFormGroup>

                            <BFormGroup class="mb-3" label-cols-sm="12" label-cols-lg="12"
                                :label="t('role.create.permissions')">
                                <Multiselect v-model="role.hasPermission" :options="permissions" :multiple="true"
                                    label="name" track-by="name" placeholder="Select permissions" />
                                <BFormInvalidFeedback v-if="error?.permissions">
                                    {{ error.permissions.join(', ') }}
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
                        <span v-else>{{ t('role.edit.submit') }}</span>
                    </Button>
                </template>
            </Card>
            </Col>
        </Row>
    </Layout>
</template>

<style>
.multiselect__tags {
    width: 100% !important;
}
</style>