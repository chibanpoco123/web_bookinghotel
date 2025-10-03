const express = require('express');
const Facility = require('../models/Facility')
const router = express.Router()

// lấy tất cả tiện ích 
router.get('/',async(req,res) =>{
    try{
        const facilities = await Facility.find()
        res.json(facilities);
    }catch(err){
        res.status(500).json({message: err.message})
    }
} )
// tạo tiện ích mới 
router.post('/', async(req,res) =>{
    try{
    const {type,key,lable,icon} = req.body
    const newFacility = newFacility({ type, key, lable, icon})
    await newFacility.save()
    res.status(201).json(newFacility);
}catch(err){
    res.status(400).json({message:err.message})
}
});
// xoá tiện ích 
router.delete('/:id', async(req,res) =>{
    try{
        await Facility.findByIdAndDelete(req.params.id);
        res.json({message: 'đã xóa thành công '})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})
// cập nhật tiện ích 
router.put('/:id', async(req,res) =>{
     try {
    const updated = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})
module.exports = router;