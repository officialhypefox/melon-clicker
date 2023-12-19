const settings = {
    general: {
        inflationRate: 5
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
                    description: `A simple and weak melon machine that harvests ${1 * settings.general.inflationRate} melons per second.`,
                    owned: 0,
                    limit: 25,
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
                    name: "Melon Farm",
                    description: `An old run-down melon farm that produces ${2 * settings.general.inflationRate} melons per second.`,
                    owned: 0,
                    limit: 500,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 100
                    }],
                    conditions: [{
                        name: "level",
                        value: 2
                    }],
                    output: [{
                        name: "melons",
                        value: 2
                    }]
                },
                {
                    name: "Melon Factory",
                    description: `A modern melon factory that can produce ${10 * settings.general.inflationRate} melons per second.`,
                    owned: 0,
                    limit: 500,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 1000
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
                    name: "Melon Mine",
                    description: `A brand new melon mine that is capable of producing ${50 * settings.general.inflationRate} melons per second.`,
                    owned: 0,
                    limit: 500,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 5000
                    }],
                    conditions: [{
                        name: "level",
                        value: 4
                    }],
                    output: [{
                        name: "melons",
                        value: 50
                    }]
                },
                {
                    name: "Melon Rain",
                    description: `Melons start raining all over the town! Produces ${100 * settings.general.inflationRate} melons per second.`,
                    owned: 0,
                    limit: 500,
                    cost: [{
                        name: "melons",
                        tracker: false,
                        base: 10000
                    }],
                    conditions: [{
                        name: "level",
                        value: 5
                    }],
                    output: [{
                        name: "melons",
                        value: 100
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