<template>
    <q-item v-if="!parent" class="flex item-menu-list" clickable
            :tag="isParentItem ? 'a' : 'div'"
            :href="isParentItem ? link : ''">
      <div class="item-menu">
        <q-icon class="menu-icon" :name="icon" />
        {{ label }}
      </div>
    </q-item>

  <q-item v-else v-show="isVisible" class="flex subitem-menu-list" clickable tag="a" :href="link">
    <div class="item-menu">
      <q-icon class="menu-icon" :name="icon" />
      {{ label }}
    </div>
  </q-item>
</template>

<script>
export default {
  name: 'ItemMenu',
  props: {
    link: {
      required: true,
      type: String,
    },
    icon: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    parent: {
      required: false,
      type: String,
    },
    routeSelected: {
      required: true,
      type: String,
    },
    isParentItem: {
      required: false,
      type: Boolean,
    },
  },
  computed: {
    isVisible() {
      return this.routeSelected === `/${this.parent}`;
    },
  },
};
</script>

<style scoped>

</style>
