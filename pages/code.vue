<template>
  <v-container id="main" justify="center" align="center">
    <h1>Repositories</h1>
    <h2>Front End</h2>
    <div>
      <v-icon>mdi-github</v-icon>
      <a href="https://github.com/andrewmackie/graph_explorer_frontend" target="_blank" rel="nofollow noopener, noreferrer">
        @andrewmackie/graph_explorer_frontend
      </a>
    </div>
    <p>A Single Page Application for displaying and editing a graph network using
      <a href="https://nuxtjs.org/" target="_blank" rel="nofollow noopener, noreferrer">NuxtJS</a>
      (a <a href="https://vuejs.org/" target="_blank" rel="nofollow noopener, noreferrer">VueJS</a>
      framework),
      <a href="https://github.com/emiliorizzo/vue-d3-network" target="_blank" rel="nofollow noopener, noreferrer">v3-d3-network</a>
      to display the graph and data tables from
      <a href="https://vuetifyjs.com/en/" target="_blank" rel="nofollow noopener, noreferrer">VuetifyJS</a>
      (a
      <a href="https://material.io/design" target="_blank" rel="nofollow noopener, noreferrer">Material Design</a>
      framework for VueJS).</p>
    <h2>Back End</h2>
    <div>
      <v-icon>mdi-github</v-icon>
      <a href="https://github.com/andrewmackie/graph_explorer_backend" target="_blank" rel="nofollow noopener, noreferrer">
        @andrewmackie/graph_explorer_backend
      </a>
    </div>
    <p>A CRUD REST API for nodes and edges built with
      <a href="https://www.python.org/" target="_blank" rel="nofollow noopener, noreferrer">Python</a>,
      <a href="https://flask.palletsprojects.com" target="_blank" rel="nofollow noopener, noreferrer">Flask</a>,
      <a href="https://flask-sqlalchemy.palletsprojects.com" target="_blank" rel="nofollow noopener, noreferrer">Flask-SQLAlchemy</a> and functionally tested with
      <a href="https://docs.pytest.org/en/latest/" target="_blank" rel="nofollow noopener, noreferrer">PyTest</a>.
    </p>

  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },
  data: () => ({}),
  mounted () {
    axios({
      method: 'get',
      url: `${this.serverUrl}/graph`
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
          this.nodes = []
          this.edges = []
          this.errorMessage = error.toString()
        })
        .finally((data) => {
          // always executed
          this.loading = false
        })
    },
    putItem (data) {
      console.log(data.item)
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
          this.nodes = []
          this.edges = []
          this.errorMessage = error.toString()
        })
        .finally((data) => {
          // always executed
          this.loading = false
        })
    },
    postItem (data) {
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
          this.nodes = []
          this.edges = []
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

<style>
  h2 {
    margin-top: 3rem;
    margin-bottom: 0.5rem;
  }
  h2:first-of-type {
    margin-top: 1.5rem;
  }
  .container#main div, .container#main p {
    margin-bottom: 1rem;
  }
</style>
