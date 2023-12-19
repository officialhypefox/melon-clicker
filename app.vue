<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UContainer>
    <UNotifications />
  </UContainer>
</template>
<script setup lang="ts">
    const description = "The official game for the cloud computing provider Melonslab.";
    useSeoMeta({
        title: "Melon Clicker 🍉",
        author: "Hypefox Studios Ltd",
        ogLocale: "en_GB",
        ogTitle: "Melon Clicker 🍉",
        description: description,
        ogDescription: description,
        ogImage: "https://cdn.hypefoxstudios.com/data/melon/img/logo.png",
        twitterCard: "summary_large_image",
        themeColor: [
            {
                content: "#e73552",
                media: "(prefers-color-scheme: dark)"
            }
        ]
    });
</script>