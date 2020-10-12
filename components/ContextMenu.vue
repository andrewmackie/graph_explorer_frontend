<!-- Right-click context menu adapted from https://codepen.io/SimpleSoftwareIO/pen/yNwYJb -->

<template>
  <ul
    id="context-menu"
    ref="contextMenu"
    tabindex="-1"
    :style="{ top:contextMenuTop, left:contextMenuLeft }"
    @blur="closeContextMenu"
  >
    <li
      v-for="(item, index) in menuItems"
      :key="index"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ContextMenu',
  data: () => ({
    contextMenuTop: '0px',
    contextMenuLeft: '0px'
  }),
  props: {
    e: {
      type: MouseEvent
    },
    menuItems: {
      type: Array
    }
  },
  methods: {
    setContextMenu (top, left) {
      const largestHeight = this.$refs.contextMenu.parentElement.parentElement.offsetHeight - this.$refs.contextMenu.offsetHeight - 25
      const largestWidth = this.$refs.contextMenu.parentElement.parentElement.offsetWidth - this.$refs.contextMenu.offsetWidth - 25
      if (top > largestHeight) { top = largestHeight }
      if (left > largestWidth) { left = largestWidth }
      this.contextMenuTop = top + 'px'
      this.contextMenuLeft = left + 'px'
    },
    closeContextMenu () {
      console.log('closing')
      this.$emit('close-context-menu')
    }
  },
  mounted () {
    this.$refs.contextMenu.focus()
    this.setContextMenu(this.e.y, this.e.x)
    this.e.preventDefault()
  }
}
</script>

<style scoped>
#context-menu {
  background: #FAFAFA;
  border: 1px solid #eee;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 250px;
  z-index: 999999;
}

#context-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 35px;
}

#context-menu li:last-child {
    border-bottom: none;
}

#context-menu li:hover {
    background: #1E88E5;
    color: #FAFAFA;
}
</style>
