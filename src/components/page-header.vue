<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>

<template>

  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-sm-flex align-items-center justify-content-between">
        <h4 class="mb-sm-0">
          {{ $t(title) }}
        </h4>

        <div class="page-title-right">
          <ol class="breadcrumb m-0">
            <li class="breadcrumb-item"><router-link :to="{ name: 'dashboard' }">{{ $t(items[0].text) }}</router-link>
            </li>
            <li class="breadcrumb-item active">{{ $t(items[1].text) }}</li>
          </ol>
        </div>

      </div>
    </div>
  </div>
</template>
