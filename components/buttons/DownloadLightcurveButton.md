```vue
<template>
  <download-lightcurve-button
    oid="test"
    :detections="detections"
    :non-detections="nonDetections"
  />
</template>
<script>
export default {
  data() {
    return {
      detections: [
        {
          mjd: 58792.104606499895,
          candid: '1038104605915015004',
          fid: 1,
          pid: 1038104605915,
          diffmaglim: 20.11775,
          isdiffpos: 1,
          nid: 1038,
          distnr: 0.56844574,
          magpsf: 19.760195,
          magpsf_corr: 19.46493,
          magpsf_corr_ext: null,
          magap: 19.6785,
          magap_corr: null,
          sigmapsf: 0.17524776,
          sigmapsf_corr: 0.1315489,
          sigmapsf_corr_ext: 0.13352008,
          sigmagap: 0.2682,
          sigmagap_corr: null,
          ra: 277.6017137,
          dec: 43.0370465,
          rb: 0.71,
          rbversion: 't17_f5_c3',
          drb: 0.99999154,
          magapbig: 19.4986,
          sigmagapbig: 0.2915,
          rfid: 726120159,
          has_stamp: false,
          corrected: true,
          dubious: false,
          candid_alert: null,
          step_id_corr: 'bulk_1.0.0',
          phase: null,
          parent_candid: 1050097625915015000,
        },
      ],
      nonDetections: [
        {
          mjd: 58764.247824099846,
          fid: 1,
          diffmaglim: 19.6373,
        },
      ],
    }
  },
}
</script>
```
