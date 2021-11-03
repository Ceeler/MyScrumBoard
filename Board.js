let input = document.querySelector("#scrum__text");
let form = document.querySelector("#scrum__form");
let listb = document.querySelector(".container__board");
let boardList = [];
let globalIndex = 0;


let BoardViewer = () =>{
  let list;

    let Board = '';
    boardList.forEach((i, index)=>{

      switch(i.Status) {
      case 'In_progress':
        list = document.querySelector("#In_progress > #board__list");
        break;
      case 'Done':
        list =  document.querySelector("#Done > #board__list");
        break;
      default:
        list =  document.querySelector("#Backlog > #board__list");
    }

        if(i.index == 999){
          i.index = globalIndex;
          globalIndex += 1;
        }

        Board += `<li id='item_${i.index}'>
            <label for='id_${i.index}' onselec tstart="return false">${i.case}</label>
            <div id='buttons'>
            <button id='board__Backlog' onclick="MoveBoard_Backlog(${i.index})">Backlog</button>
            <button id='board__In_progress' onclick="MoveBoard_In(${i.index})">In Progress</button>
            <button id='board__Done' onclick="MoveBoard_Done(${i.index})">Done</button>
            <button id='board__Remove' onclick="removeBoard(${i.index})">X</button>
            </div>
        </li>`;

        list.innerHTML = Board;

    });

}

if (localStorage.getItem('case')){
    boardList = JSON.parse(localStorage.getItem('case'));
    boardList.forEach((i, index) => {
        i.index = globalIndex;
        globalIndex += 1;
    });


    BoardViewer();
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let error = false

    if(!input.value) return;
    boardList.forEach((item)=>{
        if(input.value == item.case) {
            error = true;
        }
    });
    if(error) {
        input.value = '';
        error = false;
        return
    };
    let NewEl = {
        case: input.value,
        Status: 'Backlog',
        index: 999
    };
    boardList.push(NewEl);
    BoardViewer();
    localStorage.setItem('case', JSON.stringify(boardList));

    input.value = '';
});

let removeBoard = (index) =>{
    let label = document.querySelector('[for=id_'+ index +']');
    let element = document.querySelector('#item_' + index);
    boardList.forEach((item, index)=>{
        if(item.case == label.innerHTML){
            element.remove();
            boardList.splice(index, 1);
            BoardViewer();
        }
    })
    localStorage.setItem('case', JSON.stringify(boardList));
}


let MoveBoard_In = (index) => {
    let element = document.querySelector('#item_' + index);

    boardList.forEach((item)=>{
        if (item.index === index){
            element.remove();
            item.Status = "In_progress";
            BoardViewer();
        }
    })

    localStorage.setItem('case', JSON.stringify(boardList));
    BoardViewer();
}

let MoveBoard_Backlog = (index) => {
    let element = document.querySelector('#item_' + index);
    alert(index);
    boardList.forEach((item)=>{
        if (item.index === index){
            element.remove();
            item.Status = "Backlog";
            BoardViewer();
        }
    })

    localStorage.setItem('case', JSON.stringify(boardList));
}


let MoveBoard_Done = (index) => {
    let element = document.querySelector('#item_' + index);

    boardList.forEach((item)=>{
        if (item.index === index){
            element.remove();
            item.Status = "Done";
            BoardViewer();
        }

    })

    localStorage.setItem('case', JSON.stringify(boardList));

}
