import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'
import API from '@/pages/api.vue'
import Repositories from '@/pages/repositories.vue'

describe('Index', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Index)
    expect(wrapper.vm).toBeTruthy()
  })
})

describe('API', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(API)
    expect(wrapper.vm).toBeTruthy()
  })
})

describe('Repositories', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Repositories)
    expect(wrapper.vm).toBeTruthy()
  })
})
