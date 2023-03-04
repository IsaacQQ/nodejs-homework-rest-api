const {HttpError, ctrlWrapper} = require("../helpers");
const contact = require("../models/contact")




// const Joi = require("joi");
// const addSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().required(),
//     phone: Joi.string().required()
//   })



  const listContacts = async (req, res, next) => {
      const result = await contact.find();
      res.json(result);  
  }


  const getContactById = async (req, res, next) => {
        const {contactId} = req.params
        const result = await contact.findById(contactId)
        if (!result) {
          throw HttpError(404, "Not found")
        }
        res.json(result) 
    }
    

  const addContact = async (req, res, next) => {
       const result = await contact.create(req.body);
       res.status(201).json(result);
   }

   const removeContact = async (req, res, next) => {
      const {contactId} = req.params;
      const result = await contact.findByIdAndDelete(contactId)
      if (!result) {
        throw HttpError(404, "Not found")
      }
      res.json({
        message: "Object Deleted"
      })
  }


   const updateFavorite = async (req, res) =>{
      const {contactId} = req.params;
      const result = await contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
   }

  const updateContact = async (req, res, next) => {
      const { contactId } = req.params;
      const { name, email, phone } = req.body;
      if (!name && !email && !phone) {
        const error = new Error('missing fields');
        error.status = 400;
        throw error;
      }
      const result = await contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if (!result) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
      }
      res.status(200).json({
        status: 'success',
        code: 201,
        data: { result },
      });
  }

  module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite)
}