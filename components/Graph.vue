<template>
  <div>
    <div
      style="position: relative !important;"
      @contextmenu.prevent="openContextMenu"
    >
      <!--
      <ContextMenu
        v-if="viewContextMenu"
        :menu-items="[{title: 'Foo'}, {title: 'Bar'}]"
        :e="contextMenuEvent"
        @close-context-menu="viewContextMenu=false"
      />
      -->
      <!-- Progress bar (when performing AJAX requests -->
      <v-progress-linear
        v-if="loading"
        color="blue accent-4"
        indeterminate
        rounded
        height="4"
        style="position: absolute; top: 0; left: 0; z-index: 10;"
      />
      <!-- A one-line info bar which appears at the top of the D3Network when a node or edge is clicked -->
      <Display
        id="display"
        v-if="itemId > 0"
        :element-type="elementType"
        :item-id="itemId"
        :item-s-i-d="itemSID"
        :item-t-i-d="itemTID"
        :item-name="itemName"
        :item-color="itemColor"
        @delete-item="emitDelete"
      />
      <!-- The vue-d3-network component for displaying a graph of nodes and edges -->
      <D3Network
        ref="net"
        :net-nodes="nodes"
        :net-links="edges"
        :options="options"
        @node-click="nodeClicked"
        @link-click="edgeClicked"
      />
    </div>
  </div>
</template>

<script>

import D3Network from 'vue-d3-network'
// import ContextMenu from '~/components/ContextMenu.vue'
import Display from '~/components/Display.vue'

export default {
  name: 'Graph',
  components: {
    D3Network,
    // ContextMenu,
    Display
  },
  props: {
    nodes: {
      type: Array,
      default: null
    },
    edges: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    elementType: null,
    itemId: -1,
    itemSID: -1,
    itemTID: -1,
    itemName: null,
    itemColor: null,
    viewContextMenu: false,
    contextMenuEvent: null
  }),
  methods: {
    nodeClicked (event, node) {
      this.elementType = 'Node'
      this.itemId = node.id
      this.itemSID = -1
      this.itemTID = -1
      this.itemName = node.name
      this.itemColor = node._color
      this.$scrollTo('body')
    },
    edgeClicked (event, edge) {
      this.elementType = 'Edge'
      this.itemId = edge.id
      this.itemSID = edge.sid
      this.itemTID = edge.tid
      this.itemName = edge.name
      this.itemColor = edge._color
      this.$scrollTo('body')
    },
    emitDelete (data) {
      this.$emit('delete-item', data)
      this.itemId = -1
    },
    openContextMenu (e) {
      this.contextMenuEvent = e
      this.viewContextMenu = true
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=PT+Sans');

div {
  font-family: 'PT Sans', sans-serif;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  position: relative;
}
.title{
  position:absolute;
  text-align: center;
  left: 2em;
}
h1,a{
  color: #1aad8d;
  text-decoration: none;
}

ul.menu {
  list-style: none;
  position: absolute;
  z-index: 100;
  min-width: 20em;
  text-align: left;
}
ul.menu li {
  margin-top: 1em;
  position: relative;
}
</style>

<style>

.node {
  stroke: rgba(18, 120, 98, 0.3);
  stroke-width:  3px;
}
.node:hover {
  stroke: #ee3b3b;
  stroke-width:  4px;
}

.link {
  stroke: rgba(18, 120, 98, 0.3);
  stroke-width:  3px;
}
.link:hover {
  stroke: #ee3b3b !important;
  stroke-width: 4px;
}
</style>
