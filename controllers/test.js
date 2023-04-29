


const getArrayTest =async(req,res)=>{
    const arraTest= ["hola", "saludos", "quieto", "gracias"];
    return res.json(
        arraTest
    )
}

module.exports = {
    getArrayTest
}