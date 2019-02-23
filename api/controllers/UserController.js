const BaseController = require('./BaseController')
const { User, Assignment, ParameterizedAssignment } = require('blockchain-course-db').models

module.exports = class UserController extends BaseController {
  constructor () {
    super(User, 'users', 'users')
  }

  async getStatistics (user) {
    const totalSolved = await ParameterizedAssignment.count(
      {
        where: { studentId: user.id, solved: true }
      })
    const totalAssignments = Assignment.findAll().length

    return { totalSolved, totalAssignments }
  }

  async list (req, res) {}

  async read (req, res, name) {
    const user = req.user
    const statistics = await this.getStatistics(user)

    res.json({ success: 200, user: { ...user.dataValues, statistics } })
  }
}