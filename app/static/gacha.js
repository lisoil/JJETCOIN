/**
 * Setup
 */
const debugEl = document.getElementById('debug'),
			// Array of icons mapped to the image
			iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"],
			// Width of one icon
			icon_width = 79,	
			// Height of one icon
			icon_height = 79,	
			// Num of icons in the strip
			num_icons = 9,	
			// Controls animation speed
			time_per_icon = 100,
			// Stores final index
			indexes = [0, 0, 0];


/** 
 * Roll one reel
 */
const roll = (reel, offset = 0, target = null) => {	
	let delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons); 
	// Delta is the amount by which the background position of reel will change. The math equation is to calculate
	
	
	const style = getComputedStyle(reel),
					// Current background position
					backgroundPositionY = parseFloat(style["background-position-y"]);
	
	if (target) {
		// calculate delta to target -> when rigging it
		const currentIndex = backgroundPositionY / icon_height;
		delta = target - currentIndex + (offset + 2) * num_icons;
	}
	
	// Return promise so we can wait for all reels to finish
	return new Promise((resolve, reject) => {
		const
			targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
			normTargetBackgroundPositionY = targetBackgroundPositionY%(num_icons * icon_height);
		
		// Staggered start and finish animation
		setTimeout(() => { 
			reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
			reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
		}, offset * 150);
			
		// After the animation finishes -> resets the stuff
		setTimeout(() => {
			reel.style.transition = `none`;
			reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
			resolve(delta%num_icons);
		}, (8 + 1 * delta) * time_per_icon + offset * 150);
		
	});
};



function rollAll() {
	const reelsList = document.querySelectorAll('.slots > .reel');
	
	// Determines the outcome first then generate the visual representation
	const outcome = generateOutcome();
	const targets = outcome.indexes;
	
	debugEl.textContent = '-160 coins rolling...';
	
	return Promise
		.all( [...reelsList].map((reel, i) => roll(reel, i, targets ? targets[i] : null)) )	
		.then((deltas) => {
			deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta)%num_icons);
			debugEl.textContent = `${outcome.rarity}`;
		
			if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
				const winCls = indexes[0] == indexes[2] ? "win2" : "win1";
				document.querySelector(".slots").classList.add(winCls);
				setTimeout(() => document.querySelector(".slots").classList.remove(winCls), 2000)
			}
		});
};

// Checks if button is clicked
document.getElementById("spinButton").addEventListener("click", () => {
	if (document.querySelector(".slots").classList.contains("spinning")) return;	

	document.querySelector(".slots").classList.add("spinning");

	rollAll().then(() => {
		document.querySelector(".slots").classList.remove("spinning");
	});
});

function generateOutcome(){
	const r = Math.random() * 100;
	// Mythic rarity
	if (r < 0.5) {
		return {indexes: [6, 6, 6], rarity:"MYTHIC!"};
	}
	// Very rare rarity
	else if (r < 10) {
		let index;
		// Calculates random index to be displayed besides bar which is reserved for mythic
		do{
			index = Math.floor(Math.random() * num_icons);
		} while (index == 6);
		return {indexes: [index, index, index], rarity: "Very Rare!"};
	}

	// Rare rarity
	else if (r < 40){
		const first = Math.floor(Math.random() * num_icons);
		let second = first;
		// Rare rarity is where two of the first are the same and the third is different, so a mini tiny jackpot -> third is just a random other
		let third;
		// Third has to be different from the first two
		do{
			third = Math.floor(Math.random() * num_icons);
		} while (third === first);

		// Mimics randomness where it is presented differently 
		const pattern = Math.floor(Math.random() * 3);
        let indexes;
		if (pattern === 0) {
            indexes = [first, first, third]; // first-first-third
        } 
        else if (pattern === 1) {
            indexes = [first, third, first]; // first-third-first
        } 
        else {
            indexes = [third, first, first]; // third-first-first
        }
		return {indexes: indexes,rarity: "Rare"};
	}
	// Common rarity -> everything is different
	else {
		let a = Math.floor(Math.random() * num_icons);
		let b, c;
		do { b = Math.floor(Math.random() * num_icons); } while (b === a);
		do { c = Math.floor(Math.random() * num_icons); } while (c === a || c === b);
		return {indexes: [a, b, c], rarity: "Common"};
	}
}
