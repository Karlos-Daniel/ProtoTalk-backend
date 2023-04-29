


const getArrayTest =async(req,res)=>{
    const arraTest= ["hola", "idle", "saludos", "quieto", "gracias"];
    return res.json(
        arraTest
    )
}

module.exports = {
    getArrayTest
}