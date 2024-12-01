<script setup lang="ts">
import type { Todo } from '../apis/todos'
import { computed } from 'vue'

const props = withDefaults(defineProps<Todo & { tag?: string }>(), { tag: 'div' })
const completionIndicator = computed(() => (props.completed ? '✅' : '❌'))
</script>

<template>
  <Component :is="props.tag" :class="['todo', { 'todo--completed': props.completed }]">
    <p>{{ completionIndicator }} - {{ props.title }}</p>
  </Component>
</template>

<style scoped>
.todo {
  background-color: red;
  border-radius: 10px;
  padding: 10px;
  margin: 4px;
}
.todo--completed {
  background-color: green;
}
</style>
