window.addEventListener("load", myMain, false)

function myMain (evt) {
    var jsInitChecktimer = setInterval (checkForJS_Finish, 500);

    function checkForJS_Finish () {
        if (document.querySelector(".message-list")) {
            clearInterval(jsInitChecktimer);

            if (!document.querySelector("ul#room_list")) {
                // front end
                var span = document.createElement("span")
                var refDiv = document.querySelector('div.BroadcastRoot > div:nth-of-type(3) > div > div:nth-of-type(2) > div')
                refDiv.setAttribute('style', 'position: relative;')
                refDiv.appendChild(span)
                
                // back end
                var numOfChatTabs = 0 // to begin
                var newChatSessionElems = []
                var newMsgObsArr = []

                function makeChatTabObs(indexOfChatTab) {
                    newMsgObsArr[newMsgObsArr.length] = new MutationObserver(function() {
                        if (newChatSessionElems[indexOfChatTab].parentElement.getAttribute('style').includes("display: none")) {
                            var chatUser = newChatSessionElems[indexOfChatTab].querySelector('div.msg-text:last-of-type div.purecolor').innerText
                            var chatText = newChatSessionElems[indexOfChatTab].querySelector('div.msg-text:last-of-type span.msg-text span').innerText
                            var textSize = newChatSessionElems[indexOfChatTab].getAttribute('style').slice(newChatSessionElems[indexOfChatTab].getAttribute('style').indexOf('font-size') + 11)
                            if (newChatSessionElems[indexOfChatTab].querySelector('div.msg-text:last-of-type div.purecolor').classList.contains('broadcaster') === false) {
                                if (indexOfChatTab == 0) {
                                    span.setAttribute('style', 'position: absolute; right: 0; color: black; background-color: yellow; float: right; font-size: ' + textSize)
                                } else {
                                    span.setAttribute('style', 'position: absolute; right: 0; color: white; background-color: orange; float: right; font-size: ' + textSize)
                                }
                                span.innerText = chatUser + ": " + chatText
                            }
                        }
                    })
                }

                var ChatSessionObserver = new MutationObserver(function() {
                    var ChatTabElems = document.querySelectorAll('div#ChatTabContents')

                    if (numOfChatTabs != ChatTabElems.length) {
                        for (element of ChatTabElems) {
                            if (element != newChatSessionElems[Array.prototype.indexOf.call(ChatTabElems, element)]) {
                                newChatSessionElems.push(element)
                            }
                        }
                        makeChatTabObs(newChatSessionElems.length - 1)
                        newMsgObsArr[newMsgObsArr.length - 1].observe(newChatSessionElems[newChatSessionElems.length - 1], {attributes: true, subtree: true, childList: true})

                        numOfChatTabs = newChatSessionElems.length
                    }
                })
            
                var commboxElem = document.querySelector('div.BroadcastContent div.BaseTabsContainer > div:last-of-type')
                ChatSessionObserver.observe(commboxElem, {attributes: true, subtree: true, childList: true})
            }
        }
    }
}