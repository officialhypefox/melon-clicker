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
            members: [{
                    name: "Melon Machine",
                    description: `A simple and weak melon machine that harvests ${5 * settings.general.inflationRate} melons per second.`,
                    owned: 0,
                    limit: 100,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 50
                    }],
                    conditions: [{
                        name: "level",
                        value: 1
                    }],
                    output: [{
                        name: "melons",
                        value: 5
                    }]
                },
                {
                    name: "Melon Farm",
                    description: `An old run-down melon farm that produces ${15 * settings.general.inflationRate} melons per second.`,
                    owned: 0,
                    limit: 500,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 250
                    }],
                    conditions: [{
                        name: "level",
                        value: 5
                    }],
                    output: [{
                        name: "melons",
                        value: 15
                    }]
                },
                {
                    name: "Melon Factory",
                    description: `A modern melon factory that can produce ${60 * settings.general.inflationRate} melons per second.`,
                    owned: 0,
                    limit: 1000,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 1500
                    }],
                    conditions: [{
                        name: "level",
                        value: 10
                    }],
                    output: [{
                        name: "melons",
                        value: 60
                    }]
                },
                {
                    name: "Melon Mine",
                    description: `A brand new melon mine that is capable of producing ${300 * settings.general.inflationRate} melons per second.`,
                    owned: 0,
                    limit: 2500,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 10000
                    }],
                    conditions: [{
                        name: "level",
                        value: 15
                    }],
                    output: [{
                        name: "melons",
                        value: 300
                    }]
                },
                {
                    name: "Melon Rain",
                    description: `Melons start raining all over the town! Produces ${1000 * settings.general.inflationRate} melons per second.`,
                    owned: 0,
                    limit: 5000,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 50000
                    }],
                    conditions: [{
                        name: "level",
                        value: 20
                    }],
                    output: [{
                        name: "melons",
                        value: 1000
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