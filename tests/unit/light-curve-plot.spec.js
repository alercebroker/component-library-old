import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import '@babel/polyfill'
import LightCurvePlot from "@/lib-components/light-curve-plot.vue"
import 'jest-canvas-mock'
import Echarts from "echarts"
describe('light-curve-plot.vue', () => {
  const { detections } = require('./detections.js')
  const mountFunction = (options) => {
    return shallowMount(LightCurvePlot, {
      ...options
    })
  }
  let spy;
  beforeAll(() => {
    spy = jest.spyOn(Echarts, 'getInstanceByDom').mockImplementation(() => {
      return {
        hideLoading: jest.fn(),
        setOption: jest.fn(),
        showLoading: jest.fn()
      }
    })
  })
  afterAll(() => {
    spy.mockRestore()
  })

  it('mounts echarts', () => {
    const wrapper = mountFunction({
      propsData: {
        detections: detections,
        type: "apparent"
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('sets chart options on mount', async () => {
    let generateOptions = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        detections: detections,
        type: "apparent"
      },
      methods: {
        generateOptions
      }
    })
    await Vue.nextTick();
    expect(generateOptions).toBeCalled()
  })

  it('sets right options for difference', async () => {
    const wrapper = mountFunction({
      propsData: {
        detections: detections,
        type: "difference"
      }
    })
    await Vue.nextTick()
    expect(wrapper.vm.scatter).toHaveProperty("legend")
    expect(wrapper.vm.scatter.legend.data).toStrictEqual(["g", "r", "g non-detections", "r non-detections"])
  })
  it('sets right options for apparent', async () => {
    const wrapper = mountFunction({
      propsData: {
        detections: detections,
        type: "apparent"
      }
    })
    await Vue.nextTick()
    expect(wrapper.vm.scatter).toHaveProperty("legend")
    expect(wrapper.vm.scatter.legend.data).toStrictEqual(["g", "r"])
  })

  it('sets right options for folded', async () => {
    const wrapper = mountFunction({
      propsData: {
        detections: detections,
        type: "folded"
      }
    })
    await Vue.nextTick()
    expect(wrapper.vm.scatter).toHaveProperty("xAxis")
    expect(wrapper.vm.scatter.xAxis.name).toStrictEqual("Phase")
  })

  it('emits detection selected with mjd', async () => {
    const wrapper = mountFunction({
      propsData: {
        detections: detections,
        type: "apparent"
      }
    })
    wrapper.vm.$emit('detectionClick', {
      mjd: detections[1].mjd,
      index: detections.findIndex(x => x.mjd == detections[1].mjd)
    })

    expect(wrapper.emitted('detectionClick')).toBeTruthy()
    expect(wrapper.emitted('detectionClick').length).toBe(1)
    expect(wrapper.emitted('detectionClick')[0][0].mjd).toEqual(detections[1].mjd)
    expect(wrapper.emitted('detectionClick')[0][0].index).toEqual(1)
  }) 
})