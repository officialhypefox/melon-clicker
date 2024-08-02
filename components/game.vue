<template>
    <div v-if="!banned && !loading" class="bg-gray-900 min-h-screen flex flex-col text-white">
      <header class="bg-gray-800 p-4 sticky top-0 z-10">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-2xl font-bold">
            <a
              href="https://hypefoxstudios.com"
              class="text-orange-400 hover:text-orange-300 mr-2"
              >Hypefox</a
            >
            <span class="text-red-500">Melon</span> <span class="text-green-500">Clicker</span> <span class="text-gray-400">{{ verid }}</span>
          </div>
          <div class="text-xl">
            Level: <span class="text-green-400">{{ level.toLocaleString() }}</span>
          </div>
        </div>
      </header>
      <main class="flex-grow flex items-center justify-center p-4">
        <div
          class="container mx-auto flex flex-col lg:flex-row items-center gap-8"
        >
          <div class="flex flex-col lg:flex-row lg:items-center gap-8">
            <div
              class="lg:w-1/4 flex flex-col items-center justify-center lg:justify-center"
            >
              <div class="text-xl mb-4 grid text-center">
                <div>
              <div>
                <span class="text-green-400">{{ melons.toLocaleString() }}</span>
              </div>
            </div>
                <div>
                    (<span class="text-green-400">{{ mps.toLocaleString() }}</span>/s)
                </div>
              </div>
              <button
                @click="handleMelonClick"
                class="focus:outline-none relative group flex items-center justify-center"
              >
                <img
                  ref="melonImage"
                  draggable="false"
                  src="https://cdn.hypefox.net/data/melon/img/icon.svg"
                  class="w-72 cursor-pointer select-none transition-all duration-200 ease-in-out group-hover:scale-105"
                />
              </button>
            </div>
  
            <div class="lg:w-3/4 flex flex-col">
              <h2 class="text-2xl font-bold mb-4">
                Real Estate Broker (<span class="text-green-400"
                  >{{ data.buildings.categories[0].members.length }}</span
                >
                available)
              </h2>
              <div
                class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <div
                  v-for="(building, buildIndex) in flattenedBuildings"
                  :key="buildIndex"
                  class="bg-gray-800 p-3 rounded transition-colors duration-200"
                  :class="{
                        'hover:bg-gray-700': building.owned < building.limit,
                        '!opacity-50': building.owned >= building.limit
                    }"
                >
                  <div class="flex justify-between items-center mb-1">
                    <span class="font-medium text-sm">{{ building.name }}</span>
                    <span class="text-xs text-gray-400"
                      >{{ Engine.getOwned(building.name) }}/{{ building.limit
                      }}</span
                    >
                  </div>
                  <div class="text-xs text-gray-400 text-center mb-1">
                    {{ building.description }}
                  </div>
                  <div
                    class="text-xs text-green-400 flex justify-center gap-x-1"
                  >
                    Production:
                    <span v-for="(output, index) in building.output" :key="index">
                      {{ Engine.title(output.name) }}: {{ (output.value *
                      settings.general.inflationRate).toLocaleString() }}
                    </span>
                  </div>
                  <div
                    class="text-xs text-red-400 flex justify-center gap-x-1"
                  >
                    Cost:
                    <span v-for="(cost, index) in building.cost" :key="index">
                      {{ Engine.title(cost.name) }}: {{ Engine.price(cost.base, Engine.getOwned(building.name)).toLocaleString() }}
                    </span>
                  </div>
                  <div
                        class="text-xs text-orange-400 flex justify-center gap-x-1 mb-2"
                    >
                    Conditions:
                    <span v-for="(condition, index) in building.conditions" :key="index">
                        {{ Engine.title(condition.name) }}: {{ condition.value }}
                    </span>
                </div>
                  <div class="flex justify-around">
                    <UButton
                    @click="Engine.purchase(building.category, building.name)"
                    label="Buy 1"
                    color="green"
                    size="sm"
                    variant="soft"
                    class="justify-center"
                    trailing-icon="i-lucide-coins"
                    :disabled="!Engine.purchase(building.category, building.name, false, false)"
                  />
                    <UButton
                        @click="Engine.purchase(building.category, building.name, true)"
                        :label="`Buy Max (${Engine.purchase(building.category, building.name, true, false) || 0})`"
                        color="red"
                        size="sm"
                        variant="outline"
                        class="justify-center"
                        trailing-icon="i-lucide-shopping-cart"
                        :disabled="!Engine.purchase(building.category, building.name, true, false)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <footer class="bg-gray-800 p-3 mt-auto">
        <div class="container mx-auto text-sm text-gray-400">
          <div class="flex justify-center gap-x-2">
            <div>
              Total earned:
              <span class="text-green-400"
                >{{ (total + clicked).toLocaleString() }}</span
              >
            </div>
            <div>
              Total spent:
              <span class="text-green-400">{{ spent.toLocaleString() }}</span>
            </div>
            <div>
              Progress:
              <span class="text-green-400">{{ Engine.progress() }}%</span>
            </div>
          </div>
          <div class="text-center">
            &copy; {{ year }}
            <a
              href="https://hypefoxstudios.com"
              class="text-orange-400 hover:text-orange-300"
              >Hypefox Corporation</a
            >
            <UButton
              @click="resetopen = true"
              label="Reset Game"
              trailing-icon="i-lucide-trash"
              square
              color="red"
              size="xs"
              class="ml-2 mt-1"
            />
          </div>
        </div>
      </footer>
  
      <UModal v-model="resetopen">
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-2xl font-bold mb-4">Reset save data?</h3>
          <p class="text-gray-400 mb-6">
            All game progress will be wiped and the game will reload. This cannot
            be undone.
          </p>
          <div class="flex justify-end gap-4">
            <UButton @click="resetopen = false" label="Cancel" color="gray" />
            <UButton @click="Engine.clear()" label="Reset" color="red" />
          </div>
        </div>
      </UModal>
    </div>
  
    <div v-else-if="loading" class="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <UIcon name="i-lucide-loader" class="text-green-500 text-6xl md:text-8xl animate-spin" />
    </div>
    <div
      v-if="banned"
      class="min-h-screen flex items-center justify-center p-4 bg-gray-900"
    >
      <div class="text-center">
        <UIcon
          name="i-lucide-alert-triangle"
          class="text-red-500 text-6xl md:text-8xl mb-4"
        />
        <h2 class="text-red-500 text-3xl md:text-4xl font-bold mb-4">
          Cheating Detected!
        </h2>
        <p class="text-gray-400 text-lg mb-4">
          Looks like you've been caught red-handed! Remember, in the game of life,
          cheats never prosper.
        </p>
        <p class="text-red-400 text-xl font-bold">
          Save data has been destroyed.
        </p>
      </div>
    </div>
