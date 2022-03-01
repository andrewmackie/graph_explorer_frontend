<template>
  <v-container
    id="main"
    justify="center"
    align="center"
  >
    <div
      class="flex-container-space-between"
      style="width: 100%; margin-bottom: 1.5rem;"
    >
      <div
        class="flex-item"
        style="width: fit-content; margin-bottom: 40px;"
      >
        An app for displaying and editing a simple graph (using a CRUD REST API with <nuxt-link to="/api">OpenAPI documentation</nuxt-link>):
      </div>
      <!--
      <div
        class="flex-item"
        style="width: fit-content;"
      >
        <v-btn
          v-if="!addingEdge"
          @click="addingEdge=true; addingEdgeNodeSid=null; addingEdgeNodeTid=null; keyToForceReRender += 1;"
        >
          Add Edge
        </v-btn>
        <v-btn
          v-if="addingEdge"
          @click="cancelAddEdge()"
        >
          Cancel Add Edge
        </v-btn>
      </div>
    -->
    </div>
    <div
      v-if="errorMessage"
      class="error-message"
    >
      {{ errorMessage }}
    </div>
    <Graph
      :nodes="nodes"
      :edges="edges"
      :options="d3Options"
      :loading="loading"
      :adding-edge="addingEdge"
      :adding-edge-node-sid="addingEdgeNodeSid"
      :adding-edge-node-tid="addingEdgeNodeTid"
      :key-to-force-re-render="keyToForceReRender"
      @add-edge-node="addEdgeNode"
      @delete-item="deleteItem"
      @add-edge-from-selected="addEdgeFromSelected"
      @cancel-add-edge="cancelAddEdge"
      @set-position="setPosition"
    />
    <div style="margin-top: 1.5rem;">
      Nodes and edges are displayed in the data tables below (where items can be created, edited and deleted):
    </div>
    <div
      v-if="errorMessage"
      class="error-message"
    >
      {{ errorMessage }}
    </div>
    <Edit
      name="Node"
      :headers="nodeHeaders"
      :items="nodes"
      :loading="loading"
      :default-item="nodeDefaultItem"
      @delete-item="deleteItem"
      @put-item="putItem"
      @post-item="postItem"
    />
    <div
      v-if="errorMessage"
      class="error-message"
    >
      {{ errorMessage }}
    </div>
    <Edit
      name="Edge"
      :headers="edgeHeaders"
      :items="edges"
      :loading="loading"
      @delete-item="deleteItem"
      @put-item="putItem"
      @post-item="postItem"
    />
  </v-container>
</template>

<script>
import axios from 'axios'
import Edit from '~/components/Edit.vue'
import Graph from '~/components/Graph.vue'

