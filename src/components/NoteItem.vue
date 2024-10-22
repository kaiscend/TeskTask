<template>
  <li>
    <router-link :to="`/note/${note.id}`">{{ note.title }}</router-link>
    <button @click="$emit('delete', note.id)">Удалить</button>
  </li>
</template>

<script>
export default {
  props: {
    note: Object,
  },
};
</script>
