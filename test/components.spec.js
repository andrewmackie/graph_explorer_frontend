/*
   Using shallowMount (instead of mount) to test the component only, not its dependencies.
   See https://alexjover.com/blog/write-the-first-vue-js-component-unit-test-in-jest/
*/

import { shallowMount } from '@vue/test-utils'
import Display from '@/components/Display.vue'
import Edit from '@/components/Edit.vue'
import Graph from '@/components/Graph.vue'

describe('Display', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Display)
    expect(wrapper.vm).toBeTruthy()
  })
})

describe('Edit', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Edit)
    expect(wrapper.vm).toBeTruthy()
  })
})

describe('Graph', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Graph)
    expect(wrapper.vm).toBeTruthy()
  })
})
