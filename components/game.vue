<template>
    <div v-if="!banned && !loading" class="bg-gray-900 min-h-screen flex flex-col text-white">
      <UModal v-model="creditsMenuOpen">
        <div class="bg-gray-900 p-6 rounded-lg text-white">
          <h3 class="text-2xl font-bold text-center mb-4">Melon Clicker: Credits</h3>
          <div class="grid gap-4">
            <h4 class="text-xl font-bold">Development Team</h4>
            <div class="flex justify-between">
              <span>Game Development Lead:</span>
              <span class="text-green-400">Emilio Persson</span>
            </div>
            <div class="flex justify-between">
              <span>Game Design Lead:</span>
              <span class="text-green-400">Emilio Persson</span>
            </div>
            <div class="flex justify-between">
              <span>Published By:</span>
              <span class="text-green-400">Hypefox Ltd</span>
            </div>
            <div class="flex justify-between">
              <span>Version:</span>
              <span class="text-green-400">{{ verid }}</span>
            </div>
          </div>
          <div class="grid gap-4 mt-4">
            <h4 class="text-xl font-bold">Notable Mentions</h4>
            <div class="grid gap-4">
              <div class="flex justify-between">
                <span>Head Playtester:</span>
                <span class="text-green-400">nsoolo</span>
              </div>
              <div class="flex justify-between">
                <span>Beta Tester:</span>
                <span class="text-green-400">Cirrus</span>
              </div>
            </div>
          </div>
          <div class="text-center mt-4">
            &copy; {{ year }}
            <a
              href="https://hypefox.net"
              class="text-orange-400 hover:text-orange-300"
              >Hypefox Entertainment Software</a
            >
          </div>
          <div class="flex justify-center gap-4 mt-4">
            <UButton @click="creditsMenuOpen = !creditsMenuOpen; infoModalOpen = !infoModalOpen" icon="i-lucide-menu" label="Menu" color="gray" />
            <UButton @click="creditsMenuOpen = !creditsMenuOpen" label="Close" trailing-icon="i-lucide-x" color="orange" />
          </div>
        </div>
      </UModal>
      <UModal v-model="statsMenuOpen">
        <div class="bg-gray-900 p-6 rounded-lg text-white">
          <h3 class="text-2xl font-bold text-center mb-4">Melon Clicker: Statistics</h3>
          <div class="grid gap-4">
            <div class="flex justify-between">
              <span>Total melons earned:</span>
              <span class="text-green-400">{{ total.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span>Reach for next level:</span>
              <span class="text-green-400">{{ Engine.leveling() - mps > 0 ? Engine.leveling().toLocaleString() + '/s' : 'Calculating...' }}</span>
            </div>
            <div class="flex justify-between">
              <span>Total melons spent:</span>
              <span class="text-green-400">{{ spent.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span>Total melon clicks:</span>
              <span class="text-green-400">{{ clicked.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span>Buildings owned:</span>
              <span class="text-green-400">{{ Engine.buildings() }}/{{ Engine.buildings(true, true).toLocaleString() }} ({{ Engine.progress() }}%)</span>
            </div>
            <div class="flex justify-between">
              <span>Engine runtime:</span>
              <span class="text-green-400">{{ runtime }}</span>
            </div>
          </div>
          <div class="flex justify-center gap-4 mt-4">
            <UButton @click="statsMenuOpen = !statsMenuOpen; infoModalOpen = !infoModalOpen" icon="i-lucide-menu" label="Menu" color="gray" />
            <UButton @click="statsMenuOpen = !statsMenuOpen" label="Close" trailing-icon="i-lucide-x" color="orange" />
          </div>
        </div>
      </UModal>
      <UModal v-model="infoModalOpen">
        <div class="bg-gray-900 p-6 rounded-lg text-white">
        <h3 class="text-2xl text-center font-bold mb-4">Melon Clicker: Main Menu</h3>
        <div class="grid justify-center gap-y-4">
          <div class="flex gap-x-4 justify-center">
            <UButton
              @click="infoModalOpen = !infoModalOpen; statsMenuOpen = !statsMenuOpen"
              label="Statistics"
              icon="i-lucide-pie-chart"
              class="justify-center"
              color="blue"
              variant="outline"
            />
            <UButton
              @click="infoModalOpen = !infoModalOpen; resetopen = !resetopen"
              label="Start Over"
              icon="i-lucide-trash"
              class="justify-center"
              color="red"
              variant="outline"
            />
          </div>
          <div class="flex gap-x-4 justify-center">
            <UButton
              @click="infoModalOpen = !infoModalOpen; creditsMenuOpen = !creditsMenuOpen"
              label="Credits"
              icon="i-lucide-info"
              class="justify-center"
              color="green"
              variant="outline"
            />
            <UButton
              @click="infoModalOpen = !infoModalOpen"
              label="Close"
              trailing-icon="i-lucide-x"
              class="justify-center"
              color="orange"
              variant="outline"
            />
          </div>
          </div>
        </div>
      </UModal>
      <header class="bg-gray-800 p-4 sticky top-0 z-10">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-2xl font-bold">
            <a
              href="https://hypefox.net"
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
                    <span class="text-xs text-gray-400">{{ Engine.getOwned(building.name).toLocaleString() }}/{{ building.limit.toLocaleString() }}</span>
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
                >{{ total.toLocaleString() }}</span
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
              href="https://hypefox.net"
              class="text-orange-400 hover:text-orange-300"
              >Hypefox Corporation</a
            >
            <UButton
              @click="infoModalOpen = !infoModalOpen"
              label="Menu"
              trailing-icon="i-lucide-menu"
              square
              color="orange"
              variant="soft"
              size="xs"
              class="ml-2 mt-1"
            />
          </div>
        </div>
      </footer>
  
      <UModal v-model="resetopen">
        <div class="bg-gray-900 p-6 rounded-lg text-white">
          <h3 class="text-2xl font-bold mb-4">Reset save data?</h3>
          <p class="text-gray-400 mb-6">
            All game progress will be wiped and the game will reload. This cannot
            be undone.
          </p>
          <div class="flex justify-end gap-4">
            <UButton @click="resetopen = !resetopen; infoModalOpen = !infoModalOpen" icon="i-lucide-menu" label="Menu" color="gray" />
            <UButton @click="Engine.clear()" label="Reset" color="red" trailing-icon="i-lucide-check" />
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
    const verid = ref("v2-rc1");
    const settings = app.$settings as any;
    const year = new Date().getFullYear();
    const creditsMenuOpen = ref(false);
    const data = ref(app.$data as any);
    const clickhistory = ref(Array());
    const infoModalOpen = ref(false);
    const statsMenuOpen = ref(false);
    const runtime = ref("00:00:00");
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
        return data.value.buildings.categories.flatMap((category: Category) => 
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
                for (const category of data.value.buildings.categories) {
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
                for (const category of data.value.buildings.categories) {
                    for (const building of category.members) {
                        if (all) {
                            count += building.limit;
                        } else {
                            count += building.owned;
                        };
                    };
                };
            } else {
                for (const category of data.value.buildings.categories) {
                    count += category.members.length;
                };
            };
            return count;
        };
        static leveling() {
            return settings.leveling.base * (level.value ** 2);
        };
        static getOwned(buildingName: string) {
            for (const category of data.value.buildings.categories) {
                for (const building of category.members) {
                    if (building.name === buildingName) {
                        return building.owned;
                    };
                };
            };
            return 0;
        };
        static purchase(categoryName: string, buildingName: string, max: boolean = false, propagate = true) {
            const category = data.value.buildings.categories.find((category: Category) => category.name === categoryName);
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
                    runtime: runtime.value,
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
            for (const category of data.value.buildings.categories) {
                for (const building of category.members) {
                    if (building.owned > 0) {
                        for (const output of building.output) {
                            switch (output.name) {
                                case "melons":
                                    const computed = (building.owned * output.value) * settings.general.inflationRate;
                                    mps.value += computed;
                                    break;
                            };
                        };
                    }
                };
            };
            melons.value += mps.value;
            total.value += mps.value;
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
                    runtime.value = parsed.runtime;
                    clicked.value = parsed.clicks;
                    melons.value = parsed.melons;
                    level.value = parsed.level;
                    total.value = parsed.total;
                    spent.value = parsed.spent;
                    tracking.value = parsed.tracking;
                    data.value.buildings = parsed.data.buildings;
                    if (parsed.verid !== verid.value) {
                        toast.add({
                            title: "Game updated!",
                            description: `The game has been updated to version ${verid.value}. Your save data has been migrated, reset if you encounter any issues.`,
                            color: "blue",
                            icon: "i-lucide-rocket",
                            timeout: 5 * 1000
                        });
                    } else {
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
        };
        static title(input: string) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        };
        static handleClick() {
            clickhistory.value.push(Date.now());
            if (clickhistory.value.length > 25) {
                clickhistory.value.shift();
            };
            if (mps.value < 4) {
                melons.value++;
                total.value++;
            } else {
                const computed = Math.floor(mps.value / 2);
                melons.value += computed;
                total.value += computed;
            };
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
            const minClicks = 50;
            const maxTimeWindow = 10000;
            const humanVariability = 0.2;
            const suspiciousThreshold = 0.8;
            if (clickhistory.value.length >= minClicks) {
                const recentClicks = clickhistory.value.slice(-minClicks);
                const timeWindow = recentClicks[recentClicks.length - 1] - recentClicks[0];
                if (timeWindow <= maxTimeWindow) {
                    const intervals = [];
                    for (let i = 1; i < recentClicks.length; i++) {
                        intervals.push(recentClicks[i] - recentClicks[i - 1]);
                    };
                    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
                    const stdDeviation = Math.sqrt(intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length);
                    let suspiciousClicks = 0;
                    for (let i = 0; i < intervals.length; i++) {
                        const lowerBound = avgInterval * (1 - humanVariability);
                        const upperBound = avgInterval * (1 + humanVariability);
                        if (intervals[i] >= lowerBound && intervals[i] <= upperBound) {
                            suspiciousClicks++;
                        };
                    };
                    const suspiciousRatio = suspiciousClicks / intervals.length;
                    const tooConsistent = stdDeviation / avgInterval < 0.1;
                    const tooFast = avgInterval < 50;
                    if (suspiciousRatio >= suspiciousThreshold || tooConsistent || tooFast) {
                        toast.add({
                            title: "Cheating detected!",
                            description: "Suspicious clicking pattern detected. The game has been terminated.",
                            color: "red",
                            icon: "i-lucide-alert-circle",
                            timeout: 5 * 1000
                        });
                        banned.value = true;
                    };
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
