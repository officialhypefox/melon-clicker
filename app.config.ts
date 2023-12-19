// https://nuxt.com/docs/guide/directory-structure/app-config
export default defineAppConfig({
    ui: {
        notifications: {
            position: "top-0 bottom-auto"
        },
        notification: {
            background: "!bg-dark-secondary",
            ring: "ring-1 !ring-dark-tertiary",
            default: {
                closeButton: {
                    icon: "i-lucide-x"
                }
            }
        },
        selectMenu: {
            background: "!bg-dark-secondary",
            ring: "ring-1 !ring-dark-tertiary",
            option: {
                active: "!bg-dark-tertiary"
            }
        },
        modal: {
            background: "!bg-dark-secondary",
            ring: "ring-1 !ring-dark-tertiary"
        }
    }
});