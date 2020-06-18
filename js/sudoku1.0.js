// 1. 获取九宫格里所有的值,并放在一个数组里；
function funInputArr() {
	var input_arr = [];
	for (i = 0; i < 81; i++) {
		// console.log(document.querySelectorAll('input')[i].value);
		input_arr.push(document.querySelectorAll('input')[i].value);
	}
	return input_arr;
}
// 2. 创建 空数组，里面放坐标，简称 坐标数组；
// 0-0, 0-1, 0-2, 0-3......
function funCoordinateArr() {
	// 坐标数组
	var coordinate_arr = [];
	for (var x = 0; x < 9; x++) {
		for (var y = 0; y < 9; y++) {
			coordinate_arr.push(x + '-' + y);
		}
	}
	return coordinate_arr;
}
// 3. 将 坐标数组 与 *input_arr* 的数组以键值对的形式存在；*coordinate*
function funCoordinate(input_arr, coordinate_arr) {
	var coordinate = []; // 键值对的数组
	for (var i = 0; i < 81; i++) {
		coordinate[coordinate_arr[i]] = input_arr[i];
	}
	console.log('coordinate', coordinate);
	return coordinate;
}
// 4. 一个数组里放每行数组（第0个放 *0开头*的数组，第1个放 *1开头*的数组，以此类推）；
function funCoordinateRow(coordinate_arr) {
	//行数组
	var coordinate_row = [];
	// 临时空数组
	var empty_arr = [];
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 81; j++) {
			if (coordinate_arr[j].search(i + '-') == 0) {
				empty_arr.push(coordinate_arr[j]);
			}
		}
		coordinate_row[i] = empty_arr;
		empty_arr = [];
	}
	console.log('coordinate_row', coordinate_row);
	return coordinate_row;
}
// 5. 一个数组里放每列数组（第0个放 *0结尾*的数组，第1个放 *1结尾*的数组，以此类推）；
function funCoordinateColumn(coordinate_arr) {
	//列数组
	var coordinate_column = [];
	// 临时空数组
	var empty_arr = [];
	for (var i = 0; i < 9; i++) {
		var reg = '/' + i + '$/';
		for (var j = 0; j < 81; j++) {
			if (coordinate_arr[j].search(eval(reg)) == 2) {
				empty_arr.push(coordinate_arr[j]);
			}
		}
		coordinate_column[i] = empty_arr;
		empty_arr = [];
	}
	console.log('coordinate_column', coordinate_column);
	return coordinate_column;
}
// 6. 一个数组里放每三宫格
function funCoordinatePlace() {
	var coordinate_place = [
		['0-0', '0-1', '0-2', '1-0', '1-1', '1-2', '2-0', '2-1', '2-2'],
		['0-3', '0-4', '0-5', '1-3', '1-4', '1-5', '2-3', '2-4', '2-5'],
		['0-6', '0-7', '0-8', '1-6', '1-7', '1-8', '2-6', '2-7', '2-8'],
		['3-0', '3-1', '3-2', '4-0', '4-1', '4-2', '5-0', '5-1', '5-2'],
		['3-3', '3-4', '3-5', '4-3', '4-4', '4-5', '5-3', '5-4', '5-5'],
		['3-6', '3-7', '3-8', '4-6', '4-7', '4-8', '5-6', '5-7', '5-8'],
		['6-0', '6-1', '6-2', '7-0', '7-1', '7-2', '8-0', '8-1', '8-2'],
		['6-3', '6-4', '6-5', '7-3', '7-4', '7-5', '8-3', '8-4', '8-5'],
		['6-6', '6-7', '6-8', '7-6', '7-7', '7-8', '8-6', '8-7', '8-8'],
	];
	console.log('coordinate_place', coordinate_place);
	return coordinate_place;
}
// 获取可能值数组的数组
function getPossibleValue(coordinate, arry, arry_pv) {
	// 第几 行 || 列 || 宫格
	for (var i = 0; i < 9; i++) {
		// 初始化*所有值集合*
		var all_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		// 第几个
		for (var j = 0; j < 9; j++) {
			// coordinate[coordinate_row[i][j]]
			// 九宫格某个值
			var coordinate_value = coordinate[arry[i][j]];
			if (coordinate_value) {
				// console.log(parseInt(coordinate_value));
				// 某个值在*all_arr*的位置
				var index = all_arr.indexOf(parseInt(coordinate_value));
				all_arr.splice(index, 1);
			}
		}
		arry_pv[i] = all_arr;
	}
	return arry_pv;
}

