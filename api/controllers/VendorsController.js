/**
 * VendorsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcryptjs')

module.exports = {
    signupVendor : async function(req, res) {
        try {
            console.log(req)
          let salt = await bcrypt.genSalt(10)
          let password = await bcrypt.hash(req.body.pass,salt)
          let user = {email : req.body.email, password}
          console.log(user)
          let createdUser = await Vendors.create(user).fetch()
          res.status(200).send(createdUser)
            
        } catch (error) {
          res.status(400).send(error)
        }
        
        
    },
    loginVendor : async function(req, res) {
        try {
          let user = await Vendors.findOne({email : req.body.email})
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

