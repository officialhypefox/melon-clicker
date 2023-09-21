<template>
    <div class="bg-dark-primary h-screen items-center justify-center text-center flex flex-col gap-y-10">
        <span class="text-red-600 text-xl flex gap-x-2 items-center">
            <UIcon name="i-mdi-warning"/>
            Closing this page will cause all progress to be lost!
            <UIcon name="i-mdi-warning"/>
        </span>
        <span class="text-4xl">Cookies: <span class="text-blue-500">{{ cookies.toLocaleString() }}</span> (<span class="text-blue-500">{{ cps.toLocaleString() }}</span>/sec)</span>
        <button @click="cookies++; clicked++;">
            <img src="/img/cookie.png" class="w-64 h-64" />
        </button>
        <span class="text-4xl">Upgrade shop</span>
        <div class="grid">
            <div v-for="(category, index) in data.buildings.categories" :key="index">
                <span class="text-indigo-200 text-2xl">{{ category.name }} (<span class="text-blue-500">{{ category.members.length }}</span>)</span>
                <div class="flex flex-wrap">
                    <div v-for="(building, index) in category.members" class="mr-4 mb-4">
                        <div class="grid mb-2">
                            <span class="text-indigo-400 text-2xl mt-4">{{ building.name }} (<span class="text-blue-500">{{ building.owned }}</span>/<span class="text-blue-500">{{ building.limit }}</span> owned)</span>
                            <span class="text-gray-400 max-w-xs break-words">{{ building.description }}</span>
                            <span class="text-green-600">Production: <span v-for="(output, index) in building.output" :key="index" class="text-gray-400">{{ Engine.title(output.name) }}: <span class="text-blue-500">{{ output.value.toLocaleString() }}</span></span></span>
                            <span class="text-red-400">Conditions: <span v-for="(condition, index) in building.conditions" :key="index" class="text-gray-400">{{ Engine.title(condition.name) }}: <span class="text-blue-500">{{ condition.value.toLocaleString() }}</span></span></span>
                            <span class="text-red-500">Cost: <span v-for="(cost, index) in building.cost" :key="index" class="text-gray-400">{{ Engine.title(cost.name) }}: <span class="text-blue-500">{{ tracking[building.name + cost.name].toLocaleString() }}</span></span></span>
                        </div>
                        <UButton @click="Engine.purchase(category.name, building.name)" label="Buy" color="blue" size="lg" class="w-full justify-center" trailing-icon="i-mdi-shopping-cart" />
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="grid">
                <div>
                    Level: <span class="text-blue-500">{{ level.toLocaleString() }}</span> | CPS for next level: <span class="text-blue-500">{{ Engine.leveling().toLocaleString() }}</span> | Total earned: <span class="text-blue-500">{{ (total + clicked).toLocaleString() }}</span> | Total spent: <span class="text-blue-500">{{ (total - cookies).toLocaleString() }}</span> | Total buildings: <span class="text-blue-500">{{ Engine.buildings().toLocaleString() }}</span> | Earned from buildings: <span class="text-blue-500">{{ total.toLocaleString() }}</span> | Earned from clicking: <span class="text-blue-500">{{ clicked.toLocaleString() }}</span>
                </div>
                <div>
                    &copy; Copyright <NuxtLink to="https://exotical.se" class="text-blue-500">Emilio Persson</NuxtLink> {{ year }} - All Rights Reserved.
                </div>
            </div>
        </footer>
    </div>
