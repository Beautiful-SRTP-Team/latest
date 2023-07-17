<template>
    <v-containter v-if="isLoaded">
        <audio ref="audio" :src="audioBase64" autoplay></audio>
        <v-btn @click="playAudio">play</v-btn>
    </v-containter>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const property = defineProps<{
  quizId: string;
  quizDone:boolean;
}>();

const audioBase64 = ref<string|null>(null);
const isLoaded = ref(false);
const audio = ref<HTMLAudioElement | null>(null);

onMounted(async () => {
  const url = new URL(
    "https://mock.apifox.cn/m1/2536058-0-default/quiz/get_voice"
  );

  console.log(property.quizId);
  
  const rsp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "aplication/json" },
    body: JSON.stringify({
      text: property.quizId,
    }),
  });
  console.log("get audio");
  
  const payload: { audio: string; type: string } = await rsp.json();
  audioBase64.value = `data:${payload.type};base64,${payload.audio}`;
  isLoaded.value = true;
});

const playAudio = () => {
  if (isLoaded && audio != null) {
    audio.value?.play();
  }
};
</script>