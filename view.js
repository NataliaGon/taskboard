/////////////////////////////////////////////////////GLOBAL VAR///////////////////////////////////////////////////////////////////////////////////////





var boardTab = document.querySelector('.board-tab');
var membersTab = document.querySelector('.members-tab');
var boardView = document.querySelector('#board-view');
var membersView = document.querySelector('#members-view');

var tabs = document.querySelectorAll('.nav a');
var views = document.querySelectorAll('.view');


var newMemberName = document.querySelector('.new-member-input');
var modalElement = document.querySelector('.modal-edit');
var listSelectElement = document.querySelector('.lists-select');

///////////////////////////////////////////////MENU///////////////////////////////////////////////////////////////////




// Event lisener on menu buttons

boardTab.addEventListener('click', function () {

  insertParam('view', 'board');

});

membersTab.addEventListener('click', function () {

  insertParam('view', 'members');


});

//Open view(content) what we need
function initApp() {

  loadBoard();
  loadMembers();

  var activeView = getParameterByName('view');

  if (activeView == null) {
    setActiveView('board');

  } else {
    setActiveView(activeView);
  }
}

function setActiveView(selectedView) {

    for (i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      tab.classList.remove('active');
    }

    for (i = 0; i < views.length; i++) {
      var view = views[i];
      view.style.display = 'none';
    }

    var selectedTabElement = document.querySelector('.' + selectedView + '-tab');
    selectedTabElement.classList.add('active');

    var selectedViewElement = document.querySelector('#' + selectedView + '-view');
    selectedViewElement.style.display = 'block';


    // Fill view from  data
    switch (selectedView) {
      case 'board':
        createBoard(lists);
        break;
      case 'members':
        createMembers(members);
        break;
    }

  }


////////////////////////////////////////////////BOARD//////////////////////////////////////////////////////////////////

//Create a board
function createBoard(lists) {

  var listsHtml = '';

  for (list of lists) {

    listsHtml += '<div class="list" data-id="' + list.id + '">\
            <div class ="head-list">\
                <span class="list-name" data-id="' + list.id + '">' + list.name + '</span>\
                <input type="text" class ="list-name-input" value="New list" maxlength="25"  data-id="' + list.id + '"></input>\
                <button class="delete-list" data-id="' + list.id + '">\
                 <span class="icon-bin"></span> \
                </button>\
            </div>\
            <div class="body-list ">';


    for (card of list.cards) {
      listsHtml += '<div class= "body-list-card">\
                                   <p>' + card.content + '</p>\
                                   <button class="btn btn-info btn-sm edit-card-button" data-card-id="' + card.id + '" data-list-id="' + list.id + '" >Edit</button>\
                                   <ul class="card-members">';


      for (memberId of card.members) {
        var memberName = getMemberNameById(memberId);
        var memberInitials = getInitials(memberName);
        listsHtml += '<li><span class="label label-primary" title="' + memberName + '">' + memberInitials + '</span></li>';
      }



      listsHtml += '</ul>\
                         </div>';
    }

    listsHtml += '</div>\
              <button class="btn-add-card" data-id="' + list.id + '" >\
                 Add Card...\
            </button>\
       </div>';

  }

  listsHtml += '<button class="btn-add-list">Add a list...</button>';

  boardView.innerHTML = listsHtml;



  // React on click buttonAddList
  var buttonAddList = document.querySelector('.btn-add-list');
  buttonAddList.addEventListener('click', function () {
    addNewList();
    createBoard(lists);
  });


  //React on all delete list buttons
  var deleteListButtons = document.querySelectorAll('.delete-list');

  for (var i = 0; i < deleteListButtons.length; i++) {
    var deleteBtn = deleteListButtons[i];
    deleteBtn.addEventListener('click', function () {
      if (confirm('Delete this list?') === true) {

        deleteList(this.dataset.id);
        createBoard(lists);
      }
    });
  }


  //React on all add card buttons
  var addCardButtons = document.querySelectorAll('.btn-add-card');
  for (var i = 0; i < addCardButtons.length; i++) {
    var addCardBtn = addCardButtons[i];
    addCardBtn.addEventListener('click', function () {
      addNewCard(this.dataset.id);
      createBoard(lists);
      console.log(addCardButtons);
    });
  }

  var editCardButtons = document.querySelectorAll('.edit-card-button');
  for (var i = 0; i < editCardButtons.length; i++) {
    var editCardButton = editCardButtons[i];
    editCardButton.addEventListener('click', function () {
      console.log(this.dataset.list);
      showEditModal(this.dataset.cardId, this.dataset.listId);

    });
  }

  //React on all span title list
  var listsNameInput = document.querySelectorAll('.list-name-input');
  var listsNameShow = document.querySelectorAll('.list-name');

  for (var i = 0; i < listsNameShow.length; i++) {
    var listNameShow = listsNameShow[i];
    listNameShow.addEventListener('click', function () {
      openInputTitleList(this.dataset.id);

    });
  }

  //React on all input title list 

  for (var i = 0; i < listsNameInput.length; i++) {
    var listNameInput = listsNameInput[i];
    listNameInput.addEventListener("blur", function () {
      closeInputTitleList(this.dataset.id);

    });
  }

  function closeInputTitleList(id) {

    var listNameInput = document.querySelector('input[data-id="' + id + '"]');

    var list = getList(id);
    list.name = listNameInput.value;
    saveBoard();
    createBoard(lists);
  }

}

 function openInputTitleList(id) {

    var listName = document.querySelector('span[data-id="' + id + '"]');
    listName.style.display = "none";


    var listNameInput = document.querySelector('input[data-id="' + id + '"]');
    listNameInput.style.display = "block";
    listNameInput.value = listName.textContent;
    listNameInput.focus();

  }

