document.querySelector(".lost").addEventListener("click",()=> {
	location.reload();
})
document.querySelector(".control").onclick = function(){
    let name = prompt("What is your name");

    if(name===null||name===""){
        document.querySelector(".name span").innerHTML=('UnKnown')
		setInterval(update,1000)
		update()
    }else {
        document.querySelector(".name span").innerHTML=name
		setInterval(update,1000)
		update()
    }

		(document.getElementById('main')).loop=true;
		(document.getElementById('main')).play();
    document.querySelector(".control").remove();
}
let tries = document.querySelector(".tries span");
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

	let all = document.querySelectorAll('.game-block');
		let m = Array.from(all);
	let check = m.every((ele)=>ele.classList.contains("has-match"));



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

		document.getElementById('success').play()

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
	if((sec.innerHTML=== '0' && min.innerHTML==='0')|| tries.innerHTML==='20') {
		document.getElementById('main').pause();
		clearInterval(1)
		document.querySelector(".lost").style.display = 'block';
	}
	// clearInterval(1)
}