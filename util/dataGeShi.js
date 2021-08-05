var dataGeShi = function(data){
	if(data.length==0){
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
module.exports = dataGeShi