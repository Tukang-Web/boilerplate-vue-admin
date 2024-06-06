<script setup>
import { usePermissionStore } from '@/stores/permission';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Card, Row, Col, Button } from '@/components/index';

const { t } = useI18n();

const permissionStore = usePermissionStore();
const { loading } = storeToRefs(permissionStore);
const { fetchPermission } = permissionStore;

const route = useRoute();

const permission = ref({
    id: 0,
    name: '',
});

const title = t("permission.detail.title");
const items = [
    { text: t("tukangweb") },
    { text: title, active: true }
];

const fetchPermissionData = async () => {
    try {
        const data = await fetchPermission(route.params.id);
        permission.value = data;
    } catch (err) {
        console.error(err);
    }
};

onMounted(() => {
    fetchPermissionData();
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
                        <table class="table table-bordered table-striped" v-if="!loading">
                            <tbody>
                                <tr>
                                    <th>{{ t('permission.list.name') }}</th>
                                    <td>{{ permission.name }}</td>
                                </tr>
                            </tbody>
                        </table>
                        </Col>
                    </Row>
                </template>
            </Card>
            </Col>
        </Row>
    </Layout>
</template>