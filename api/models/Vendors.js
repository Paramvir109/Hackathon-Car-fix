/**
 * Vendors.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email : {
      type : 'string',
      required : true,
      isEmail : true, 
      unique : true     
      
    },
    password : {
      type : 'string',
      required : true,
      minLength : 6
    },
    
  },
  customToJSON : function() {//Overrided method
    return _.pick(this, ['email' , 'id'])//Only these props sent back
  }


};

