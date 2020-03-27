
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Aladin from '@/lib-components/aladin.vue'
import '@babel/polyfill'

describe('aladin.vue', () => {
  const selectedObject = 'ZTF20aaophpu'
  const objects = [
    {
      meanra: 10,
      meandec: 20,
      oid: "ZTF20aaophpu"
    }
  ]
  const addObjects = jest.fn()
  const mountFunction = function (options) {
    return shallowMount(Aladin, {
      propsData: {
        objects: objects
      },
      methods: {
        addObjects
      },
      ...options
    })
  }

  it('adds objects when passed as props', () => {
    mountFunction()
    expect(addObjects).toBeCalled()
  })
  it('adds objects when props change', () => {
    const wrapper = mountFunction()
    let objects = [
      {
        meanra: 1,
        meandec: 2,
        oid: "TEST"
      }
    ]
    wrapper.setProps({ objects: objects })
    expect(addObjects).toBeCalledTimes(2)
  })
  it('finds ztf object matching the aladin object', () => {
    const wrapper = shallowMount(Aladin, {
      propsData: {
        objects: objects
      },
      methods: {
        addObjects,
      }
    })
    let object = {
      data: {
        name: "ZTF20aaophpu"
      }
    }
    expect(wrapper.vm.findZTFObject(object)).toBe(objects[0])
  })
  
})