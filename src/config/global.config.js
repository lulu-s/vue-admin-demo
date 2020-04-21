let def = "el-icon-tickets";

const data = {
    user: "./assets/img/user.jpeg",
    title: {
        name: "Emerge",
        src: "./assets/img/logo.svg",
        href: "http://emerge.cc/"
    },
    device: "desktop",
    account: {
        username: "admin",
        password: "123456"
    },
    userData: [
        {
            name: 'admin',
            password: '123456'
        },
        {
            name: 'user',
            password: '000000'
        }
    ],
    ipData: [
        {
            name: '🐰',
            ip: '192.168.1.10',
            state: false
        }, 
        {
            name: '🐯',
            ip: '192.168.1.20',
            state: false
        }, 
        {
            name: '🐼',
            ip: '192.168.1.30',
            state: true
        }, 
        {
            name: '🦊',
            ip: '192.168.1.40',
            state: false
        }
    ],
    menu: [
        {
            name: "仪表盘",
            id: "Dashboard",
            icon: "el-icon-orange",
            component: "Dashboard",
            meta: {
                breadNum: 1
            }
        },
        {
            name: "后台配置",
            id: "user",
            component: "user",
            icon: "el-icon-lollipop",
            meta: {
                breadNum: 1
            },
            redirect: '/user',
            sub: [
                {
                    name: "管理员列表",
                    id: "UserList",
                    icon: def,
                    component: "UserList",
                    meta: {
                        breadNum: 2,
                        name: "后台配置"
                    },
                },
                {
                    name: "其他管理",
                    id: "UserManage",
                    icon: def,
                    component: "UserManage",
                    meta: {
                        breadNum: 2,
                        name: "后台配置"
                    }
                },
                
            ]
        },
        {
            name: "数据管理",
            id: "manage",
            component: "ManageIp",
            icon: "el-icon-s-tools",
            meta: {
                breadNum: 1
            },
            redirect: '/manage',
            sub: [
                {
                    name: "ip管理",
                    id: "ManageIp",
                    icon: def,
                    component: "ManageIp",
                    meta: {
                        breadNum: 2,
                        name: "数据管理"
                    }
                },
                {
                    name: "配置文件",
                    id: "ManageConfig",
                    icon: def,
                    component: "ManageConfig",
                    meta: {
                        breadNum: 2,
                        name: "数据管理"
                    }
                },
            ]
        }
    ],
    dashboard: {
        lineChartData: {
            newVisitis: {
              expectedData: [100, 120, 161, 134, 105, 160, 165],
              actualData: [120, 82, 91, 154, 162, 140, 145]
            },
            messages: {
              expectedData: [200, 192, 120, 144, 160, 130, 140],
              actualData: [180, 160, 151, 106, 145, 150, 130]
            },
            purchases: {
              expectedData: [80, 100, 121, 104, 105, 90, 100],
              actualData: [120, 90, 100, 138, 142, 130, 130]
            },
            shoppings: {
              expectedData: [130, 140, 141, 142, 145, 150, 160],
              actualData: [120, 82, 91, 154, 162, 140, 130]
            }
        },
        pieChartData: {
            data: [
                { value: 320, name: 'Industries' },
                { value: 240, name: 'Technology' },
                { value: 149, name: 'Forex' },
                { value: 100, name: 'Gold' },
                { value: 59, name: 'Forecasts' }
            ],
            header: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        RaddarChart: {
            data: [
                {
                  value: [5000, 7000, 12000, 11000, 15000, 14000],
                  name: 'Allocated Budget'
                },
                {
                  value: [4000, 9000, 15000, 15000, 13000, 11000],
                  name: 'Expected Spending'
                },
                {
                  value: [5500, 11000, 12000, 15000, 12000, 12000],
                  name: 'Actual Spending'
                }
            ],
            header: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
        },
        BarChart: {
            data: [
                [79, 52, 200, 334, 390, 330, 220],
                [80, 52, 200, 334, 390, 330, 220],
                [30, 52, 200, 334, 390, 330, 220]
            ]
        }
    },
    state: {
        opened: false,
    },
    testData: [
        {
            name: "1.json"
        },
        {
            name: "2.json"
        },
        {
            name: "3.json"
        }
    ]
};
window.data = data;
module.exports = data;