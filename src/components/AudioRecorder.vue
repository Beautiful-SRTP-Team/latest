<template>
    
    <v-btn
    block
    rounded="xl"
    size="x-large"
    @click="switchRecordState"
  >
    {{ recordStart ? "停止录音" : "开始录音" }}
  </v-btn>

  <v-btn @click="sendAnswer">查看结果</v-btn>
  <p v-if="sendDone">{{ isRight ? "正确" : "错误" }}</p>
  <audio v-if="audioUrl != null" autoplay :src="audioUrl"></audio>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const property = defineProps<{
  quizId: string;
}>();

// const recordBase64 = ref<string | null>(null)
const recordBlob = ref<Blob | null>(null);
const sendDone = ref(false);
const isRight = ref(false);
const recorder = ref<MediaRecorder|null>(null)
const startTime = ref(Date.now())
const recordStart = ref(false)
const audioUrl = ref<string| null>(null)

const firstInit = () => {
  if (
    navigator == undefined ||
    navigator.mediaDevices == undefined ||
    navigator.mediaDevices.getUserMedia == undefined
  ) {
    alert("您的设备不支持麦克风");
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      let r = new MediaRecorder(stream);
      r.ondataavailable = async (ev) => {
        console.log("update data");

        recordBlob.value = ev.data;
        audioUrl.value = window.URL.createObjectURL(ev.data)
      };
      r.onstart = (_) => {
        startTime.value = Date.now();
      };
      r.onstop = async (ev) => {
        const endTime = Date.now() - startTime.value;
        console.log(r.mimeType);
        console.log(r.state);
        console.log("recorder stopped");




      };
      console.log(r.mimeType);
      recorder.value = r;
    })
    .catch((err) => {
      alert("无法获取录音权限");
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

const sendAnswer = async () => {
  if (recordBlob != null) {
    const file = new File([recordBlob.value!], `${property.quizId}.ogg`, {
      type: recordBlob.value?.type,
    });

    const formData = new FormData();
    formData.append("sound", file);

    const url = new URL(
      "https://mock.apifox.cn/m1/2536058-0-default/api/v1/quiz/anwer"
    );
    let params = url.searchParams;
    params.append("stranger_token", "123456");
    params.append("quiz_id", property.quizId);

    console.log(url);

    const resp = await fetch(url, { method: "POST",  });
    const payload: { is_right: boolean } = await resp.json();
    isRight.value = payload.is_right;
    sendDone.value = true
  }
};
</script>
