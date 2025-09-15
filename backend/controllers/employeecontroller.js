    const db=require('../models')
    const employemodel=db.employeedetails;

    const multer=require('multer')
    const fs=require('fs')
    const path=require('path')

    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            const {department}=req.body
            const wholejoin=path.join('image',department)
            if(!fs.existsSync(wholejoin))
            {
                fs.mkdirSync(wholejoin,{recursive:true})
            }
            cb(null,wholejoin)
        },
        filename:(req,file,cb)=>{
            cb(null, Date.now()+ '-' + file.originalname)
        }
    })

    const fileFilter=(req,file,cb)=>{
        const allowed=['.png','.jpeg','.jpg']
        const fileext=path.extname(file.originalname).toLowerCase()
        if(allowed.includes(fileext))
        {
            cb(null,true)
        }
        else{
            cb( new Error("file not supported"),false)
        }
    }

    const upload=multer({storage,fileFilter})

    const employeepost=async(req,res)=>{
        try{
        const {name,employeeid,department,designation,type,project,status}=req.body
        const imageco=path.join('image',department,req.file.filename)
        const create=await employemodel.create({
            name,employeeid,department,designation,type,project,status,image:imageco
        }) 
    
        res.status(200).json({
            message:"post successfully"
        })
        } catch (err) {
    console.error(" Error in employeepost:", err);
    
    }

    }

    const employeeget=async(req,res)=>{
        const ress=await employemodel.findAll()
        res.json(
            ress
        )
        console.log(ress)

    }

    const empedit=async(req,res)=>{
       try {
        const { name, employeeid, department, designation, type, status, project } = req.body;
        if (!employeeid) return res.status(400).json({ message: "Original Employee ID is required" });
        const updatedData = { name, employeeid, department, designation, type, status, project };
        if (req.file) {
            const imagePath = path.join('image', department, req.file.filename);
            updatedData.image = imagePath;
        }
    
        const [updatedRows] = await employemodel.update(updatedData, { where: { employeeid: employeeid } });
        console.log(updatedData)
        if (updatedRows === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee updated successfully" });
    } catch (err) {
        console.error("Error in employeeedit:", err);
        res.status(500).json({ message: err.message });
    }
    }

    const employeedelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await employemodel.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "conform you want to delete employee" });
  } catch (err) {
    console.error("Error in employeedelete:", err);
    res.status(500).json({ message: err.message });
  }
};

        


    module.exports={upload,employeepost,employeeget,empedit,employeedelete}