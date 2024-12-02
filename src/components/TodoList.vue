<script setup lang="ts">
const DISPLAY_FIRST = 10

import { ref, useTemplateRef, onBeforeMount, computed, onMounted } from 'vue'
import { getTodos } from '@/apis/todos'
import type { Todo as TodoType } from '@/apis/todos'
import { findDropPosition } from '@/helpers/dom'
import Todo from './Todo.vue'

const id = ref(999) // id counter for user created todos
const newTodoTitle = ref('') // user input for new todos
const todos = ref<TodoType[]>([])

const elements = ref('elements')
const draggedTodo = ref(null)

const isError = ref(false)

onBeforeMount(() =>
  getTodos()
    .then((ts) => {
      todos.value = ts.slice(0, DISPLAY_FIRST)
    })
    .catch(() => (isError.value = true)),
)

const handleDragStart = (ev) => {
  ev.dataTransfer.dropEffect = ev.dataTransfer.effectAllowed = 'move'
  draggedTodo.value = ev.target
}

const handleDrop = ({ pageY }) => {
  const targetIdx = findDropPosition({ elementsList: elements.value.children, mouseY: pageY })
  const draggedId = +draggedTodo.value.getAttribute('data-id')
  const draggedIdx = todos.value.findIndex(({ id }) => id === draggedId)
  const isAscending = targetIdx < draggedIdx
  const offset = isAscending ? 0 : -1 // if target is below initial, account for 1 delete before insert

  const [removedItem] = todos.value.splice(draggedIdx, 1)
  todos.value.splice(targetIdx + offset, 0, removedItem)
}

const addTodo = (title) =>
  todos.value.push({ title, id: (id.value = id.value + 1), userId: 0, completed: false })
</script>
<template>
  <div v-if="!isError">
    <h1>Todo List</h1>
    <ul
      ref="elements"
      @dragover.prevent="$event.dataTransfer.dragEffect = 'move'"
      @drop.prevent.capture.stop="handleDrop"
    >
      <Todo
        v-for="todo in todos"
        :data-id="todo.id"
        tag="li"
        draggable="true"
        v-bind="todo"
        :key="todo.id"
        @dragstart="handleDragStart"
        @dragend="draggedTodo = null"
      />
    </ul>
    <input
      v-model="newTodoTitle"
      @keydown.enter="
        addTodo(newTodoTitle)
        newTodoTitle = ''
      "
      placeholder="New todo"
    />
  </div>
  <div v-else>Une erreur s'est produite</div>
</template>

<style scoped>
ul {
  list-style: none;
}
input {
  display: block;
  width: 250px;
  margin: 0 auto;
}
</style>
