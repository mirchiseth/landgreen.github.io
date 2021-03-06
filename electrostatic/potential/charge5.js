const setup5 = function() {
	var canvas = document.getElementById('charge5');
	var ctx = canvas.getContext("2d");
	ctx.font = "300 30px Roboto";
	ctx.fillStyle = '#aaa';
	ctx.textAlign = "center";
	ctx.fillText('click to start simulation', canvas.width / 2, canvas.height / 2);
}
setup5()

function charges5(el) {
	el.onclick = null; //stops the function from running on button click
	Charge.setCanvas(el)
	// var canvas = el
	// var ctx = canvas.getContext("2d");

	//___________________get mouse input___________________
	var mouse = {
		down: false,
		x: 0,
		y: 0
	};
	canvas.onmousemove = function(e) {
		var rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
	}
	canvas.onmousedown = function() {
		mouse.down = true;
		Charge.repulse(q, mouse);
	};
	canvas.onmouseup = function() {
		mouse.down = false;
	};
	let pause = false
	el.addEventListener("mouseleave", function() {
		pause = true
		setTimeout(function(){ Charge.scalarField(q,1) }, 100);
	});
	el.addEventListener("mouseenter", function() {
		pause = false
		Charge.setCanvas(el)
		if (!pause) requestAnimationFrame(cycle);
	});

	const q = [] //holds the charges
	//spawn

	Charge.spawnCharges(q, 10, 'e')
	Charge.spawnCharges(q, 10, 'p')

	function cycle() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		Charge.physicsAll(q)
		// Charge.teleport(q)
		// Charge.vectorField(q)
		Charge.scalarField(q)
		// Charge.drawAll(q)
		// Charge.pushZone()
		Charge.bounds(q)
		if (!pause) requestAnimationFrame(cycle);
	}
	requestAnimationFrame(cycle);
}
