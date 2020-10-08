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
        >
          mdi-delete
        </v-icon>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Display',
  components: {
  },
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
  data: () => ({
  }),
  methods: {
    deleteItem (item) {
      confirm(`Are you sure you want to delete this ${this.elementType.toLowerCase()}?`) && this.deleteItemConfirm()
    },
    deleteItemConfirm (itemId) {
      this.$emit('delete-item', { noun: this.elementType.toLowerCase(), id: this.itemId })
    }
  }
}
</script>

<style scoped>
 .display {
   position: absolute;
   top: 0;
   left: 0;
   z-index: 1;
   padding: 5px 0 0 0;
   box-shadow: none !important;
   border-bottom: 1px #ddd solid;
   border-radius: 0;
   background-color: #fcfcfc;
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
 </style>
