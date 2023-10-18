<template>
    <div v-if="!banned" class="bg-dark-primary h-screen items-center justify-center text-center flex flex-col gap-y-10">
        <span class="text-red-600 text-xl flex gap-x-2 items-center">
            <UIcon name="i-mdi-warning"/>
            Closing this page will cause all progress to be lost!
            <UIcon name="i-mdi-warning"/>
        </span>
        <span class="text-4xl text-gray-100">Melons: <span class="text-blue-500">{{ melons.toLocaleString() }}</span> (<span class="text-blue-500">{{ mps.toLocaleString() }}</span>/sec)</span>
        <button tabindex="-1" @click="melons++; clicked++; newcps++">
            <img draggable=false src="/img/melon.png" class="w-64 h-64" />
        </button>
        <span class="text-4xl text-gray-200">Shop for upgrades</span>
        <div class="grid">
            <div v-for="(category, index) in data.buildings.categories" :key="index">
                <span class="text-indigo-200 text-2xl">{{ category.name }} (<span class="text-blue-500">{{ category.members.length }}</span>)</span>
                <div class="flex flex-wrap">
                    <div v-for="(building, index) in category.members" :key="index" class="mr-4 mb-4">
                        <div class="grid mb-2">
                            <span class="text-indigo-400 text-2xl mt-4">{{ building.name }} (<span class="text-blue-500">{{ building.owned }}</span>/<span class="text-blue-500">{{ building.limit }}</span> owned) </span>
                            <span class="text-gray-500"><span class="text-blue-500">{{ Math.floor((building.owned / building.limit) * 100) }}% </span>completed</span>
                            <span class="text-gray-400 max-w-xs break-words">{{ building.description }}</span>
                            <span class="text-green-600">Production: <span v-for="(output, index) in building.output" :key="index" class="text-gray-400">{{ Engine.title(output.name) }}: <span class="text-blue-500">{{ (output.value * settings.general.inflationRate).toLocaleString() }}</span></span></span>
                            <span class="text-red-400">Conditions: <span v-for="(condition, index) in building.conditions" :key="index" class="text-gray-400">{{ Engine.title(condition.name) }}: <span class="text-blue-500">{{ condition.value.toLocaleString() }}</span></span></span>
                            <span class="text-red-500">Cost: <span v-for="(cost, index) in building.cost" :key="index" class="text-gray-400">{{ Engine.title(cost.name) }}: <span class="text-blue-500">{{ tracking[building.name + cost.name].toLocaleString() }}</span></span></span>
                        </div>
                        <UButton @click="Engine.purchase(category.name, building.name)" label="Buy" color="blue" size="lg" class="w-full justify-center" trailing-icon="i-mdi-shopping-cart" />
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="grid text-white">
                <div>
                    Level: <span class="text-blue-500">{{ level.toLocaleString() }}</span> | MPS for next level: <span class="text-blue-500">{{ Engine.leveling().toLocaleString() }}</span> (<span class="text-blue-500">{{ (Engine.leveling() - mps).toLocaleString() }}</span> left) | Total earned: <span class="text-blue-500">{{ (total + clicked).toLocaleString() }}</span> | Total spent: <span class="text-blue-500">{{ spent.toLocaleString() }}</span> | Total buildings: <span class="text-blue-500">{{ Engine.buildings().toLocaleString() }}</span>/<span class="text-blue-500">{{ Engine.buildings(true, true).toLocaleString() }}</span> | Earned from buildings: <span class="text-blue-500">{{ total.toLocaleString() }}</span> | Earned from clicking: <span class="text-blue-500">{{ clicked.toLocaleString() }}</span>
                </div>
                <div>
                    Total game progress: <span class="text-blue-500">{{ Engine.progress() }}%</span> | Maxed out: <span class="text-blue-500">{{ Engine.progress(false) }}</span>/<span class="text-blue-500">{{ Engine.buildings(false) }}</span> | Engine runtime: <span class="text-blue-500">{{ runtime }}</span> (<span class="text-blue-500">{{ ticks }}</span> {{ lang }})
                </div>
                <div>
                    &copy; Copyright <NuxtLink to="https://github.com/ItzExotical" class="text-blue-500">Emilio Persson</NuxtLink> {{ year }} - All Rights Reserved | App v0.1 | Engine v0.2 | Build 36
                </div>
            </div>
        </footer>
    </div>
    <div v-if="banned">
        <div class="flex items-center justify-center h-screen">
            <div class="flex flex-col items-center gap-y-2">
                <UIcon name="i-mdi-alert" class="text-red-500 text-[10rem]" />
                <a class="text-red-500 font-bold text-4xl">{{ "Cheating detected!".toUpperCase() }}</a>
                <a class="text-red-500 text-xl">Looks like you've been caught red-handed! Remember, in the game of life, cheats never prosper. Better luck next time!</a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    const app = useNuxtApp();
    const settings = app.$settings as any;
    const year = new Date().getFullYear();
    const runtime = ref("00:00:00");
    const data = app.$data as any;
    const banned = ref(false);
    const tracking = ref({});
    const toast = useToast();
    const lastcps  = ref(0);
    const newcps  = ref(0);
    const clicked = ref(0);
    const melons = ref(0);
    const ticks = ref(0);
    const lang = ref("");
    const level = ref(1);
    const total = ref(0);
    const spent = ref(0);
    const mps = ref(0);
    class Engine {
        static price(base: Number, owned: Number) {
            return (0.1 * base * owned + base) * settings.general.inflationRate;
        };
        static progress(percentage: boolean = true) {
            let result = 0;
            if (percentage) {
                return ((Engine.buildings() / Engine.buildings(true, true)) * 100).toFixed(2);
            } else {
                for (const category of data.buildings.categories) {
                    for (const building of category.members) {
                        if (building.owned >= building.limit) {
                            result++;
                        };
                    };
                };
                return result;
            };
        };
        static buildings(total = true, all = false) {
            let count = 0;
            if (total) {
                for (const category of data.buildings.categories) {
                    for (const building of category.members) {
                        if (all) {
                            count += building.limit;
                        } else {
                            count += building.owned;
                        };
                    };
                };
            } else {
                for (const category of data.buildings.categories) {
                    for (const building of category.members) {
                        count++;
                    };
                };
            };
            return count;
        };
        static leveling() {
            return settings.leveling.base * (level.value ** 2);
        };
        static purchase(categoryName: string, buildingName: string) {
            const category = data.buildings.categories.find((cat) => cat.name === categoryName);
            const building = category.members.find((bld) => bld.name === buildingName);
            if (building.owned >= building.limit) {
                toast.add({
                    title: "Limit check failed.",
                    description: `You have reached the limit (${building.owned}/${building.limit}) of ${building.name}.`,
                    color: "red",
                    icon: "i-mdi-exclamation-thick",
                    timeout: 5 * 1000
                });
                return;
            };
            for (const condition of building.conditions) {
                switch (condition.name) {
                    case "level":
                        if (level.value < condition.value) {
                            toast.add({
                                title: "Condition check failed.",
                                description: `You do not meet the required level to purchase this item (need ${condition.value.toLocaleString()}, have ${level.value.toLocaleString()}).`,
                                color: "red",
                                icon: "i-mdi-exclamation-thick",
                                timeout: 5 * 1000
                            });
                            return;
                        };
                        break;
                };
            };
            for (const cost of building.cost) {
                switch (cost.name) {
                    case "melons":
                        let price = Engine.price(cost.base, building.owned);
                        if (melons.value >= price) {
                            melons.value -= price;
                            spent.value += price;
                            building.owned++;
                            toast.add({
                                title: "Transaction successful!",
                                description: `Purchased ${building.name}. You now have ${building.owned} of them. ${price.toLocaleString()} melons was deducted from your balance, and you have ${melons.value.toLocaleString()} melons remaining.`,
                                color: "green",
                                icon: "i-mdi-check",
                                timeout: 5 * 1000
                            });
                            price = Engine.price(cost.base, building.owned);
                            tracking.value[building.name + cost.name] = price;
                        } else {
                            toast.add({
                                title: "Transaction check failed.",
                                description: `You do not have enough melons to purchase this item (need ${price.toLocaleString()}, have ${melons.value.toLocaleString()}, missing ${(price - melons.value).toLocaleString()}).`,
                                color: "red",
                                icon: "i-mdi-exclamation-thick",
                                timeout: 5 * 1000
                            });
                        };
                        break;
                };
            };
        };
        static tick() {
            if((newcps.value - lastcps.value) > 14) {
                // Anti-cheat detected cheating
                banned.value = true;
            };
            lastcps.value = newcps.value;
            ticks.value++;
            lang.value = ticks.value === 1 ? "tick" : "ticks";
            mps.value = 0;
            for (const category of data.buildings.categories) {
                for (const building of category.members) {
                    if (building.owned > 0) {
                        for (const output of building.output) {
                            switch (output.name) {
                                case "melons":
                                    const computed = (building.owned * output.value) * settings.general.inflationRate;
                                    melons.value += computed;
                                    total.value += computed;
                                    mps.value += computed;
                                    break;
                            };
                        };
                    }
                };
            };
            if (mps.value >= Engine.leveling()) {
                level.value++;
                toast.add({
                    title: "Level up!",
                    description: `Good job! You have reached level ${level.value.toLocaleString()}.`,
                    color: "blue",
                    icon: "i-mdi-arrow-up-thick",
                    timeout: 5 * 1000
                });
            };
            let seconds = parseInt(runtime.value.split(":")[2]);
            let minutes = parseInt(runtime.value.split(":")[1]);
            let hours = parseInt(runtime.value.split(":")[0]);
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            };
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            };
            runtime.value = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        };
        static init() {
            lang.value = ticks.value === 1 ? "tick" : "ticks";
            for (const category of data.buildings.categories) {
                for (const building of category.members) {
                    for (const object of building.cost) {
                        tracking.value[building.name + object.name] = object.base * settings.general.inflationRate;
                    };
                };
            };
        };
        static title(input: string) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        };
    };
    Engine.init();
    setInterval(Engine.tick, settings.tick.interval * 1000);
</script>
