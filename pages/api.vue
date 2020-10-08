<template>
  <v-container id="main" justify="center" align="center">
    <h1>API Documentation</h1>
    <!--<h2>Endpoint</h2>
    <div>
      <v-icon>mdi-link</v-icon>
      <a :href="`${serverUrl}/api/v${apiVersion}`" target="_blank" rel="nofollow noopener, noreferrer">
        {{ `${serverUrl}/api/v${apiVersion}` }}
      </a>
    </div>
    <h2>Documentation</h2>
    -->
    <div style="margin-top: 1rem;">
      <div>OpenAPI-spec documentation is available as:</div>
      <table>
        <tr>
          <td><span class="bullet">&bull;</span>An interactive client:</td>
          <td>
            <v-icon>mdi-laptop-windows</v-icon>
            <a :href="`${serverUrl}/apidocs`" target="_blank" rel="nofollow noopener, noreferrer">{{ `${serverUrl}/apidocs` }}</a>
          </td>
        </tr>
        <tr>
          <td><span class="bullet">&bull;</span>A JSON document:</td>
          <td>
            <v-icon>mdi-file-document</v-icon>
            <a :href="`${serverUrl}/apispec_1.json`" target="_blank" rel="nofollow noopener, noreferrer">{{ `${serverUrl}/apispec_1.json` }}</a>
          </td>
        </tr>
      </table>
    </div>
  </v-container>
</template>

<script>
// import VueMaterial from 'vue-material'

export default {
  components: {
  },
  data: () => ({
    serverUrl: process.env.serverUrl,
    apiVersion: process.env.apiVersion
  }),
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
  h1 {
    margin-top: 1rem;
  }
  h2 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }
  h2:first-of-type {
    margin-top: 1.5rem;
  }
  .container#main div, .container#main p {
    margin-bottom: 1rem;
  }
  td {
    padding: 6px 6px;
  }
  td a {
    margin-left: 5px;
  }
  i {
    margin-top: -3px;
  }
  span.bullet {
    margin-right: 7px;
  }
</style>
