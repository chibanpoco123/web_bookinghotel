const express =require('express');
const router = express.Router();
const News = require('../models/News')
// lấy tất cả tin tức 
router.get('/',async(req,res) =>{
    try{
        const newsList = await News.find().sort({
            createAt: -1
        })
        res.json(newsList)
    }catch(err){
        res.status(500).json({
            message:"lỗi khi lấy tin tức ",error: err.message
        });
        
    }
})
router.post('/',async(req,res) =>{
    try{
        const news = new News(req.body);
        const saveNews = await news.save()
        res.status(201).json(saveNews);
    }catch(err){
        res.status(400).json({
            message:'lỗi khi thêm tin tức ',error: err.message
        })
    }
})
// lấy chi tiết 1 tin 
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({
                message: 'Không tìm thấy tin tức'
            });
        }
        return res.status(200).json(news);
    } catch (err) {
        res.status(500).json({
            message: "Lỗi khi lấy chi tiết tin",
            error: err.message
        });
    }
});

// cập nhật tin 
router.put('/:id',async(req,res) =>{
    try{
        const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.json(updatedNews)
    }catch(err){
        res.status(400).json({
            message: 'lỗi khi xóa', error: err.message
        }
    )};
})
router.delete('/:id',async (req,res) =>{
    try{
        await News.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Xóa tin tức thành công '
        });

    }catch(err){
        res.status(400).json({
            message: 'lỗi khi xóa ',error: err.message
        })
    }
})
module.exports = router