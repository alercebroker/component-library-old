import { shallowMount, createLocalVue } from '@vue/test-utils'
import CardStamps from '@/lib-components/card-stamps.vue'

import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
const localVue = createLocalVue()

describe('card-stamps.vue', () => {
  let vuetify;
  const { detections } = require('./detections.js')
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('computes dates of detections', () => {
    const object = 'ZTF20aaophpu'
    const wrapper = shallowMount(CardStamps, {
      localVue,
      vuetify,
      propsData: { object: object, detections: detections }
    })
    expect(wrapper.vm.dates).toEqual(expect.arrayContaining([
      expect.objectContaining({ date: expect.stringContaining("UT"), index: expect.any(Number) })
    ]))
  })
})
