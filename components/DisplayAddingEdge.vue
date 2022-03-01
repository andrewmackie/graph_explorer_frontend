<template>
  <!-- Adapted from https://codepen.io/pen/?&editable=true&editors=101&prefill_data_id=733a3db0-e4fa-0138-62b3-02420aff000d&referer=https%3A%2F%2Fvuetifyjs.com%2Fen%2Fcomponents%2Fdata-tables%2F -->
  <div class="display">
    <div class="left">
      <div><strong>Adding an Edge</strong></div>
      <div v-if="!addingEdgeNodeSid">Click the first ('from') node.</div>
      <div v-if="addingEdgeNodeSid"><strong>SID</strong>{{ addingEdgeNodeSid }}</div>
      <div v-if="addingEdgeNodeSid && !addingEdgeNodeTid"> Click the second ('to') node.</div>
      <div v-if="addingEdgeNodeTid"><strong>TID</strong>{{ addingEdgeNodeTid }}</div>
      <div @click="$emit('cancel-add-edge')" style="cursor: pointer; margin-left: 5px;">
        <v-icon
          small
          style="margin-top: -3px;"
        >
          mdi-cancel
        </v-icon>
        <span style="margin-left: 2px;">Cancel Add Edge</span>
      </div>
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
    </div>
  </div>
</template>

<script>

export default {
  name: 'DisplayAddingEdge',
  components: {
  },
  props: {
    elementType: {
      type: String,
      default: null
    },
    addingEdgeNodeSid: {
      type: Number,
      default: null
    },
    addingEdgeNodeTid: {
      type: Number,
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
   top: -25px;
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
 </style>
