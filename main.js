
var members = [];
var lists = [];
//////////////////////////////////////////////////////////////////////MENU//////////////////////////////////////////////////////////////////////////////



// Work menu. Create content


//Functions for Local Storage

function saveMembers() {
  localStorage.setItem('members', JSON.stringify(members));
}

function saveBoard() {
  localStorage.setItem('board', JSON.stringify(lists));
}

function loadMembers() {
  if (localStorage.getItem('members')) {
    members = JSON.parse(localStorage.getItem('members'));
  }
}

function loadBoard() {
  if (localStorage.getItem('board')) {
    lists = JSON.parse(localStorage.getItem('board'));
  }
}




///////////////////////////////BOARD///////////////////////////////////////////////////////





function moveCard(fromListId, toListId, cardId) {
  if (fromListId === toListId) {
    return;
  }
  var fromList = getList(fromListId);
  var toList = getList(toListId);
  var card = getCard(cardId);

  toList.cards.push(card);
  var cardIndex = getCardIndexInList(cardId, fromList);
  fromList.cards.splice(cardIndex, 1);

  saveBoard();
}

function getCardIndexInList(cardId, list) {

  for (i in list.cards) {
    var card = list.cards[i];
    if (card.id === cardId) {
      return i;
    }
  }

}


function addNewCard(listId) {

  for (list of lists) {

    if (list.id === listId) {

      var card = {
        content: "New Card",
        id: makeid(),
        members: []
      }
     
      list.cards.push(card);
      saveBoard();
      break;
    }
  }
}


function updateCard(cardId, cardData) {

  var card = getCard(cardId);

  card.content = cardData.content;
  card.members = cardData.members;
  saveBoard();
}

function getList(id) {
  for (list of lists) {
    if (list.id === id) {
      return list;
    }
  }
}

function getCard(id) {
  for (list of lists) {
    for (card of list.cards) {
      if (card.id === id) {
        return card;
      }
    }

  }
}


function getMemberNameById(memberId) {
  for (member of members) {
    if (member.id === memberId) {
      return member.name;
    }
  }
}

function getInitials(memberName) {
  var nameParts = memberName.split(" ");
  var initials = '';
  for (part of nameParts) {
    if (part.length > 0) {
      initials += part[0];
    }
  }

  return initials;
}


function addNewList() {
  var newList = {
    id: makeid(),
    name: 'New list',
    cards: []
  }

  lists.push(newList);
  saveBoard();
}


function deleteList(id) {
  for (i in lists) {
    var list = lists[i];
    if (list.id === id) {
      lists.splice(i, 1);
      saveBoard();
      break;

    }
  }
}

function deleteCard(id) {
  for (list of lists) {
    for (cardIndex in list.cards) {
      if (list.cards[cardIndex].id === id) {
        list.cards.splice(cardIndex, 1);
        saveBoard();
        break;
      }
    }
  }
}






////////////////////////////////////////////////////MEMBERS////////////////////////////////////////////



function addNewMember(name) {
  
    var member = {
      id: makeid(),
      name: name
    }
    members.push(member);

    saveMembers();

    
  
}


function deleteMember(id) {

  for (i in members) {
    var member = members[i];
    if (member.id === id) {
      members.splice(i, 1);
      removeMemberIdFromCards(id)
      saveMembers();
      break;

    }
  }
}

function removeMemberIdFromCards(memberId) {

  for (list of lists) {
    for (card of list.cards) {

      var index = card.members.indexOf(memberId);
      if (index != -1) {
        card.members.splice(index, 1);
        saveBoard();

      }
    }
  }
}