////////////////////////////////////////////////////MEMBERS///////////////////////////////////////////////////////////

var listGroup = document.querySelector('.list-group');


function createMembers(members) {
  var memberHTML = '';
  for (member of members) {
    memberHTML += '<li class="list-group-item member-in-list" data-id="' + member.id + '">\
                     <span class="memebr-name" id = "span-mem" data-id="' + member.id + '">' + member.name + '\
                     </span>\
                     <input type="text" class ="new-member-name displayState" value="New member" maxlength="25" data-id="' + member.id + '"></input>\
                     <div class="member-btns data-id="' + member.id + '">\
                         <button type="button" class="btn btn-danger edit-member-btn seen delete" id="delete-btn" data-id="' + member.id + '">Delete</button>\
                         <button type="button" class="btn btn-primary edit-member-btn edit-btn seen"  data-id="' + member.id + '">Edit</button>\
                         <button type="button" class="btn btn-default member-save-changes-btn cancel-btn" id="cancel" data-id="' + member.id + '">Cancel</button>\
                         <button type="button" class="btn btn-success member-save-changes-btn save-btn" id="save" data-id="' + member.id + '">Save</button>\
                     </div>\
              </li>';
  }
  listGroup.innerHTML = memberHTML;



  //React on  delete member button

  var deleteMemberButtons = document.querySelectorAll('.delete');

  for (var i = 0; i < deleteMemberButtons.length; i++) {
    var deleteMemberBtn = deleteMemberButtons[i];
    deleteMemberBtn.addEventListener('click', function () {
      if (confirm('Delete this member?') === true) {
        deleteMember(this.dataset.id);
        createMembers(members);
      }
    });
  }


  // React on button edit member
  var editMemberButtons = document.querySelectorAll('.edit-btn');

  for (var i = 0; i < editMemberButtons.length; i++) {
    var editMemberBtn = editMemberButtons[i];
    editMemberBtn.addEventListener('click', function () {
      openEdit(this.dataset.id);
      changeInputAndSpanPosition(this.dataset.id);

    });
  }

  var memberSecondLevelButtons = document.querySelectorAll('.member-save-changes-btn');
  var memberFirstLevelButtons = document.querySelectorAll('.edit-member-btn');

  // Hide buttons edit and delete. Show buttons cansel and save

  function openEdit(id) {

    for (i = 0; i < memberSecondLevelButtons.length; i++) {
      var memberSecondLevelButton = memberSecondLevelButtons[i];
      if (memberSecondLevelButton.dataset.id === id) {
        memberSecondLevelButton.style.display = "flex";

      }
    }
    for (i = 0; i < memberFirstLevelButtons.length; i++) {
      var memberFirstLevelButton = memberFirstLevelButtons[i];
      if (memberFirstLevelButton.dataset.id === id) {
        memberFirstLevelButton.style.display = "none";

      }
    }
  }

  // Change member
  var inputMembers = document.querySelectorAll('.displayState');
  var nameHolders = document.querySelectorAll('.memebr-name');
  var memberBtns = document.querySelectorAll('.member-btns');

  // Change input and spane place

  function changeInputAndSpanPosition(id) {

    for (i = 0; i < nameHolders.length; i++) {
      var nameHolder = nameHolders[i];
      if (nameHolder.dataset.id === id) {
        nameHolder.style.display = "none";
        var a = nameHolder.textContent;
        console.log(a);
      }
    }
    for (i = 0; i < inputMembers.length; i++) {
      var inputMember = inputMembers[i];
      if (inputMember.dataset.id === id) {
        inputMember.style.display = "flex";
        inputMember.value = a;

      }
    }


  }

  //React on save button 
  var saveMemberButtons = document.querySelectorAll('.save-btn');
  for (var i = 0; i < saveMemberButtons.length; i++) {

    var saveMemberButton = saveMemberButtons[i];
    saveMemberButton.addEventListener('click', function () {

      saveMemberNameWasChanged(this.dataset.id);
      closeEdit(this.dataset.id);
      backInputAndSpanPosition(this.dataset.id);


    });
  }

  function saveMemberNameWasChanged(id) {
    for (i = 0; i < inputMembers.length; i++) {
      var inputMember = inputMembers[i];
      if (inputMember.dataset.id === id && inputMember.value != '') {
        var MemberNameWasChanged = inputMember.value;
      } else {
        for (member of members) {
          if (member.id === id) {
            MemberNameWasChanged = member.name;
          }
        }

      }
    }
    for (i in members) {
      var member = members[i];
      if (member.id === id) {
        member.name = MemberNameWasChanged;
        members.splice(i, 1, member);
        saveMembers();
        createMembers(members);
        break;

      }

    }

  }
 
 

  // React on cansel button

  var canselMemberButtons = document.querySelectorAll('.cancel-btn');

  for (var i = 0; i < canselMemberButtons.length; i++) {

    var canselMemberButton = canselMemberButtons[i];
    canselMemberButton.addEventListener('click', function () {

      closeEdit(this.dataset.id);
      backInputAndSpanPosition(this.dataset.id);

    });
  }

  function closeEdit(id) {

    for (i = 0; i < memberSecondLevelButtons.length; i++) {

      var memberSecondLevelButton = memberSecondLevelButtons[i];
      if (memberSecondLevelButton.dataset.id === id) {
        memberSecondLevelButton.style.display = "none";

      }
    }
    for (i = 0; i < memberFirstLevelButtons.length; i++) {

      var memberFirstLevelButton = memberFirstLevelButtons[i];
      if (memberFirstLevelButton.dataset.id === id) {
        memberFirstLevelButton.style.display = "flex";

      }
    }

  }

  function backInputAndSpanPosition(id) {
    for (i = 0; i < inputMembers.length; i++) {
      var inputMember = inputMembers[i];
      if (inputMember.dataset.id === id) {
        inputMember.style.display = "none";
      }
    }
    for (i = 0; i < nameHolders.length; i++) {
      var nameHolder = nameHolders[i];
      if (nameHolder.dataset.id === id) {
        nameHolder.style.display = "flex";


      }
    }

  }

}