export default {
  name: 'Index',
  components: {
    Edit,
    Graph
  },
  data: () => ({
    addingEdge: false,
    addingEdgeNodeSid: null,
    addingEdgeNodeTid: null,
    edges: [],
    edgeHeaders: [
      { text: 'Id', value: 'id', align: 'center' },
      { text: 'SID', value: 'sid', align: 'center' },
      { text: 'TID', value: 'tid', align: 'center' },
      { text: 'Name', value: 'name', align: 'center' },
      { text: 'Color', value: '_color', align: 'center' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
    ],
    edgeDefaultItem: {
      id: 1,
      sid: 1,
      tid: 2,
      name: 'Foo',
      _color: '#666666'
    },
    errorMessage: null,
    loading: true,
    keyToForceReRender: 1,
    nodes: [],
    nodesTemp: [],
    nodeHeaders: [
      { text: 'Id', value: 'id', align: 'center' },
      { text: 'Name', value: 'name', align: 'center' },
      { text: 'Color', value: '_color', align: 'center' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
    ],
    nodeDefaultItem: {
      id: 1,
      name: '',
      _color: '#666666'
    },
    d3Options: {
      force: 2000,
      /* forces: {
        // X: 500,
        // Y: 500
        // ManyBody: -10
        Center: 10
      }, */
      radius: 0.5,
      size: { h: 900, w: 1400 },
      nodeSize: 15,
      nodeLabels: true,
      linkLabels: true,
      canvas: false,
      fontSize: 12
    },
    serverUrl: process.env.serverUrl,
    apiVersion: process.env.apiVersion
    // serverUrl: 'http://localhost:5000/api/v0'
  }),
  mounted () {
    axios({
      method: 'get',
      url: `${this.serverUrl}/api/v${this.apiVersion}/graph`
    })
    // See https://michaelnthiessen.com/this-is-undefined/ 'Using the right function when fetching data' which fixed 'this is undefined'
      .then((response, data) => {
        // handle success
        this.nodes = this.positionNodes(response.data.nodes)
        this.edges = response.data.edges
      })
      .catch((error, data) => {
        // handle error
        this.nodes = []
        this.edges = []
        this.errorMessage = error.toString()
      })
      .finally((data) => {
        // always executed
        this.loading = false
      })
  },
  methods: {
    addEdgeNode (data) {
      if (this.addingEdge) {
        if (!this.addingEdgeNodeSid) {
          this.addingEdgeNodeSid = data
        } else {
          if (data === this.addingEdgeNodeSid) {
            this.addingEdgeNodeSid = null
            this.addingEdge = false
            return
          }
          this.addingEdgeNodeTid = data
          this.postItem({
            noun: 'edge',
            item: {
              sid: this.addingEdgeNodeSid,
              tid: this.addingEdgeNodeTid
            }
          })
          this.addingEdge = false
          /* Keep this.addingEdgeNodeSid and Tid to display the newly-created link */
        }
      }
    },
    addEdgeFromSelected (nodeId) {
      this.addingEdge = true
      this.addingEdgeNodeSid = nodeId
    },
    setPosition (data) {
      if (data) { this.putItem(data) }
    },
    cancelAddEdge () {
      this.addingEdge = false
      this.addingEdgeNodeSid = null
      this.addingEdgeNodeTid = null
      this.keyToForceReRender += 1
    },
    deleteItem (data) {
      this.loading = true
      this.errorMessage = null
      axios({
        method: 'delete',
        url: `${this.serverUrl}/api/v${this.apiVersion}/${data.noun}/${data.id}`
      })
        // See https://michaelnthiessen.com/this-is-undefined/ 'Using the right function when fetching data' which fixed 'this is undefined'
        .then((response, data) => {
          // handle success
          this.nodes = response.data.nodes
          this.edges = response.data.edges
        })
        .catch((error, data) => {
          // handle error
          this.errorMessage = error.toString()
        })
        .finally((data) => {
          // always executed
          this.loading = false
          this.addingEdgeNodeSid = null
          this.addingEdgeNodeTid = null
        })
    },
    positionNodes (nodes) {
      // Determine the positions
      const xMin = 50
      const labelLength = 100 // Replace with calc based on actual lengths
      const xMax = this.d3Options.size.w - xMin - labelLength
      const yMin = 40
      const yMax = this.d3Options.size.h - yMin
      const xCenter = Math.round(this.d3Options.size.w / 2)
      const yCenter = Math.round(this.d3Options.size.h / 2)
      nodes.forEach(function (n) {
        if (n.position === 'topLeft') {
          [n.fx, n.fy] = [xMin, yMin]
        } else if (n.position === 'topRight') {
          [n.fx, n.fy] = [xMax, yMin]
        } else if (n.position === 'bottomLeft') {
          [n.fx, n.fy] = [xMin, yMax]
        } else if (n.position === 'bottomRight') {
          [n.fx, n.fy] = [xMax, yMax]
        } else if (n.position === 'center') {
          [n.fx, n.fy] = [xCenter, yCenter]
        }
      })
      return nodes
    },
    putItem (data) {
      this.loading = true
      this.errorMessage = null
      axios({
        method: 'put',
        url: `${this.serverUrl}/api/v${this.apiVersion}/${data.noun}/${data.id}`,
        data: data.item
      })
        // See https://michaelnthiessen.com/this-is-undefined/ 'Using the right function when fetching data' which fixed 'this is undefined'
        .then((response, data) => {
          // handle success
          this.nodes = this.positionNodes(response.data.nodes)
          this.edges = response.data.edges
        })
        .catch((error, data) => {
          // handle error
          this.errorMessage = error.toString()
        })
        .finally((data) => {
          // always executed
          this.loading = false
          this.addingEdgeNodeSid = null
          this.addingEdgeNodeTid = null
        })
    },
    postItem (data) {
      this.loading = true
      this.errorMessage = null
      axios({
        method: 'post',
        url: `${this.serverUrl}/api/v${this.apiVersion}/${data.noun}`,
        data: data.item
      })
        // See https://michaelnthiessen.com/this-is-undefined/ 'Using the right function when fetching data' which fixed 'this is undefined'
        .then((response, data) => {
          // handle success
          this.nodes = this.positionNodes(response.data.nodes)
          this.edges = response.data.edges
        })
        .catch((error, data) => {
          // handle error
          this.errorMessage = error.toString()
        })
        .finally((data) => {
          // always executed
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
  .v-application--wrap {
    background-color: #ccc !important;
    width: 30px !important;
  }
</style>

<style scoped>
  .v-application--wrap {
    background-color: #ccc;
  }
  .container#main {
    max-width: 80%;
  }
  @media(max-width: 720px) {
    .container#main {
      max-width: 90%;
    }
  }
  @media(max-width: 480px) {
    .container#main {
      max-width: 100%;
    }
  }
  .description {
    margin-bottom: 1.5rem;
  }
  .error-message {
    color: red;
    padding: 5px 8px;
    border-radius: 3px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    background-color: #f6b1be;
  }
</style>