</template>
<script setup lang="ts">
    const year = new Date().getFullYear();
    const settings = {
        "leveling": {
            "base": 10
        },
        "tick": {
            "interval": 1
        }
    }
    const leveling = ref({});
    const tracking = ref({});
    const toast = useToast();
    const clicked = ref(0);
    const cookies = ref(0);
    const level = ref(1);
    const total = ref(0);
    const cps = ref(0);
    class Engine {
        static price(base: Number, owned: Number) {
            return 0.1 * base * owned + base;
        };
        static buildings() {
            let count = 0;
            for (const category of data.buildings.categories) {
                for (const building of category.members) {
                    count += building.owned;
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
                    case "cookies":
                        let price = Engine.price(cost.base, building.owned);
                        if (cookies.value >= price) {
                            cookies.value -= price;
                            building.owned++;
                            toast.add({
                                title: "Transaction successful!",
                                description: `Purchased ${building.name}. You now have ${building.owned} of them. ${price.toLocalString()} cookies were deducted from your balance, and you have ${cookies.value.toLocalString()} cookies remaining.`,
                                color: "green",
                                icon: "i-mdi-check",
                                timeout: 5 * 1000
                            });
                            price = Engine.price(cost.base, building.owned);
                            tracking.value[building.name + cost.name] = price;
                        } else {
                            toast.add({
                                title: "Transaction check failed.",
                                description: `You do not have enough cookies to purchase this item (need ${price.toLocaleString()}, have ${cookies.value.toLocaleString()}).`,
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
            cps.value = 0;
            for (const category of data.buildings.categories) {
                for (const building of category.members) {
                    if (building.owned > 0) {
                        for (const output of building.output) {
                            switch (output.name) {
                                case "cookies":
                                    const computed = building.owned * output.value;
                                    cookies.value += computed;
                                    total.value += computed;
                                    cps.value += computed;
                                    break;
                            };
                        };
                    }
                };
            };
            if (cps.value >= Engine.leveling()) {
                level.value++;
                toast.add({
                    title: "Level up!",
                    description: `Good job! You have reached level ${level.value.toLocaleString()}.`,
                    color: "green",
                    icon: "i-mdi-check",
                    timeout: 5 * 1000
                });
            };
        };
        static init() {
            for (const category of data.buildings.categories) {
                for (const building of category.members) {
                    for (const object of building.cost) {
                        tracking.value[building.name + object.name] = object.base;
                    };
                };
            };
        };
        static title(input: string) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        };
    };
    const data = {
        "buildings": {
            "categories": [{
                "name": "Buildings",
                "members": [{
                        "name": "Cookie Harvester",
                        "description": "A simple and weak cookie harvester that harvests 1 cookie per second.",
                        "owned": 0,
                        "limit": 25,
                        "cost": [{
                            "name": "cookies",
                            "tracker": false,
                            "base": 10
                        }],
                        "conditions": [{
                            "name": "level",
                            "value": 1
                        }],
                        "output": [{
                            "name": "cookies",
                            "value": 1
                        }]
                    },
                    {
                        "name": "Cookie Bakery",
                        "description": "An old run-down bakery that produces 2 cookies per second.",
                        "owned": 0,
                        "limit": 100,
                        "cost": [{
                            "name": "cookies",
                            "tracker": false,
                            "base": 100
                        }],
                        "conditions": [{
                            "name": "level",
                            "value": 2
                        }],
                        "output": [{
                            "name": "cookies",
                            "value": 2
                        }]
                    },
                    {
                        "name": "Cookie Factory",
                        "description": "A modern cookie factory that can produce 10 cookies per second.",
                        "owned": 0,
                        "limit": 100,
                        "cost": [{
                            "name": "cookies",
                            "tracker": false,
                            "base": 1000
                        }],
                        "conditions": [{
                            "name": "level",
                            "value": 3
                        }],
                        "output": [{
                            "name": "cookies",
                            "value": 10
                        }]
                    },
                    {
                        "name": "Cookie Mine",
                        "description": "A brand new cookie mine that is capable of producing 50 cookies per second.",
                        "owned": 0,
                        "limit": 100,
                        "cost": [{
                            "name": "cookies",
                            "tracker": false,
                            "base": 5000
                        }],
                        "conditions": [{
                            "name": "level",
                            "value": 4
                        }],
                        "output": [{
                            "name": "cookies",
                            "value": 50
                        }]
                    },
                    {
                        "name": "Cookie Rain",
                        "description": "Cookies start raining all over the town! Produces 100 cookies per second.",
                        "owned": 0,
                        "limit": 100,
                        "cost": [{
                            "name": "cookies",
                            "tracker": false,
                            "base": 10000
                        }],
                        "conditions": [{
                            "name": "level",
                            "value": 5
                        }],
                        "output": [{
                            "name": "cookies",
                            "value": 100
                        }]
                    }
                ]
            }]
        }
    };
    Engine.init();
    setInterval(Engine.tick, settings.tick.interval * 1000);
</script>