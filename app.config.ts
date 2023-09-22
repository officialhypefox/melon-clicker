// https://nuxt.com/docs/guide/directory-structure/app-config
export default defineAppConfig({
    ui: {
        notification: {
            title: "text-sm font-medium text-white",
            background: "bg-dark-secondary",
            ring: "ring-1 ring-dark-tertiary",
            default: {
                closeButton: {
                    icon: "i-ic-close"
                }
            },
            color: {
                variant: {
                    solid: "shadow-sm text-gray-700 bg-{color}-500 hover:bg-{color}-600 bg-{color}-400 hover:bg-{color}-500 disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-400"
                }
            }
        },
        notifications: {
            position: "top-0 right-0"
        },
        selectMenu: {
            background: "bg-dark-secondary",
            ring: "ring-1 ring-dark-tertiary",
            option: {
                active: "bg-dark-tertiary"
            }
        },
        modal: {
            background: "bg-dark-secondary",
            ring: "ring-1 ring-dark-tertiary"
        }
    }
});