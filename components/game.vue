<template>
    <div v-if="!banned" class="bg-dark-primary h-screen items-center justify-center text-center flex flex-col gap-y-10">
      <UModal v-model="resetopen">
        <div class="flex flex-col items-center gap-y-4 py-8 text-center">
          <span class="text-4xl text-gray-100">Reset save data?</span>
          <span class="text-gray-400">All game progress will be wiped and the game will reload.<br>This can not be undone.</span>
          <div class="flex gap-x-4">
            <UButton @click="resetopen = false" label="Cancel" color="blue" size="lg" class="w-22 h-8 justify-center" trailing-icon="i-lucide-x" />
            <UButton @click="Engine.clear()" label="Reset" color="red" size="lg" class="w-22 h-8 justify-center" trailing-icon="i-lucide-trash" />
          </div>
        </div>
      </UModal>
      <div class="text-4xl text-gray-100">
        Melons: <span class="text-blue-500">{{ melons.toLocaleString() }}</span> (<span class="text-blue-500">{{ mps.toLocaleString() }}</span>/sec)
      </div>
      <button @click="Engine.handleClick" class="focus:outline-none">
        <img draggable="false" src="https://cdn.hypefoxstudios.com/data/melon/img/icon.svg" class="w-64 h-64 cursor-pointer select-none" />
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
                        <UButton @click="Engine.purchase(category.name, building.name)" label="Buy" color="blue" size="lg" class="w-full justify-center" trailing-icon="i-lucide-shopping-cart" />
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
                    &copy; {{ year }} <NuxtLink to="https://hypefoxstudios.com" class="text-blue-500">Hypefox Studios Ltd</NuxtLink> - All Rights Reserved | Version ID: <span class="text-blue-500">{{ verid }}</span>
                </div>
                <div class="pt-4">
                    <UButton @click="resetopen = true" label="Reset" color="red" size="lg" class="w-22 h-8 justify-center" trailing-icon="i-lucide-trash" />
                </div>
            </div>
        </footer>
    </div>
    <div v-if="banned">
        <div class="flex items-center justify-center h-screen">
            <div class="flex flex-col items-center gap-y-2">
                <UIcon name="i-lucide-alert-triangle" class="text-red-500 text-[10rem]" />
                <a class="text-red-500 text-4xl font-bold uppercase">Cheating detected!</a>
                <a class="text-red-500 text-xl">Looks like you've been caught red-handed! Remember, in the game of life, cheats never prosper. Better luck next time!</a>
                <a class="text-red-500 text-xl font-extrabold">Save data has been destroyed.</a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { getData, setData, clear } from "nuxt-storage/local-storage";
    const app = useNuxtApp();
    const verid = ref("536b332a");
    const settings = app.$settings as any;
    const year = new Date().getFullYear();
    const clickhistory = ref(Array());
    const runtime = ref("00:00:00");
    const data = app.$data as any;
    const resetopen = ref(false);
    const banned = ref(false);
    const toast = useToast();
    const clicked = ref(0);
    const melons = ref(0);
    const ticks = ref(0);
    const lang = ref("");
    const level = ref(1);
    const total = ref(0);
    const spent = ref(0);
    const mps = ref(0);
    interface Tracking {
        [key: string]: number;
    };
    interface Cost {
        name: string;
        tracker: boolean;
        base: number;
    };
    interface Condition {
        name: string;
        value: number;
    };
    interface Output {
        name: string;
        value: number;
    };
    interface Building {
        name: string;
        description: string;
        owned: number;
        limit: number;
        cost: Array<Cost>;
        conditions: Array<Condition>;
        output: Array<Output>;
    };
    interface Category {
        name: string;
        members: Array<Building>;
    };
    const tracking = ref({} as Tracking);
    class Engine {
        static price(base: number, owned: number) {
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
            const category = data.buildings.categories.find((category: Category) => category.name === categoryName);
            const building = category.members.find((building: Building) => building.name === buildingName);
            if (building.owned >= building.limit) {
                toast.add({
                    title: "Limit check failed.",
                    description: `You have reached the limit (${building.owned}/${building.limit}) of ${building.name}.`,
                    color: "red",
                    icon: "i-lucide-alert-circle",
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
                                icon: "i-lucide-alert-circle",
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
                                icon: "i-lucide-check",
                                timeout: 5 * 1000
                            });
                            price = Engine.price(cost.base, building.owned);
                            tracking.value[building.name + cost.name] = price;
                        } else {
                            toast.add({
                                title: "Transaction check failed.",
                                description: `You do not have enough melons to purchase this item (need ${price.toLocaleString()}, have ${melons.value.toLocaleString()}, missing ${(price - melons.value).toLocaleString()}).`,
                                color: "red",
                                icon: "i-lucide-alert-circle",
                                timeout: 5 * 1000
                            });
                        };
                        break;
                };
            };
        };
        static saveGame() {
            setData("game", JSON.stringify({
                melons: melons.value,
                level: level.value,
                total: total.value,
                spent: spent.value,
                tracking: tracking.value,
                verid: verid.value,
                data: data
            }));
        };
        static tick() {
            if (banned.value) {
                return;
            };
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
                    icon: "i-lucide-rocket",
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
            Engine.saveGame();
        };
        static init() {
            const game = getData("game");
            if (game) {
                const parsed = JSON.parse(game);
                melons.value = parsed.melons;
                level.value = parsed.level;
                total.value = parsed.total;
                spent.value = parsed.spent;
                tracking.value = parsed.tracking;
                data.buildings = parsed.data.buildings;
            };
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
        static handleClick() {
            clickhistory.value.push(Date.now());
            if (clickhistory.value.length > 15) {
                clickhistory.value.shift();
            };
            melons.value++;
            clicked.value++;
            Engine.anticheat();
            if (!banned.value) {
                Engine.saveGame();
            } else {
                clear("game");
            };
        };
        static clear() {
            clear("game");
            location.reload();
        };
        static anticheat() {
            if (clickhistory.value.length >= 11) {
                const firstClickTime = clickhistory.value[0];
                let sameDelayCount = 0;
                const expectedDelay = clickhistory.value[1] - firstClickTime;
                for (let i = 2; i < clickhistory.value.length; i++) {
                    const currentDelay = clickhistory.value[i] - clickhistory.value[i - 1];
                    if (currentDelay === expectedDelay) {
                        sameDelayCount++;
                    };
                };
                if (sameDelayCount >= 10) {
                    toast.add({
                        title: "Cheating detected!",
                        description: "You have been detected using an autoclicker and the game has been terminated.",
                        color: "red",
                        icon: "i-lucide-alert-circle",
                        timeout: 5 * 1000
                    });
                    banned.value = true;
                };
            };
        };
    };
    Engine.init();
    setInterval(Engine.tick, settings.tick.interval * 1000);
</script>