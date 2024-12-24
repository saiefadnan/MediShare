
const login = (req,res)=>{
    try{
        //build your logic
        res.status(200).json({
            "msg":"Hello"
        })
    }catch(err){
        console.error(err)
        res.status(200).send('Error occured!!!')
    }
}

module.exports ={
    login
}