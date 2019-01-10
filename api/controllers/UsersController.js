/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcryptjs')
module.exports = {
  signupCustomer : async function(req, res) {
      try {
        let salt = await bcrypt.genSalt(10)
        let password = await bcrypt.hash(req.body.pass,salt)
        let user = {email : req.body.email, password}
        let createdUser = await Users.create(user).fetch()
        res.status(200).send(createdUser)
          
      } catch (error) {
        res.status(400).send(error)
      }
      
      
  },
  loginCustomer : async function(req, res) {
      try {
        let user = await Users.findOne({email : req.body.email})
        let check = await bcrypt.compare(req.body.pass, user.password)
        if(check) {
            return res.status(200).send(user)
        }
        res.status(400).send({error : 'Incorrect credentials'})
          
      } catch (error) {
        res.status(400).send(error)
      }

  }
};

