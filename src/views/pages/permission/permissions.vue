<script setup>
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePermissionStore } from '@/stores/permission';
import { storeToRefs } from 'pinia';
import { can } from '@/helpers/permissionHelper';
import { Card, HeaderTable, Alert, Row, Col, Button } from '@/components/index';

const { t } = useI18n();

const permissionStore = usePermissionStore();
const { permissions, loading, error, success } = storeToRefs(permissionStore);
const { fetchPermissions, deletePermission } = permissionStore;

fetchPermissions();

const search = ref('');
const title = t("permission.list.title");
const items = [
  { text: t("tukangweb") },
  { text: title, active: true }
];

const headers = [
  { text: t('permission.list.name'), value: 'name' },
  { text: t('permission.list.actions'), value: 'operation', width: 300 }
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
      deletePermission(id)
        .then(() => {
          Swal.fire(
            t('alert.success'),
            t('alert.delete.success'),
            'success'
          );
          fetchPermissions();
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
            <HeaderTable :search="search" :create-route-name="'permission-create'"
              :create-label="t('permission.list.create')" :search-placeholder="t('permission.list.search')"
              :can-create="can('permission-create')" @update:search="search = $event" />
            </Col>
            <Col :size="12">
            <EasyDataTable :headers="headers" :items="permissions" :loading="loading" :error="error"
              :search-value="search" :show-index="true" class="data-table">
              <template #item-operation="item">
                <Button v-if="can('permission-edit')" :to="{ name: 'permission-edit', params: { id: item.id } }"
                  variant="primary" size="sm" class="me-2">
                  {{ t('permission.list.edit') }}
                </Button>

                <Button v-if="can('permission-list')" :to="{ name: 'permission-view', params: { id: item.id } }"
                  variant="info" size="sm" class="me-2">
                  {{ t('permission.list.detail') }}
                </Button>

                <Button v-if="can('permission-delete')" variant="danger" size="sm" :itemId="item.id" :disabled="false"
                  :handleClick="() => handleDelete(item.id)">
                  {{ t('permission.list.delete') }}
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