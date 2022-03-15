<template>
  <!-- Adapted from https://codepen.io/pen/?&editable=true&editors=101&prefill_data_id=733a3db0-e4fa-0138-62b3-02420aff000d&referer=https%3A%2F%2Fvuetifyjs.com%2Fen%2Fcomponents%2Fdata-tables%2F -->
  <div
    id="main"
  >
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="id"
      sort-desc
      class="elevation-1"
      :loading="loading"
      :search="search"
      width="width"
      light
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>{{ name.concat('s') }}</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4 search-space"
          />
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2 new-item-space"
                v-bind="attrs"
                v-on="on"
              >
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title v-if="editedItem.id">Edit {{ name }} (id={{ editedItem.id }})</v-card-title>
              <v-card-title v-else>New {{ name }}</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row
                    v-for="(header, index) in headersFiltered"
                    :key="header.text"
                    cols="1"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem[header.value]"
                      :label="header.text"
                      :autofocus="index === 0"
                      style="margin-bottom: 20px;"
                    />
                  </v-row>
                  <slider-color-picker @input="updateColor" :value="editedItem['_color'] || '#000000'" />
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        Please add some data
      </template>
    </v-data-table>
  </div>
</template>

<script>

import { Slider } from 'vue-color'

export default {
  name: 'Edit',
  components: {
    'slider-color-picker': Slider
  },
  props: {
    name: {
      type: String,
      default: null
    },
    headers: {
      type: Array,
      default: null
    },
    items: {
      type: Array,
      default: null
    },
    keys: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    defaultItem: {
      type: Object,
      default () { return {} }
    },
    width: {
      type: Number,
      default: 500
    }
  },
  computed: {
    headersFiltered () {
      return this.headers.filter(x => !['actions', '_color', 'id'].includes(x.value))
    }
  },
  data: () => ({
    search: null,
    color: '#666666',
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {}
  }),
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    updateColor (value) {
      console.log(value)
      this.editedItem._color = value.hex
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.deleteItemConfirm(index, item.id)
    },
    deleteItemConfirm (index, itemId) {
      console.log('delete')
      this.$emit('delete-item', { noun: this.name.toLowerCase(), id: itemId })
      this.items.splice(index, 1)
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
        this.$emit('put-item', {
          id: this.items[this.editedIndex].id,
          noun: this.name.toLowerCase(),
          /* We can't return the complete item object because it contains many other properties. The next line
          creates an object which contains only the keys found in 'value' element of this.headers (except 'actions'). */
          item: Object.fromEntries(this.headers.filter(x => x.value !== 'actions').map(x => x.value).map(x => [x, this.items[this.editedIndex][x]]))
        })
      } else {
        this.items.push(this.editedItem)
        this.$emit('post-item', {
          noun: this.name.toLowerCase(),
          /* We can't return the complete editedItem object because it contains many other properties.
             The next line creates an object which contains only the keys found in 'value' element of this.headers. */
          headers: this.headers.map(x => x.value),
          item: Object.fromEntries(this.headers.filter(x => x.value !== 'actions').map(x => x.value).map(x => [x, this.editedItem[x]]))
        })
      }
      this.close()
    }
  }
}
</script>

<style scoped>
 div#main {
   margin-top: 2rem;
 }
 .search-space {
   margin-top: 28px;
 }
 .new-item-space {
   margin-top: 15px;
 }
</style>

<style>
 .v-data-table__wrapper {
   margin-top: 15px;
 }
  .v-toolbar__title + .v-divider {
   display: none;
 }

</style>
