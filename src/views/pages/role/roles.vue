<script setup>
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoleStore } from '@/stores/role';
import { storeToRefs } from 'pinia';
import { can } from '@/helpers/permissionHelper';
import { Card, HeaderTable, Alert, Row, Col, Button } from '@/components/index';


const { t } = useI18n();

const roleStore = useRoleStore();
const { roles, loading, error, success } = storeToRefs(roleStore);
const { fetchRoles, deleteRole } = roleStore;

fetchRoles();

const search = ref('');
const title = t("role.list.title");
const items = [
  { text: t("tukangweb") },
  { text: title, active: true }
];

const headers = [
  { text: t('role.list.name'), value: 'name' },
  { text: t('role.list.permissions'), value: 'permissions' },
  { text: t('role.list.actions'), value: 'operation', width: 300 }
];

function confirmDelete(id) {
  return Swal.fire({
    title: t('alert.delete.title'),
    text: t('alert.delete.text'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: t('alert.delete.confirm'),
    cancelButtonText: t('alert.delete.cancel'),
    reverseButtons: true
  });
}

function handleDelete(id) {
  confirmDelete(id).then((result) => {
    if (result.isConfirmed) {
      deleteRole(id)
        .then(() => {
          Swal.fire(
            t('alert.success'),
            t('alert.delete.success'),
            'success'
          );
          fetchRoles();
        })
        .catch((error) => {
          Swal.fire(
            t('alert.error'),
            error.message || t('alert.delete.error'),
            'error'
          );
        });
    }
  });
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <Row>
      <Col :size="12">
      <Alert :type="success ? 'success' : 'error'" :message="success" @close="success = ''" />
      </Col>
      <Col :size="12">
      <Card>
        <template #default>
          <Row>
            <Col :size="12">
            <HeaderTable :search="search" :create-route-name="'role-create'" :create-label="t('role.list.create')"
              :search-placeholder="t('role.list.search')" :can-create="can('role-create')"
              @update:search="search = $event" />
            </Col>
            <Col :size="12">
            <EasyDataTable :headers="headers" :items="roles" :loading="loading" :error="error" :search-value="search"
              :show-index="true" class="data-table">
              <template #item-permissions="item">
                {{ item.permissions.length }} {{ t('role.list.permissions') }}
              </template>
              <template #item-operation="item">
                <Button v-if="can('role-edit')" :to="{ name: 'role-edit', params: { id: item.id } }" variant="primary"
                  size="sm" class="me-2">
                  {{ t('role.list.edit') }}
                </Button>

                <Button v-if="can('role-list')" :to="{ name: 'role-view', params: { id: item.id } }" variant="info"
                  size="sm" class="me-2">
                  {{ t('role.list.detail') }}
                </Button>

                <Button v-if="can('role-delete')" variant="danger" size="sm" :itemId="item.id" :disabled="false"
                  :handleClick="() => handleDelete(item.id)">
                  {{ t('role.list.delete') }}
                </Button>
              </template>
            </EasyDataTable>
            </Col>
          </Row>
        </template>
      </Card>
      </Col>
    </Row>
  </Layout>
</template>
