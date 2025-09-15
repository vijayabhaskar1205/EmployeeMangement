const express=require('express')
const router=express.Router()

const empcontroll=require('../controllers/employeecontroller')

router.post('/employeepost',empcontroll.upload.single('image'),empcontroll.employeepost)
router.get('/getall',empcontroll.employeeget)
router.put('/employeeedit',empcontroll.upload.single('image'), empcontroll.empedit)
router.delete('/delete/:id', empcontroll.employeedelete);

module.exports=router