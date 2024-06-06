export const menuItems = [
    {
        label: "menuitems.menu.text",
        isTitle: true

    },
    {
        label: 'menuitems.dashboard.text',
        icon: 'ri-dashboard-line',
        link: '/',
        permission: 'dashboard'
    },
    {
        label: 'menuitems.account-management.text',
        icon: 'ri-user-3-line',
        subItems: [
            {
                label: 'menuitems.account-management.roles',
                link: '/roles',
                permission: 'role-list'
            },
            {
                label: 'menuitems.account-management.permissions',
                link: '/permissions',
                permission: 'permission-list'
            },
        ]
    },
];