</template>
<script setup lang="ts">
    const app = useNuxtApp();
    const loading = ref(true);
    const verid = ref("v2-beta04");
    const settings = app.$settings as any;
    const year = new Date().getFullYear();
    const clickhistory = ref(Array());
    const runtime = ref("00:00:00");
    const data = app.$data as any;
    const resetopen = ref(false);
    const shouldTick = ref(true);
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
        cost: Array < Cost > ;
        conditions: Array < Condition > ;
        output: Array < Output > ;
    };
    interface Category {
        name: string;
        members: Array < Building > ;
    };
    const tracking = ref({} as Tracking);
    const melonImage = ref(null as any);
    const handleMelonClick = () => {
        Engine.handleClick()
        if (melonImage.value) {
            melonImage.value.style.transform = "scale(0.75)";
            setTimeout(() => {
                melonImage.value.style.transform = "scale(1)";
            }, 50);
        };
    };
    const flattenedBuildings = computed(() => {
        return data.buildings.categories.flatMap((category: Category) => 
            category.members.map((building: Building) => ({
                ...building,
                category: category.name
            }))
        );
    });
    class Engine {
        static price(basePrice: number, ownedCount: number, quantity: number = 1): number {
            return basePrice * (1 + ownedCount * quantity) * settings.general.inflationRate;
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
                    count += category.members.length;
                };
            };
            return count;
        };
        static leveling() {
            return settings.leveling.base * (level.value ** 2);
        };
        static getOwned(buildingName: string) {
            for (const category of data.buildings.categories) {
                for (const building of category.members) {
                    if (building.name === buildingName) {
                        return building.owned;
                    };
                };
            };
            return 0;
        };
        static purchase(categoryName: string, buildingName: string, max: boolean = false, propagate = true) {
            const category = data.buildings.categories.find((category: Category) => category.name === categoryName);
            if (!category) return console.error(`Category ${categoryName} not found. Fatal error.`);
            const building = category.members.find((building: Building) => building.name === buildingName);
            if (!building) return console.error(`Building ${buildingName} not found. Fatal error.`);
            for (const requirement of building.conditions) {
                switch (requirement.name) {
                    case "level":
                        if (level.value < requirement.value) {
                            return false;
                        };
                        break;
                };
            };
            if (max) {
                const maxPossibleBuys = building.limit - building.owned;
                let maxAfforded = 0;
                let totalPrice = 0;
                for (const cost of building.cost) {
                    switch (cost.name) {
                        case "melons":
                            for (let i = maxPossibleBuys; i > 0; i--) {
                                let canAfford = true;
                                let totalCost = 0;
                                for (let j = 0; j < i; j++) {
                                    const price = Engine.price(cost.base, building.owned + j, 1);
                                    totalCost += price;
                                    totalPrice = totalCost;
                                    if (melons.value < totalCost) {
                                        canAfford = false;
                                        break;
                                    };
                                };
                                if (canAfford) {
                                    maxAfforded = i;
                                    break;
                                };
                            };
                            break;
                    };
                }
                if (!propagate) {
                    return maxAfforded;
                };
                for (const cost of building.cost) {
                    switch (cost.name) {
                        case "melons":
                            melons.value -= totalPrice;
                            spent.value += totalPrice;
                            break;
                    };
                };
                building.owned += maxAfforded;
                tracking.value[building.name + "melons"] = Engine.price(building.cost[0].base, building.owned);
                return true;
            } else {
                let canAfford = true;
                for (const cost of building.cost) {
                    switch (cost.name) {
                        case "melons":
                            if (melons.value < Engine.price(cost.base, building.owned)) {
                                canAfford = false;
                            };
                            break;
                    };
                };
                if (building.owned >= building.limit) {
                    return false;
                };
                if (!propagate) {
                    return canAfford;
                };
                for (const cost of building.cost) {
                    switch (cost.name) {
                        case "melons":
                            melons.value -= Engine.price(cost.base, building.owned);
                            spent.value += Engine.price(cost.base, building.owned);
                            break;
                    };
                };
                building.owned++;
                tracking.value[building.name + "melons"] = Engine.price(building.cost[0].base, building.owned);
                return true;
            };
        };
        static saveGame() {
            if (!import.meta.server) {
                localStorage.setItem("game", JSON.stringify({
                    melons: melons.value,
                    clicks: clicked.value,
                    level: level.value,
                    total: total.value,
                    spent: spent.value,
                    tracking: tracking.value,
                    verid: verid.value,
                    data: data
                }));
            };
        };
        static tick() {
            if (banned.value || !shouldTick.value) {
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
            if (!import.meta.server) {
                const game = localStorage.getItem("game");
                if (game) {
                    const parsed = JSON.parse(game);
                    clicked.value = parsed.clicks;
                    melons.value = parsed.melons;
                    level.value = parsed.level;
                    total.value = parsed.total;
                    spent.value = parsed.spent;
                    tracking.value = parsed.tracking;
                    if (parsed.verid !== verid.value) {
                        toast.add({
                            title: "Game updated!",
                            description: `The game has been updated to version ${verid.value}. Your save data has been migrated, reset if you encounter any issues.`,
                            color: "blue",
                            icon: "i-lucide-rocket",
                            timeout: 5 * 1000
                        });
                    } else {
                        data.buildings = parsed.data.buildings;
                        toast.add({
                            title: "Game loaded!",
                            description: "Your save data has been successfully loaded.",
                            color: "green",
                            icon: "i-lucide-check",
                            timeout: 5 * 1000
                        });
                    };
                } else {
                    toast.add({
                        title: "Welcome to Melon Clicker!",
                        description: "This is your first time playing the game. Enjoy!",
                        color: "green",
                        icon: "i-lucide-heart",
                        timeout: 5 * 1000
                    });
                };
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
            if (clickhistory.value.length > 25) {
                clickhistory.value.shift();
            };
            melons.value++;
            clicked.value++;
            Engine.anticheat();
            if (!banned.value) {
                Engine.saveGame();
            } else {
                if (!import.meta.server) localStorage.removeItem("game");
            };
        };
        static clear() {
            shouldTick.value = false;
            loading.value = true;
            if (!import.meta.server) localStorage.removeItem("game");
            location.reload();
        };
        static anticheat() {
            if (clickhistory.value.length >= 20) {
                const firstClickTime = clickhistory.value[0];
                let sameDelayCount = 0;
                const expectedDelay = clickhistory.value[1] - firstClickTime;
                const threshold = 5;
                for (let i = 2; i < clickhistory.value.length; i++) {
                    const currentDelay = clickhistory.value[i] - clickhistory.value[i - 1];
                    if (currentDelay >= expectedDelay - threshold && currentDelay <= expectedDelay + threshold) {
                        sameDelayCount++;
                    } else {
                        sameDelayCount = 0;
                    };
                };
                if (sameDelayCount >= 15) {
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
    onMounted(() => {
        setTimeout(() => {
            Engine.init();
            loading.value = false;
        }, 1000);
        setInterval(() => {
            Engine.tick();
        }, settings.tick.interval * 1000);
    });
    console.info("[✅] Engine is running.");
</script>
