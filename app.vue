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
        author: "Hypefox Ltd",
        ogLocale: "en_GB",
        ogTitle: "Melon Clicker 🍉",
        description: description,
        ogDescription: description,
        ogImage: "https://cdn.hypefox.net/data/melon/img/logo.png",
        twitterCard: "summary_large_image",
        themeColor: [
            {
                content: "#e73552",
                media: "(prefers-color-scheme: dark)"
            }
        ]
    });
    useHead({
        htmlAttrs: {
            lang: "en"
        },
        link: [
            {
                rel: "icon",
                type: "image/svg+xml",
                href: "https://cdn.hypefox.net/data/melon/img/icon.svg"
            }
        ]
    });
</script>