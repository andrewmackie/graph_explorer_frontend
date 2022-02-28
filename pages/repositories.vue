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
      <a href="https://github.com/emiliorizzo/vue-d3-network" target="_blank" rel="nofollow noopener, noreferrer">vue-d3-network</a>
      to display the graph and data tables from
      <a href="https://vuetifyjs.com/en/" target="_blank" rel="nofollow noopener, noreferrer">VuetifyJS</a>
      (a
      <a href="https://material.io/design" target="_blank" rel="nofollow noopener, noreferrer">Material Design</a>
      framework for VueJS)</p>
    <p>The front end for this site is hosted on Netlify and uses <a href="https://jestjs.io/" rel="nofollow noopener, noreferrer">Jest</a>-based CI and Netlify CD.</p>
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
      <a href="https://docs.pytest.org/en/latest/" target="_blank" rel="nofollow noopener, noreferrer">pytest</a>.</p>
    <p>The back end for this site is hosted on Heroku, using a CI/CD pipeline.</p>
  </v-container>
</template>

export default {
  name: 'Repositories'
}

<style scoped>
  h1 {
    margin-top: 1rem;
  }
  h2 {
    margin-top: 2.5rem;
    margin-bottom: 0.5rem;
  }
  h2:first-of-type {
    margin-top: 1.5rem;
  }
  .container#main div, .container#main p {
    margin-bottom: 1rem;
  }
</style>
