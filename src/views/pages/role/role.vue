<script setup>
import { useRoleStore } from '@/stores/role';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Card, Row, Col, Button } from '@/components/index';


const { t } = useI18n();

const roleStore = useRoleStore();
const { loading } = storeToRefs(roleStore);
const { fetchRole } = roleStore;

const route = useRoute();

const role = ref({
    id: 0,
    name: '',
    permissions: []
});

const title = t("role.detail.title");
const items = [
    { text: t("tukangweb") },
    { text: title, active: true }
];

const fetchRoleData = async () => {
    try {
        const data = await fetchRole(route.params.id);
        role.value = data;
    } catch (err) {
        console.error(err);
    }
};

onMounted(() => {
    fetchRoleData();
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
                        <table class="table table-bordered table-striped" v-if="!loading">
                            <tbody>
                                <tr>
                                    <th>{{ t('role.list.name') }}</th>
                                    <td>{{ role.name }}</td>
                                </tr>
                                <tr>
                                    <th>{{ t('role.list.permissions') }}</th>
                                    <td>
                                        <ul>
                                            <li v-for="permission in role.permissions" :key="permission.id">
                                                {{ permission }}
                                            </li>
                                        </ul>
                                    </td>
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