var dataGeShiUpdate = function(data){
	if(data.acknowledged!==true){
		let data1 = {
			data:data,
			meta: {
				msg: "Not Found",
				status: 404
			}
		}
		return data1
	}else{
		let data1 = {
			data:data,
			meta: {
				msg: "okk",
				status: 200
			}
		}
		return data1
	}
}
module.exports = dataGeShiUpdate