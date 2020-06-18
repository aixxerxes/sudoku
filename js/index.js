window.addEventListener('load', function() {
	var btn0 = document.querySelectorAll('button')[0];
	var btn1 = document.querySelectorAll('button')[1];
	btn0.onclick = function() {
		var startTime = Date.now();
		var flag = 0;
		for (var i = 0; i < funInputArr().length; i++) {
			if (funInputArr()[i] == '') {
				flag++;
			}
		}
		while (1) {
			flag = act(flag);
			// console.log(flag);
			if (flag == 0) {
				console.log((Date.now() - startTime) / 1000 + 's');
				break;
			}
			// break; // 测试专用
		}
	}
	btn1.onclick = function() {
		for (var i = 0; i < 81; i++) {
			document.querySelectorAll('input')[i].value = '';
		}
	}
})