//React on button add member
var buttonAddMember = document.querySelector('.btn-add-member');

buttonAddMember.addEventListener('click', function () {
  addNewMember();
  createMembers(members);

});


//////////////////////////////////////////MODAL WINDOW/////////////////////////////////////////////////////////////

 function getChekedMembersFromModal() {
    var membersModal = document.querySelectorAll('.members-modal');
    var cardId = modalElement.dataset.cardId;
    var checkedMembers = [];

    for (memModal of membersModal) {
      if (memModal.checked) {
        var memberId = memModal.dataset.id;
        checkedMembers.push(memberId);
      }
    }
    return checkedMembers;
  }

function deleteEditModal() {
    if (confirm('Delete this card?') === true) {
      var cardId = modalElement.dataset.cardId;

      deleteCard(cardId);
      createBoard(lists);
      closeEditModal();
    }
  }

  function saveModalChanges() {
    var cardId = modalElement.dataset.cardId;
    var fromListId = modalElement.dataset.listId;
    var toListId = listSelectElement.options[listSelectElement.selectedIndex].dataset.id;

    var cardData = {
      content: document.querySelector('#card-text').value,
      members: getChekedMembersFromModal()
    }

    updateCard(cardId, cardData);

    moveCard(fromListId, toListId, cardId);

    createBoard(lists);
    closeEditModal();

  }


  function showEditModal(cardId, listId) {

    //open modal window
    modalElement.style.display = "block";

    var card = getCard(cardId);

    document.querySelector('#card-text').value = card.content;

    //Set id of card to the save button

    modalElement.dataset.cardId = cardId;
    modalElement.dataset.listId = listId;

    listSelectElement.innerHTML = '';
    selectedList = '';
    for (list of lists) {
      if (list.id === listId) {
        selectedList = 'selected';
      } else {
        selectedList = '';
      }
      listSelectElement.innerHTML += '<option class = "modal-title-list" ' + selectedList + '  data-id ="' + list.id + '">' + list.name + '</option>';
    }

    document.querySelector('.member-list').innerHTML = getMembersListForModal(card.members);

  }



  function getMembersListForModal(cardMembers) {
    var listOfMembers = '';

    var checked = '';

    for (member of members) {
      if (cardMembers.indexOf(member.id) != -1) {
        checked = 'checked';
      } else {
        checked = '';
      }

      listOfMembers += '<label for="member-name-' + member.id + '">\
    <input class="members-modal" '+ checked + ' type="checkbox" value="' + member.name + ' " id="member-name-' + member.id
        + '" data-id = "' + member.id + '">' + member.name + '</label><br>';
    }
    return listOfMembers;
  }

  function closeEditModal() {
    modalElement.style.display = "none";
  }





document.querySelector('.modal-edit .close').addEventListener('click', closeEditModal);
document.querySelector('.modal-edit .close-btn').addEventListener('click', closeEditModal);
document.querySelector('.modal-save').addEventListener('click', saveModalChanges);
document.querySelector('.modal-delete-btn ').addEventListener('click', deleteEditModal);



initApp();