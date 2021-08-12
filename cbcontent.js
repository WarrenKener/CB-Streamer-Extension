window.addEventListener("load", myMain, false)

function myMain (evt) {
    var jsInitChecktimer = setInterval (checkForJS_Finish, 500);

    function checkForJS_Finish () {
        if (document.querySelector(".message-list")) {
            clearInterval(jsInitChecktimer);

            if (!document.querySelector("ul#room_list")) {
                // front end
                //var span = document.createElement("span")
                //var refDiv = document.querySelector('div.BroadcastRoot > div:nth-of-type(3) > div > div:nth-of-type(2) > div')
                //refDiv.setAttribute('style', 'position: relative;')
                //refDiv.appendChild(span)
                
                // back end
                var numOfChatTabs = 0 // to begin
                var chatSessions = []
                var msgObservers = []

                function makeChatTabObs(indexOfChatTab) {
                    msgObservers[msgObservers.length] = new MutationObserver(function() {
                        //if (chatSessions[indexOfChatTab].parentElement.getAttribute('style').includes("display: none")) {
                        var chatUser = chatSessions[indexOfChatTab].querySelector('div.msg-text:last-of-type div.purecolor').innerText
                        var chatText = chatSessions[indexOfChatTab].querySelector('div.msg-text:last-of-type span.msg-text span').innerText
                        var textSize = chatSessions[indexOfChatTab].getAttribute('style').slice(chatSessions[indexOfChatTab].getAttribute('style').indexOf('font-size') + 11)
                        
                        if (chatSessions[indexOfChatTab].querySelector('div.msg-text:last-of-type div.purecolor').classList.contains('broadcaster') === false) {
                            if (indexOfChatTab === 0) {
                                //tbc
                            } else {
                                var span = document.createElement("span")
                                span.setAttribute('style', 'color: black; background-color: yellow; font-size: ' + textSize)

                                var chatMsgList = chatSessions[0].querySelector('div.message-list')
                                var newChatDivParent = chatMsgList.querySelector('div.msg-text').cloneNode(false)
                                var newChatDivChild = chatMsgList.querySelector('div.msg-text > div').cloneNode(false)
                                var newOuterSpan = document.createElement('span')
                                newOuterSpan.setAttribute('class', 'emoticonImage msg-text split-mode')
                                
                                chatMsgList.appendChild(newChatDivParent)
                                chatMsgList.querySelector('div.msg-text:last-of-type').appendChild(newChatDivChild)
                                chatMsgList.querySelector('div.msg-text:last-of-type > div').appendChild(newOuterSpan)
                                chatMsgList.querySelector('div.msg-text:last-of-type > div > span').appendChild(span)
                                span.innerText = chatUser + ": " + chatText

                                var divForScroll = commboxElem.querySelector('div > div > div.msg-list-wrapper-split')
                                divForScroll.scrollTop = divForScroll.scrollHeight
                            }
                        }
                    })
                }

                var ChatSessionObserver = new MutationObserver(function() {
                    var ChatTabElems = document.querySelectorAll('div#ChatTabContents')

                    if (numOfChatTabs != ChatTabElems.length) {
                        for (element of ChatTabElems) {
                            if (element != chatSessions[Array.prototype.indexOf.call(ChatTabElems, element)]) {
                                chatSessions.push(element)
                            }
                        }
                        makeChatTabObs(chatSessions.length - 1)
                        msgObservers[msgObservers.length - 1].observe(chatSessions[chatSessions.length - 1], {attributes: true, subtree: true, childList: true})

                        numOfChatTabs = chatSessions.length
                    }
                })
            
                var commboxElem = document.querySelector('div.BroadcastContent div.BaseTabsContainer > div:last-of-type')
                ChatSessionObserver.observe(commboxElem, {attributes: true, subtree: true, childList: true})
            }
        }
    }
}