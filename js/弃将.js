window.addEventListener('load', function(){
	// 建立每个格子的x,y轴的坐标,如第一行第二个是0-1
	var coordinate = ''; // 坐标
	var coordinate_arr = []; // 坐标集合
	var number_arr = document.querySelectorAll('.number'); // 获取九宫格里的所有格子的集合
	// 将坐标(coordinate)添加到坐标集合(coordinate_arr)里
	for (x = 0; x < 9; x++) {
		for (y = 0; y < 9; y++) {
			coordinate = x + '-' + y;
			coordinate_arr.push(coordinate);
		}
	}
	// 设置所有格子的id为坐标
	for (i = 0; i < 81; i++) {
		number_arr[i].setAttribute('id', coordinate_arr[i]);
	}
	// console.log(coordinate_arr);
	console.log(number_arr[0].querySelector('input').value);
})