function act(flag) {
	// 1. 获取九宫格里所有的值,并放在一个数组里；
	var input_arr = funInputArr();
	// 2. 创建 空数组 ，里面放坐标；
	// 坐标数组
	var coordinate_arr = funCoordinateArr();
	// 3. 将 坐标数组 与 *input_arr* 的数组以键值对的形式存在；*coordinate*
	var coordinate = funCoordinate(input_arr, coordinate_arr);
	// 临时空数组
	var empty_arr = [];
	// 4. 一个数组里放每行数组（第0个放 *0开头*的数组，第1个放 *1开头*的数组，以此类推）；
	var coordinate_row = funCoordinateRow(coordinate_arr);
	// 5. 一个数组里放每列数组（第0个放 *0结尾*的数组，第1个放 *1结尾*的数组，以此类推）；
	var coordinate_column = funCoordinateColumn(coordinate_arr);
	// 6. 一个数组里放每三宫格
	var coordinate_place = funCoordinatePlace();
	// 7. 开始填数，寻找空值
	// 7.1 从坐标数组 *coordinate_arr* 中检索 *coordinate* 中的空值
	// 7.1.1若为空值，找到其所在的行 *location_row* 、列 *location_column* 、宫格 *location_place* 
	// 每*行*可能值的数组的数组
	var coordinate_row_pv = [];
	// 每*列*可能值的数组的数组
	var coordinate_column_pv = [];
	// 每*宫格*可能值的数组的数组
	var coordinate_place_pv = [];
	coordinate_row_pv = getPossibleValue(coordinate, coordinate_row, coordinate_row_pv);
	coordinate_column_pv = getPossibleValue(coordinate, coordinate_column, coordinate_column_pv);
	coordinate_place_pv = getPossibleValue(coordinate, coordinate_place, coordinate_place_pv);
	console.log('coordinate_row_pv:', coordinate_row_pv);
	console.log('coordinate_column_pv:', coordinate_column_pv);
	console.log('coordinate_place_pv:', coordinate_place_pv);
	// console.log(coordinate_arr[0]);
	// 从坐标数组 *coordinate_arr* 中检索 *coordinate* 中的空值
	for (var i = 0; i < 81; i++) {
		// 若为空值，计算此空值所在行、列、宫格，三者的交集
		if (!coordinate[coordinate_arr[i]]) {
			// console.log(coordinate_arr[i]);
			var num = 0;
			for (var j = 0; j < 9; j++) {
				// console.log(coordinate_row[j].includes(coordinate_arr[i]));
				if (num == 3) {
					continue;
				}
				// 所在行
				if (coordinate_row[j].includes(coordinate_arr[i])) {
					var location_row = j;
					// console.log(j);
					num++;
				}
				// 所在列
				if (coordinate_column[j].includes(coordinate_arr[i])) {
					var location_column = j;
					// console.log(j);
					num++;
				}
				// 所在宫格
				if (coordinate_place[j].includes(coordinate_arr[i])) {
					var location_place = j;
					// console.log(j);
					num++;
				}
				if (num >= 3) {
					var more_pv = coordinate_row_pv[location_row].filter((val) => coordinate_column_pv[location_column].indexOf(
							val) >
						-1);
					more_pv = more_pv.filter((val) => coordinate_place_pv[location_place].indexOf(val) > -1);
					if (more_pv.length == 1) {
						document.querySelectorAll('input')[i].value = more_pv;
						flag--;
						// console.log(coordinate_arr[i]);
						// console.log(more_pv);
					}
					// console.log(coordinate_arr[i]);
					// console.log(more_pv);
				}
			}
			num = 0;
		}
		// break;
	}
	return flag;
}