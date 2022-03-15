<template>
  <!-- Adapted from https://codepen.io/pen/?&editable=true&editors=101&prefill_data_id=733a3db0-e4fa-0138-62b3-02420aff000d&referer=https%3A%2F%2Fvuetifyjs.com%2Fen%2Fcomponents%2Fdata-tables%2F -->
  <div class="display">
    <div class="left">
      <div><strong>{{ elementType }}</strong>{{ itemId }}</div>
      <div v-if="itemSID > 0"><strong>SID</strong>{{ itemSID }}</div>
      <div v-if="itemTID > 0"><strong>TID</strong>{{ itemTID }}</div>
      <div :title="itemName"><strong>Name</strong>{{ itemName }}</div>
      <div><strong>Colour</strong>{{ itemColor }}</div>
      <!--
      <div>
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </div>
      -->
      <div>
        <v-icon
          small
          @click="deleteItem(item)"
          style="margin-top: -3px;"
        >
          mdi-delete
        </v-icon>
      </div>
      <div @click="$emit('add-edge-from-selected', itemId)" style="cursor: pointer; margin-left: 10px">
        <v-icon
          size="20"
          style="margin-top: -3px;"
        >
          mdi-link-plus
        </v-icon>
        <span style="margin-left: 2px;">Add Edge</span>
      </div>
      <table
        class="position-arrows"
      >
        <tr>
          <td>
            <v-icon
              size="22"
              @click="$emit('set-position', renderDataForPosition('topLeft'))"
            >
              mdi-arrow-top-left
            </v-icon>
          </td>
          <td>
            <v-icon
              size="22"
              @click="$emit('set-position', renderDataForPosition('topCenter'))"
            >
              mdi-arrow-up
            </v-icon>
          </td>
          <td>
            <v-icon
              size="22"
              @click="$emit('set-position', renderDataForPosition('topRight'))"
            >
              mdi-arrow-top-right
            </v-icon>
          </td>
        </tr>
        <v-icon
          size="22"
          @click="$emit('set-position', renderDataForPosition('bottomLeft'))"
        >
          mdi-arrow-bottom-left
        </v-icon>
        <v-icon
          size="22"
          @click="$emit('set-position', renderDataForPosition('bottomCenter'))"
        >
          mdi-arrow-down
        </v-icon>
        <v-icon
          size="22"
          @click="$emit('set-position', renderDataForPosition('bottomRight'))"
        >
          mdi-arrow-bottom-right
        </v-icon>
        <v-icon
          size="22"
          @click="$emit('set-position', renderDataForPosition('centerLeft'))"
        >
          mdi-arrow-left
        </v-icon>
        <v-icon
          size="22"
          @click="$emit('set-position', renderDataForPosition('center'))"
        >
          mdi-image-filter-center-focus
        </v-icon>
        <v-icon
          size="22"
          @click="$emit('set-position', renderDataForPosition('centerRight'))"
        >
          mdi-arrow-right
        </v-icon>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Display',
  components: {},
  props: {
    elementType: {
      type: String,
      default: null
    },
    itemId: {
      type: Number,
      default: -1
    },
    itemSID: {
      type: Number,
      default: -1
    },
    itemTID: {
      type: Number,
      default: -1
    },
    itemName: {
      type: String,
      default: null
    },
    itemColor: {
      type: String,
      default: null
    }
  },
  data: () => ({}),
  methods: {
    deleteItem (item) {
      confirm(`Are you sure you want to delete this ${this.elementType.toLowerCase()}?`) && this.deleteItemConfirm()
    },
    deleteItemConfirm (itemId) {
      this.$emit('delete-item', { noun: this.elementType.toLowerCase(), id: this.itemId })
    },
    renderDataForPosition (position) {
      return {
        noun: 'node',
        id: this.itemId,
        item: {
          id: this.itemId,
          name: this.itemName,
          _color: this.itemColor,
          position
        }
      }
    }
  }
}
</script>

<style scoped>
 .display {
   position: absolute;
   top: -30px;
   left: 0;
   z-index: 1;
   padding: 5px 0 0 0;
   box-shadow: none !important;
   border-radius: 0;
   background-color: #888;
   width: 100%;
   text-align: center;
 }

 .display div div {
   display: inline-block;
   padding: 3px 6px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   max-width: 300px;
 }
 .display div strong {
   margin-right: 6px;
 }
 .position-arrows {
   margin-left: 10px;
 }

 .position-arrows button {
   padding: 2px;
 }
 </style>
