<template>
  <v-container
    id="main"
    justify="center"
    align="center"
  >
    <div style="margin-bottom: 1.5rem;">
      An app for displaying and editing a simple graph (using a CRUD REST API with <nuxt-link to="/api">OpenAPI documentation</nuxt-link>):
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
      :options="options"
      :loading="loading"
      @delete-item="deleteItem"
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
    nodes: [],
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
    options: {
      force: 3000,
      size: { h: 750 },
      nodeSize: 15,
      nodeLabels: true,
      linkLabels: true,
      canvas: false
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
        this.nodes = response.data.nodes
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
        })
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
        })
    }
  }
}
</script>

<style scoped>
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
