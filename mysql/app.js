const Sequelize = require('sequelize');
const config = require('./config');

//创建一个sequelize对象实例，和数据库建立连接
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

//定义模型Pet，告诉Sequelize如何映射数据库表：
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true     //主键约束
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });


var now = Date.now();
(async () => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'haha',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('添加数据: ' + JSON.stringify(dog));
})();

// 查询成功后会返回包含多个实例（instance）的数组。
var queryFromSomewhere = async (animals) => {
    var pets = await Pet.findAll({
        where: {
            name: animals || 'pig'
        }
    });
    console.log(`找到数据 ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
    }
    return pets;

};

// 通过获取的示例进行数据更新
(async () => {
    try {
        var pets = await queryFromSomewhere("dog");
        for (let p of pets) {
            p.gender = true;
            p.updatedAt = Date.now();
            p.version++;
            await p.save();
        }
    } catch (err) {
        console.log(err);
    }
})();


// 通过获取的示例进行数据更新
(async () => {
    try {
        var pets = await queryFromSomewhere("rabbit");
        for (let p of pets) {
            await p.destroy();
        }
    } catch (err) {
        console.log(err);
    }
})();
