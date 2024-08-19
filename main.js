document.querySelector(".tryw").addEventListener("click",()=> {
	location.reload();
})
document.querySelector(".tryl").addEventListener("click",()=> {
	location.reload();
})
let field = document.querySelector(".user")

let arrayOfPlayers =[];
let sort = [];

if(localStorage.getItem("players")){
	arrayOfPlayers.sort((a, b) => a.t - b.t)
    sort=JSON.parse(localStorage.getItem("players"));
	sort.sort((a, b) => a.t - b.t);
	arrayOfPlayers= sort;
}
getDataFromLocalStorage();


document.getElementById('go').onclick = function(){
	let nam = field.value;
    if(nam===null||nam===""){
        document.querySelector(".name span").innerHTML=('Unknown')
		setInterval(update,1000)
		update()
    }else {
        document.querySelector(".name span").innerHTML=nam
		setInterval(update,1000)
		update()
    }

		(document.getElementById('main')).loop=true;
		(document.getElementById('main')).play();
    	document.querySelector(".control").remove();
		// document.querySelector(".go").removeParent()
}


let tries = document.querySelector(".tries span");
	right = document.querySelector(".right span");
	let timer = document.querySelector(".timer")
	let min = document.querySelector(".minute")
	let sec = document.querySelector(".second")

let duration = 1500,
    blocksContainer = document.querySelector(".memory-game"),
    blocks = Array.from(blocksContainer.children),
    // orderRange = [...Array(blocks.length).keys()];
    orderRange = Array.from(Array(blocks.length).keys());

change(orderRange)
blocks.forEach((block , index)=>{


    block.style.order = orderRange[index];

		block.addEventListener("click",()=>{

			flip(block);

		})

})





function flip (selectedBlock) {

	selectedBlock.classList.add("is-flipped");

	let allFlipped = blocks.filter(flippedOne =>flippedOne.classList.contains("is-flipped"));


	if(allFlipped.length===2){

		stopClicking();

		checkMatched(allFlipped[0],allFlipped[1]);

	}

}

// change position
function change(array){
	let current = array.length,
		temp,
			random ;
		
			while(current>0){

				random=Math.floor(Math.random()*current);

				current--;
				temp= array[current];
				array[current]=array[random];
					array[random]=temp;
			}
			
		return array;
}

function stopClicking () {

	blocksContainer.classList.add("no-clicking");

	setTimeout(()=> {

		blocksContainer.classList.remove("no-clicking")

	},duration);

}
function checkMatched (fristOne ,secondOne){


if (fristOne.dataset.img===secondOne.dataset.img) {

    fristOne.classList.remove('is-flipped');
    secondOne.classList.remove('is-flipped');
    fristOne.classList.add('has-match');
    secondOne.classList.add('has-match');
		right.innerHTML=parseInt(right.innerHTML)+1;
		document.getElementById('success').play();
		}
	else {

		tries.innerHTML = parseInt(tries.innerHTML)+1;

		setTimeout(()=>{
			fristOne.classList.remove('is-flipped');
			secondOne.classList.remove('is-flipped');
		},duration);
	
		document.getElementById('fail').play();



	}

}
function update(){
	if(sec.innerHTML===`0`&& sec.innerHTML !== '1') {
		sec.innerHTML=`59`
		min.innerHTML=parseInt(min.innerHTML)-1;
	}
	sec.innerHTML =parseInt(sec.innerHTML)-1;
	if((sec.innerHTML=== '0' && min.innerHTML==='0')|| tries.innerHTML==='15') {
		document.getElementById('main').pause();
		clearInterval(1)
		document.querySelector(".lost").style.display = 'block';
		document.getElementById('end').play();
	}
	if(right.innerHTML==='10') {
		document.getElementById('main').pause();
		clearInterval(1)
		document.querySelector(".winner").style.display = 'block';
		document.getElementById('win').play();
		addTOArray(field.value);

	}
	// clearInterval(1)
}
function addTOArray(player) {
	const nameOFPlayer= {
		n: player ,
		t :tries.textContent,
	};

	arrayOfPlayers.push(nameOFPlayer)
	arrayOfPlayers.sort((a, b) => a.t - b.t);
	addTopage(arrayOfPlayers);
	console.log(arrayOfPlayers);
	addDataToLocalstorageFrom(arrayOfPlayers);
}
function addTopage(arrayOfPlayers){
	arrayOfPlayers.sort((a, b) => a.t - b.t);
	arrayOfPlayers.forEach((player)=>{
		let parent = document.createElement("div")
		parent.classList.add("parent")
		let us= document.createElement("span");
		us.appendChild(document.createTextNode(player.n));
		let ran = document.createElement("span");
		ran.appendChild(document.createTextNode(player.t));
		let container = document.querySelector(".rank")
		parent.appendChild(us);
		parent.appendChild(ran)
		container.appendChild(parent)
	})
}


function addDataToLocalstorageFrom(arrayOfPlayers){
    window.localStorage.setItem("players",JSON.stringify(arrayOfPlayers));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("players");
    if(data){
        let playName = JSON.parse(data);
        addTopage(playName);
    }
}

// let all = document.querySelectorAll('.game-block');
// let m = Array.from(all);
// console.log(m);
// let check = m.every((ele)=>ele.classList.contains("has-match"));
// console.log(check)

