<template>
  <div>
    <D3Network
      ref='net'
      :net-nodes="nodes"
      :net-links="edges"
      :options="options"
      v-on:node-click="nodeClicked"
      v-on:link-click="edgeClicked"
    />
  </div>
</template>

<script>

import D3Network from 'vue-d3-network'

export default {
  name: 'Graph',
  components: {
    D3Network
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
  methods: {
    nodeClicked (event, node) {
      // alert(node.id)
    },
    edgeClicked (event, edge) {
      // alert(edge.id)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=PT+Sans');

div {
  font-family: 'PT Sans', sans-serif;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 20px;
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
