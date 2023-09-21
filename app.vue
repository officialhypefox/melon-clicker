<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UContainer>
    <UNotifications />
  </UContainer>
</template>
<script setup lang="ts">
    const description = "A Cookie Clicker inspired browser game I developed with Nuxt and scripted in TypeScript and Vue.";
    useServerSeoMeta({
        title: "Exotical Cookie Clicker 🍪",
        author: "ItzExotical",
        ogLocale: "en_GB",
        ogTitle: "Exotical's Cookie Clicker game 🍪",
        description: description,
        ogDescription: description,
        ogImage: "https://game.exotical.se/img/cookie.png",
        twitterCard: "summary_large_image",
        themeColor: [
            {
                content: "#d39c4a",
                media: "(prefers-color-scheme: dark)"
            }
        ]
    });
</script>