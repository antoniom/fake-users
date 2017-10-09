const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql://root:ant0n10m@localhost:3306/fake_users')

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING(15),
    primaryKey: true,
    allowNull: false,
    validate: {
      len: [5, 15],
      isUnique: function (value, next) {
        User.find({
          where: {username: value},
          attributes: ['username']
        })
        .done(function (error, user) {
          if (error) { return next(error) }
          if (user) { return next('Username is already in use!') }
          next()
        })
      }
    }
  },
  password: {
    type: Sequelize.STRING(64),
    allowNull: false,
    validate: {
      len: [5, 64]
    }
  },
  displayName: {
    type: Sequelize.STRING(32),
    allowNull: false,
    validate: {
      len: [5, 32]
    }
  },
  birthDate: {
    type: Sequelize.DATEONLY,
    validate: {
      isDate: true
    }
  },
  country: {
    type: Sequelize.STRING(2),
    allowNull: false,
    validate: {
      isIn: [['GR', 'UK', 'US']]
    }
  }
}, {
  tableName: 'user',
  timestamps: false
})

module.exports = User
