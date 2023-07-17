<template>
  <v-btn
    block
    rounded="xl"
    size="x-large"
    @click="switchRecordState()"
    v-bind:disabled="!useable"
  >
    {{ recordStart ? "停止录音" : "开始录音" }}
  </v-btn>
</template>



<script setup lang="ts">
import { onMounted, ref } from "vue";
import fixWebmDuration from "fix-webm-duration";
const property = defineProps<{
  setPayload: (payload: string, objUrl: string, is_wav: boolean) => void;
  setError: (err: string) => void;
}>();

const recorder = ref<MediaRecorder | null>(null);
const useable = ref(false);
const recordStart = ref(false);
const recordChunk = ref<Blob | null>(null);
const startTime = ref(Date.now());

const firstInit = () => {
  if (
    navigator == undefined ||
    navigator.mediaDevices == undefined ||
    navigator.mediaDevices.getUserMedia == undefined
  ) {
    alert("您的设备不支持麦克风");
    useable.value = false;
    property.setError("您的设备不支持麦克风");
    return;
  }

  if (!MediaRecorder.isTypeSupported("audio/wav")){
    alert("Wav encoder not support")
  }

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      let r = new MediaRecorder(stream,{mimeType:"audio/wav"});
      r.ondataavailable = async (ev) => {
        console.log("update data");

        recordChunk.value = ev.data;
      };
      r.onstart = (_) => {
        startTime.value = Date.now();
      };
      r.onstop = async (ev) => {
        const endTime = Date.now() - startTime.value;
        console.log(r.mimeType);
        console.log(r.state);
        console.log("recorder stopped");
        var v = recordChunk.value!!;
        v = await fixWebmDuration(v, endTime);

        console.log(v);
        const audio = new Blob([v], { type: "audio/ogg; codecs=opus" });
        console.log(audio);
        var obj_url = window.URL.createObjectURL(audio);

        var reader = new FileReader();

        reader.onload = () => {
          var v: string = reader.result!!.toString();

          var ret = v.replace(/data:audio\/[^;]+;?[^;]*;base64/g, "");
          property.setPayload(ret, obj_url, false);
        };
        reader.readAsDataURL(audio);
      };
      console.log(r.mimeType);
      recorder.value = r;
      useable.value = true;
    })
    .catch((err) => {
      alert("无法获取录音权限");
      useable.value = false;
      property.setError(`无法获取录音权限: ${err.toString()}`);
      console.log("error to get user media: ", err);
    });
};

onMounted(firstInit);

const switchRecordState = () => {
  if (recordStart.value) {
    stopRecording();
  } else {
    startRecording();
  }
};

const startRecording = () => {
  if (recorder.value != null) {
    recorder.value.start();
    recordStart.value = true;
    console.log(recorder.value.state);
    console.log(recorder.value.mimeType);
    console.log("recorder started");
  }
};

const stopRecording = () => {
  if (recorder.value != null) {
    recorder.value.stop();
    console.log(recorder.value.state);
    console.log("recorder stopping");
    recordStart.value = false;
  }
};
</script>