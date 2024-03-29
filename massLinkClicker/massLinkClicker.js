javascript:(function(){
    if (document.querySelector("div.show-more a") !== null) {
        alert('The page is not displaying every chapter available.' +
            '\nClick on "Show more" until there are no more results to load before continuing');
        return;
    }
	/*Initializing control variables*/
	let rawTitle = document.title.match(/(.*) HorribleSubs/)[1],
		title = rawTitle.substr(0,rawTitle.length-2),
		qList = document.querySelector("div.hs-shows div.rls-info-container").querySelectorAll("div.rls-links-container > div"),
		tList = qList[0].querySelectorAll("span.dl-type"),
		qualities = [],
		types = {},
		typesDescription = ""
		;

	qList.forEach(function(node, i){
		qualities.push(node.id.match(/\d+p/)[0]);

	});

	tList.forEach(function(node,i){
		if (!node.classList.contains('linkless')) {
			let classes = node.className.match(/hs-(.+?)-link/);
			types[classes[1]] = classes[0];
			typesDescription = typesDescription + "\nType '"+classes[1]+"' for "+node.querySelector('a').innerHTML;
		}
	});

	/*Prompting the user and validating the input*/
	/*quality input*/
	let inputtedQuality = prompt("Welcome to a mass link getter for "+title+"!\nWhich quality of video do you want? (choose from "+qualities.join(",")+")"),
		quality = false
		;
	/*silent escape*/
	if (inputtedQuality === null) {
		return;
	}
	qualities.forEach(function(q){
		if (inputtedQuality === q) {
			quality = inputtedQuality;
		}
	});

	if (quality === false) {
		alert("Please input a quality exactly as listed when asked!");
		return;
	}
	/*type input*/
	let inputtedType = prompt("Now please select the type of download you want to make.\n"+typesDescription),
		type = false
		;
	/*silent escape*/
    if (inputtedType === null) {
        return;
    }
	for (let k in types) {
		if (k === inputtedType) {
			type = types[k];
		}
	}

	if (type === false) {
		alert("Please input a download type exactly as listed when asked!");
		return;
	}

	/*Selects each chapter's div, then pick the desired links and click them*/
	let divs = document.querySelectorAll("div.hs-shows div.rls-info-container"),
        clicks = 0,
        stagger = false,
        cap = 12;

	if (divs.length > cap) {
	    stagger = !confirm("This show has a lot of episodes! Do you want to download them all at once?\n(OK for 'Yes', CANCEL for 'No')");
    }

	for (let chapter of divs.values()) {
		let container = document.getElementById(chapter.id + "-" + quality),
			node = container.querySelector("span." + type + " a");
		node.click();
		/*Escape control, if needed*/
        if (stagger && ++clicks % cap === 0) {
            if (confirm(cap+" episodes downloaded. Continue?")){
            } else {
                return;
            }
        }
	}
})();