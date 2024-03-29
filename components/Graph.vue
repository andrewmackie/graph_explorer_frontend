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
        :style="{width: `${options.size.w}px`}"
        :element-type="elementType"
        :item-id="itemId"
        :item-s-i-d="itemSID"
        :item-t-i-d="itemTID"
        :item-name="itemName"
        :item-color="itemColor"
        @delete-item="emitDelete"
        @add-edge-from-selected="$emit('add-edge-from-selected', itemId)"
        @set-position="setPosition"
      />
      <DisplayAddingEdge
        id="displayAddingEdge"
        v-if="addingEdge"
        :style="{width: `${options.size.w}px`}"
        :adding-edge-node-sid="addingEdgeNodeSid"
        :adding-edge-node-tid="addingEdgeNodeTid"
        @cancel-add-edge="$emit('cancel-add-edge')"
      />
      <!-- The vue-d3-network component for displaying a graph of nodes and edges -->
      <!-- This is the SVG marker for the arrow heads - see https://vanseodesign.com/web-design/svg-markers/ -->
      <div style="height:0;">
        <svg>
          <defs>
            <marker
              id="m-end"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="1.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,3 L5,1.5 z" />
            </marker>
          </defs>
        </svg>
      </div>
      <D3Network
        ref="net"
        :net-nodes="nodesHighlighted"
        :net-links="edges"
        :options="options"
        :link-cb="lcb"
        @node-click="nodeClicked"
        @link-click="edgeClicked"
        :style="{width: `${options.size.w}px`}"
      />
    </div>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'
// import ContextMenu from '~/components/ContextMenu.vue'
import Display from '~/components/Display.vue'
import DisplayAddingEdge from '~/components/DisplayAddingEdge.vue'

export default {
  name: 'Graph',
  components: {
    D3Network,
    // ContextMenu,
    Display,
    DisplayAddingEdge
  },
  props: {
    addingEdge: {
      type: Boolean,
      default: false
    },
    addingEdgeNodeSid: {
      type: Number,
      default: null
    },
    addingEdgeNodeTid: {
      type: Number,
      default: null
    },
    /* To force Graph.vue to rerender and call the computed value again (to remove red dots from addingEdge) */
    keyToForceReRender: {
      type: Number,
      default: 1
    },
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
    contextMenuEvent: null,
    elementType: null,
    itemId: -1,
    itemSID: -1,
    itemTID: -1,
    itemName: null,
    itemColor: null,
    viewContextMenu: false
  }),
  computed: {
    nodesHighlighted () {
      // eslint-disable-next-line no-unused-vars
      const temp = this.keyToForceReRender /* Just mentioning the key forces a recompute */
      if (!this.nodes | this.nodes.length === 0 | !this.addingEdge | !this.addingEdgeNodeSid) {
        return this.nodes
      } else {
        /* Return the nodes with different colours for the addingEdgeNodeSid and addingEdgeNodeTid */
        const tempNodes = this.$_.cloneDeep(this.nodes)
        const self = this
        tempNodes.forEach(function (n) {
          if ([self.addingEdgeNodeSid, self.addingEdgeNodeTid].includes(n.id)) {
            n._color = '#ff0000'
          }
        })
        return tempNodes
      }
    }
  },
  watch: {
    windowHeight (newHeight, oldHeight) {
      this.txt = `it changed to ${newHeight} from ${oldHeight}`
    }
  },
  methods: {
    nodeClicked (event, node) {
      if (!this.addingEdge) {
        this.elementType = 'Node'
        this.itemId = node.id
        this.itemSID = -1
        this.itemTID = -1
        this.itemName = node.name
        this.itemColor = node._color
        this.$scrollTo('body')
        this.addingEdgeNodeSid = null
        this.addingEdgeNodeTid = null
      } else {
        this.$emit('add-edge-node', node.id)
      }
    },
    setPosition (data) {
      // Pass it up the line to index.vue
      this.$emit('set-position', data)
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
    },
    lcb (link) {
      link._svgAttrs = { 'marker-end': 'url(#m-end)' } //, 'marker-start': 'url(#m-start)' }
      return link
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=PT+Sans');

* {
  box-shadow: none !important;
}
div {
  font-family: 'PT Sans', sans-serif;
  background-color: #fff;
  /* box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); */
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

#m-end path, #m-start path {
  fill: #1aad8d;
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
