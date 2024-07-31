const settings = {
    general: {
        inflationRate: 1
    },
    leveling: {
        base: 10
    },
    tick: {
        interval: 1
    }
};
const data = {
    buildings: {
        categories: [{
            name: "Buildings",
            members: [
                {
                    name: "Melon Seed",
                    description: "A simple melon seed, the start of your melon empire.",
                    owned: 0,
                    limit: 100,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 10
                    }],
                    conditions: [{
                        name: "level",
                        value: 1
                    }],
                    output: [{
                        name: "melons",
                        value: 1
                    }]
                },
                {
                    name: "Melon Plant",
                    description: "A thriving melon plant, growing strong and healthy.",
                    owned: 0,
                    limit: 250,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 100
                    }],
                    conditions: [{
                        name: "level",
                        value: 3
                    }],
                    output: [{
                        name: "melons",
                        value: 10
                    }]
                },
                {
                    name: "Melon Patch",
                    description: "A lush patch filled with bountiful melon plants.",
                    owned: 0,
                    limit: 500,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 1000
                    }],
                    conditions: [{
                        name: "level",
                        value: 5
                    }],
                    output: [{
                        name: "melons",
                        value: 50
                    }]
                },
                {
                    name: "Melon Field",
                    description: "A sprawling field of melons stretching as far as the eye can see.",
                    owned: 0,
                    limit: 1000,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 5000
                    }],
                    conditions: [{
                        name: "level",
                        value: 10
                    }],
                    output: [{
                        name: "melons",
                        value: 200
                    }]
                },
                {
                    name: "Melon Greenhouse",
                    description: "A state-of-the-art greenhouse providing optimal conditions for melon growth.",
                    owned: 0,
                    limit: 1500,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 20000
                    }],
                    conditions: [{
                        name: "level",
                        value: 15
                    }],
                    output: [{
                        name: "melons",
                        value: 800
                    }]
                },
                {
                    name: "Melon Farm",
                    description: "A dedicated melon farm producing melons in abundance.",
                    owned: 0,
                    limit: 2000,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 100000
                    }],
                    conditions: [{
                        name: "level",
                        value: 20
                    }],
                    output: [{
                        name: "melons",
                        value: 3200
                    }]
                },
                {
                    name: "Melon Factory",
                    description: "An industrial factory designed to mass-produce melons.",
                    owned: 0,
                    limit: 2500,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 500000
                    }],
                    conditions: [{
                        name: "level",
                        value: 30
                    }],
                    output: [{
                        name: "melons",
                        value: 12800
                    }]
                },
                {
                    name: "Melon Research Lab",
                    description: "A high-tech lab conducting cutting-edge research on melons.",
                    owned: 0,
                    limit: 3000,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 1000000
                    }],
                    conditions: [{
                        name: "level",
                        value: 40
                    }],
                    output: [{
                        name: "melons",
                        value: 51200
                    }]
                },
                {
                    name: "Melon Dimension",
                    description: "A portal to a dimension where melons grow in endless abundance.",
                    owned: 0,
                    limit: 3500,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 5000000
                    }],
                    conditions: [{
                        name: "level",
                        value: 50
                    }],
                    output: [{
                        name: "melons",
                        value: 200000
                    }]
                },
                {
                    name: "Melon Universe",
                    description: "A universe solely dedicated to melon production.",
                    owned: 0,
                    limit: 4000,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 50000000
                    }],
                    conditions: [{
                        name: "level",
                        value: 100
                    }],
                    output: [{
                        name: "melons",
                        value: 800000
                    }]
                },
                {
                    name: "Melon Multiverse",
                    description: "An infinite multiverse filled with countless melon universes.",
                    owned: 0,
                    limit: 4500,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 1000000000
                    }],
                    conditions: [{
                        name: "level",
                        value: 200
                    }],
                    output: [{
                        name: "melons",
                        value: 3200000
                    }]
                },
                {
                    name: "Melon Omniverse",
                    description: "An omniverse where melons are the fundamental building blocks of existence.",
                    owned: 0,
                    limit: 5000,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 10000000000
                    }],
                    conditions: [{
                        name: "level",
                        value: 300
                    }],
                    output: [{
                        name: "melons",
                        value: 12800000
                    }]
                }
            ]
        }]
    }
};
export default defineNuxtPlugin((app) => {
    app.provide("settings", settings);
    app.provide("data", data);
});
