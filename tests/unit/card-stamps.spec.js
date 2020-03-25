import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import CardStamps from '@/lib-components/card-stamps.vue'
import ZoomOnHover from '@/lib-components/utils/ZoomOnHover.vue'
import Crosshair from '@/lib-components/utils/Crosshair.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import '@babel/polyfill'
import 'jest-canvas-mock'
import vue from 'rollup-plugin-vue'
Vue.use(Vuetify)
const localVue = createLocalVue()

describe('card-stamps.vue', () => {
  let vuetify;
  const { detections } = require('./detections.js')
  const object = 'ZTF20aaophpu'
  beforeEach(() => {
    vuetify = new Vuetify({
      mocks: {
        $vuetify: {
          lang: {
            t: (val) => val,
          },
        },
      }
    })
  })

  const mountFunction = (options) => {
    return shallowMount(CardStamps, {
      localVue,
      vuetify,
      ...options
    })
  }

  it('computes dates of detections', () => {
    const wrapper = mount(CardStamps, {
      localVue,
      vuetify,
      propsData: {
        detections: detections,
        object: object,
      }
    })
    expect(wrapper.find('.v-select').text()).toBe(wrapper.vm.dates[0].date)
  })

  it('formats the stamp URL for science', () => {
    const wrapper = mountFunction({
      propsData: {
        detections: detections,
        object: object
      }
    })
    expect(wrapper.vm.science).toBe("https://avro.alerce.online/get_stamp?oid=" +
      object +
      "&candid=" +
      detections[0].candid_str +
      "&type=science&format=png")
  })
  it('formats the stamp URL for template', () => {
    const wrapper = mountFunction({
      propsData: {
        detections: detections,
        object: object
      }
    })
    expect(wrapper.vm.template).toBe("https://avro.alerce.online/get_stamp?oid=" +
      object +
      "&candid=" +
      detections[0].candid_str +
      "&type=template&format=png")
  })
  it('formats the stamp URL for difference', () => {
    const wrapper = mountFunction({
      propsData: {
        detections: detections,
        object: object
      }
    })
    expect(wrapper.vm.difference).toBe("https://avro.alerce.online/get_stamp?oid=" +
      object +
      "&candid=" +
      detections[0].candid_str +
      "&type=difference&format=png")
  })
  it('changes the selected stamp when detection date changes', async () => {
    const wrapper = mount(CardStamps, {
      localVue,
      vuetify,
      propsData: {
        detections: detections,
        object: object
      }
    })
    let vselect = wrapper.find('.v-select')
    expect(vselect.text()).toBe(wrapper.vm.dates[0].date)
    wrapper.vm.onDateSelected(1)
    await Vue.nextTick()
    expect(wrapper.emitted('selectDetection')[0]).toEqual([1])
    wrapper.setProps({ selectedDetection: 1 })
    await Vue.nextTick()
    expect(vselect.text()).toBe(wrapper.vm.dates[1].date)
  })
  it('changes the selected stamp when detection date changes without prop', async () => {
    const wrapper = mount(CardStamps, {
      localVue,
      vuetify,
      propsData: {
        detections: detections,
        object: object
      }
    })
    let vselect = wrapper.find('.v-select')
    expect(vselect.text()).toBe(wrapper.vm.dates[0].date)
    wrapper.vm.onDateSelected(1)
    await Vue.nextTick()
    expect(wrapper.emitted('selectDetection')[0]).toEqual([1])
    expect(vselect.text()).toBe(wrapper.vm.dates[1].date)
  })
  it('changes the selected stamp when clicking next stamp', async () => {
    const wrapper = mount(CardStamps, {
      localVue,
      vuetify,
      propsData: {
        detections: detections,
        object: object
      }
    })
    let vselect = wrapper.find('.v-select')
    expect(vselect.text()).toBe(wrapper.vm.dates[0].date)
    let nextBtn = wrapper.find('[data-test="nextIcon"]')
    nextBtn.trigger('click')
    await Vue.nextTick()
    expect(wrapper.emitted('selectDetection')[0]).toEqual([1])
    wrapper.setProps({ selectedDetection: 1 })
    await Vue.nextTick()
    expect(vselect.text()).toBe(wrapper.vm.dates[1].date)
  })
  it('changes the selected stamp when clicking previous stamp', async () => {
    const wrapper = mount(CardStamps, {
      localVue,
      vuetify,
      propsData: {
        detections: detections,
        object: object,
        selectedDetection: 1
      }
    })
    let vselect = wrapper.find('.v-select')
    expect(vselect.text()).toBe(wrapper.vm.dates[1].date)
    let prevBtn = wrapper.find('[data-test="prevIcon"]')
    prevBtn.trigger('click')
    await Vue.nextTick()
    expect(wrapper.emitted('selectDetection')[0]).toEqual([0])
    wrapper.setProps({ selectedDetection: 0 })
    await Vue.nextTick()
    expect(vselect.text()).toBe(wrapper.vm.dates[0].date)
  })
  it('formats the stamp url on detection change', async () => {
    const wrapper = mountFunction({
      propsData: {
        detections: detections,
        object: object
      }
    })
    wrapper.setProps({ selectedDetection: 1 })
    await Vue.nextTick()
    expect(wrapper.vm.science).toBe("https://avro.alerce.online/get_stamp?oid=" +
      object +
      "&candid=" +
      detections[1].candid_str +
      "&type=science&format=png")
  })
  it('switches between tools', async () => {
    const wrapper = mountFunction({
      propsData: {
        detections: detections,
        object:object
      }
    })
    wrapper.vm.selectTool("zoom")
    await Vue.nextTick()
    expect(wrapper.contains(ZoomOnHover)).toBe(true)
    wrapper.vm.selectTool("crosshair")
    await Vue.nextTick()
    expect(wrapper.contains(Crosshair)).toBe(true)
  })
})
