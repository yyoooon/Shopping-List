const shoppingList_list = document.querySelector(".shoppingList-list");
const shoppingList_form = document.querySelector(".shoppingList-form");
const list_input = document.querySelector(".list-input");
const add_list = document.querySelector(".add-list");
const allDel = document.querySelector(".all-del");

function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = list_input.value;
  if (text === "") {
    list_input.focus();
    return;
  }
  // 2. 새로운 아이템을 만듦 (텍스트 + 삭제 버튼)
  const item = createItem(text);
  // 3. list안에 새로 만든 아이템을 추가한다
  shoppingList_list.append(item);
  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: "center" });
  // 5. input을 초기화한다
  list_input.value = "";
  list_input.focus();
}

let id = 0;
function createItem(text) {
  // item 만들기
  const listItem = document.createElement("li");
  listItem.setAttribute("class", "shoppingList-list-item");
  listItem.setAttribute("data-id", id);
  listItem.innerHTML = `<span class="item_text" data-id = "${id}">${text}</span>
        <button class="del">
          <i class="fas fa-trash-alt icon" data-id = "${id}">
        </button>`;
  console.log(id);
  id++;
  return listItem;
}

// 전체 삭제 
function allDelete() {
    let delItems = document.querySelectorAll(".shoppingList-list-item");
    delItems.forEach(function (userItem) {
      userItem.remove();
    });
    allDel.disabled = true;
  }

shoppingList_form.addEventListener("submit", (e) => {
  onAdd();
  allDel.disabled = false;
});

shoppingList_list.addEventListener("click", (e) => {
  const dataId = e.target.dataset.id;
  if (dataId && e.target.matches(".fa-trash-alt")) {
    const toDelete = document.querySelector(
      `.shoppingList-list-item[data-id = "${dataId}"]`
    );
    toDelete.remove();
  } else if(dataId && (e.target.matches(".shoppingList-list-item")||e.target.matches(".item_text"))) {
      const toDrawLine = document.querySelector(
        `.item_text[data-id = "${dataId}"]`
      )
      toDrawLine.classList.add('finished');
  }
});

allDel.addEventListener("click", (e) => {
     allDelete();
});