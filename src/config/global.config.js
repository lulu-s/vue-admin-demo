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
    tableData: [
        {
            date: '2016-05-02',
            name: '王小虎0',
            state: false
        }, 
        {
            date: '2016-05-04',
            name: '王小虎1',
            state: false
        }, 
        {
            date: '2016-05-01',
            name: '王小虎2',
            state: false
        }, 
        {
            date: '2016-05-03',
            name: '王小虎3',
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
            name: "账户管理",
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
                        name: "账户管理"
                    },
                },
                {
                    name: "个人管理",
                    id: "UserManage",
                    icon: def,
                    component: "UserManage",
                    meta: {
                        breadNum: 2,
                        name: "账户管理"
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
    state: {
        opened: false,
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
        }
    }
};
window.data = data;
module.exports = data;