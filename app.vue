<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UContainer>
    <UNotifications />
  </UContainer>
</template>
<script setup lang="ts">
    const description = "A small little browser game I developed with Nuxt and scripted in TypeScript and Vue.";
    useSeoMeta({
        title: "Exotical Melon Clicker 🍉",
        author: "ItzExotical",
        ogLocale: "en_GB",
        ogTitle: "Exotical's Melon Clicker game 🍉",
        description: description,
        ogDescription: description,
        ogImage: "https://game.exotical.se/img/melon.png",
        twitterCard: "summary_large_image",
        themeColor: [
            {
                content: "#e73552",
                media: "(prefers-color-scheme: dark)"
            }
        ]
    });
</script>