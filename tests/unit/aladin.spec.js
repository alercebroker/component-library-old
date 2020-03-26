
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Aladin from '@/lib-components/aladin.vue'
import '@babel/polyfill'

describe('aladin.vue', () => {
  const selectedObject = 'ZTF20aaophpu'
  const objects = [
    {
      pclassearly: 1,
      meanra: 10,
      meandec: 20,
      oid: "ZTF20aaophpu"
    }
  ]
  const mountFunction = function (options) {
    return shallowMount(Aladin, {
      propsData: {
        objects: objects
      },
      ...options
    })
  }

  it('instantiates aladin on mount', async () => {
    const addAladinScript = jest.fn()
    const wrapper = mountFunction({
      methods: {
        addAladinScript
      }
    })
    expect(addAladinScript).toBeCalled()
  })
  it('adds objects to aladin', async () => {
    const wrapper = mountFunction()
    expect(wrapper.vm.catalog).toHaveLength(1)
  })
})