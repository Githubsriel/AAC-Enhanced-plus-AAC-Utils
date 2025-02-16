// ==UserScript==
// @name         AAC Enhanced plus AAC Utils
// @namespace    http://tampermonkey.net/
// @version      1.9.2
// @copyright    2025, Asriel (https://greasyfork.org/de/users/1375984-asriel-aac) 2022, Reimu(https://github.com/ReiwuKleiwu/AAC-Utils)
// @license      MIT
// @description  Adds custom UI enhancements
// @author       Asriel / Nick S. aka. Slash
// @icon         https://i.ibb.co/z5CJ5zv/revanced.png
// @supportURL   https://greasyfork.org/de/scripts/511351-aac-enhanced-plus-aac-utils/feedback
// @downloadURL  https://greasyfork.org/scripts/511351-aac-enhanced-plus-aac-utils.user.js
// @include      /^https?:\/\/(www\.)?anime\.academy\/chat/
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// ==/UserScript==



(function() {
    'use strict';

    function addGlobalStyle(css) {
        let head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle(`
            '.autocomplete-flex {' +
      '  background-color: #484b52;' +
      '  font-weight: 600;' +
      '  display: flex;' +
      '  align-items: center;' +
      '  gap: 10px;' +
      '  padding: 5px;' +
      '}' +
      '.autocomplete-flex:hover {' +
      '  background-color: #5f646e;' +
      '}' +
      '' +
      '.autocomplete-flex:focus {' +
      '  background-color: #5f646e;' +
      '}' +
      '' +
      '.name-link:hover {' +
      '  text-decoration: none;' +
      '}' +
      '.autocomplete-icon {' +
      '  width: 45px !important;' +
      '  height: 45px !important;' +
      '  border-radius: 50%;' +
      '}' +
      '.chatMessage {' +
      '  transition: padding 0.4s ease 0s;' +
      '}' +
      '.chatMessage:hover {' +
      '  padding-top: 5px;' +
      '  padding-bottom: 5px;' +
      '  position: relative;' +
      '  background-color: #5f646e !important;' +
      '  border-radius: 3px;' +
      '  transition: padding 0.4s ease 0s;' +
      '}' +
      '.messageIcons {' +
      '  display: flex;' +
      '  justify-content: center;' +
      '  align-items: center;' +
      '  height: 32px;' +
      '  width: 32px;' +
      '  background-color: #484b52;' +
      '  position: absolute;' +
      '  right: 0;' +
      '  top: -20px;' +
      '  display: none;' +
      '  border-radius: 3px;' +
      '}' +
      '.messageIcons:hover {' +
      '  background-color: #5f646e;' +
      '  filter: drop-shadow(5px 7px 14px black);' +
      '}' +
      '' +
      '.collapsible-wrap {' +
      '  margin: 10px 0 10px 0;' +
      '}' +
      '' +
      '.collapsible-button {' +
      '  cursor: pointer;' +
      '  padding: 18px;' +
      '  width: 100%;' +
      '  text-align: left;' +
      '  outline: none;' +
      '  font-size: 15px;' +
      '}' +
      '' +
      '.collapsible-button:focus {' +
      '  transition: background-color 0.5s ease;' +
      '  background-color: #3e1e80 !important;' +
      '}' +
      '' +
      '.collapsible-button:hover {' +
      '  transition: background-color 0.5s ease;' +
      '}' +
      '' +
      '.active {' +
      '  border-bottom-right-radius: 0 !important;' +
      '  border-bottom-left-radius: 0 !important;' +
      '  background-color: #3e1e80 !important;' +
      '}' +
      '' +
      '.collapsible-button:after {' +
      "  content: '\\002B';" +
      '  font-weight: bold;' +
      '  float: right;' +
      '  margin-left: 5px;' +
      '}' +
      '' +
      '.active:after {' +
      "  content: '\\2212';" +
      '}' +
      '' +
      '.collapsible-content {' +
      '  padding: 0 10px;' +
      '  max-height: 0;' +
      '  overflow: hidden;' +
      '  transition: max-height 0.2s ease-out;' +
      '  background-color: #2c2f33;' +
      '  border-bottom-left-radius: 3px;' +
      '  border-bottom-right-radius: 3px;' +
      '}' +
      '' +
      '.avatar-grid {' +
      '  width: 100%;' +
      '  display: grid;' +
      '  grid-template-columns: repeat(auto-fill, 8em);' +
      '  grid-gap: 10px 15px;' +
      '}' +
      '' +
      '.avatar-div {' +
      '  height: 80px;' +
      '  width: 80px;' +
      '  display: flex;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '  gap: 5px;' +
      '}' +
      '' +
      '.avatar-div:hover {' +
      '  background-color: #484b52;' +
      '  transition: background-color 0.5s ease;' +
      '  border-radius: 3px;' +
      '}' +
      '' +
      '.avatarIcon {' +
      '  height: 20px;' +
      '  width: 20px;' +
      '  background-color: #3e1e80;' +
      '  border-radius: 50%;' +
      '  display: none;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '}' +
      '' +
      '.avatarIcon:hover {' +
      '  background-color: #6b36d9;' +
      '  filter: drop-shadow(5px 7px 14px #2c2f33);' +
      '  transition: background-color 0.5s ease;' +
      '}' +
      '' +
      '.ionicon {' +
      '  width: 13px;' +
      '  height: 13px;' +
      '  fill: #ddd;' +
      '}' +
      '' +
      '.collection-selection {' +
      '  position: absolute;' +
      '  z-index: 10000;' +
      '  margin-left: auto;' +
      '  margin-right: auto;' +
      '  right: 0;' +
      '  left: 0;' +
      '  top: 80px;' +
      '  width: 300px;' +
      '  background-color: #484b52;' +
      '  padding: 10px;' +
      '  text-align: center;' +
      '  overflow: hidden scroll;' +
      '  border-radius: 3px;' +
      '  max-height: 200px;' +
      '}' +
      '' +
      '.collection-selectable {' +
      '  font-weight: 700;' +
      '  padding: 10px 0;' +
      '  margin-bottom: 5px;' +
      '}' +
      '' +
      '.collection-selectable:hover {' +
      '  background-color: #3e1e80;' +
      '  border-radius: 3px;' +
      '  transition: background-color 0.5s ease;' +
      '  filter: drop-shadow(5px 7px 14px #2c2f33);' +
      '}' +
      '' +
      '#createCollectionBtn {' +
      '  font-weight: 700;' +
      '}' +
      '' +
      '.removeCategory-btn {' +
      '  background-color: #fd2f2f;' +
      '}' +
      '' +
      '.request-delete-collection {' +
      '  position: absolute;' +
      '  z-index: 10000;' +
      '  margin-left: auto;' +
      '  margin-right: auto;' +
      '  right: 0;' +
      '  left: 0;' +
      '  top: 80px;' +
      '  width: 300px;' +
      '  background-color: #484b52;' +
      '  padding: 10px;' +
      '  text-align: center;' +
      '  overflow: hidden scroll;' +
      '  border-radius: 3px;' +
      '  max-height: 200px;' +
      '}' +
      '' +
      '.message-image {' +
      '  width: 100%;' +
      '  height: auto;' +
      '  border-radius: 3px;' +
      '}' +
      '' +
      '.message-image-container {' +
      '  margin-top: 5px;' +
      '}' +
      '' +
      '#username-results {' +
      '  border: none;' +
      '  max-height: 200px;' +
      '  overflow: hidden scroll;' +
      '  max-width: 30%;' +
      '  position: absolute;' +
      '  left: 0;' +
      '  right: 0;' +
      '  bottom: calc(100% + 8px);' +
      '  margin-left: 8px;' +
      '  border-radius: 5px;' +
      '}' +
      ''
    `);

    const scriptName = GM_info.script.name;
    const scriptVersion = GM_info.script.version;
    window.aacEnhancedScriptID = `${scriptName.replace(/\s+/g, '-')}-${scriptVersion}`;

    console.log(window.aacEnhancedScriptID);

    // Necessary for autoreconnect
    window.onbeforeunload = null;

    // Access the AngularJS scope
    const scope = angular.element(document.getElementById('topbar')).scope();

    // Global Socket Hook
    const globalSocketReady = new Event('globalSocketReady');

    io.Socket.prototype.o_emit = io.Socket.prototype.o_emit || io.Socket.prototype.emit;
    io.Socket.prototype.emit = function (eventName, ...args) {
        if (!window.socket) {
            window.socket = this;
            window.dispatchEvent(globalSocketReady);
        }

        window.dispatchEvent(new CustomEvent('socketEmit', { detail: { eventName: eventName, args: [...args] } }));

        return this.o_emit(eventName, ...args);
    };

  /************************************
   *
   *
   * Autoreconnect Modul
   *
   *
   ************************************/
       
    const disconnectReasons = [
        'transport error',
        'transport close',
        'io client disconnect',
        'io server disconnect',
        'ping timeout',
    ];

    const disconnected = JSON.parse(localStorage.getItem('disconnected'));

    if (disconnected) {
        localStorage.setItem('disconnected', JSON.stringify(false));
        window.addEventListener('globalSocketReady', () => {
            setTimeout(() => {
                window.socket.emit('moveAvatar', JSON.parse(localStorage.getItem('avatarPosition')));
            }, 1500);
        });
    }

    window.addEventListener('socketEmit', (event) => {
        if (event.detail.eventName === 'moveAvatar') {
            localStorage.setItem('avatarPosition', JSON.stringify(event.detail.args[0]));
        }
        if (event.detail.eventName === 'disconnect' && disconnectReasons.includes(event.detail.args[0])) {
            localStorage.setItem('disconnected', JSON.stringify(true));
            location.reload();
        }
    });
  /************************************
   *
   *
   * Chatverlaufs Modul
   *
   *
   ************************************/
    
    const maxStoredMessagesPerRoom = 50;
    const maxMessageAge = 1000 * 60 * 30; // 30 Minutes

    window.addEventListener('globalSocketReady', () => {
        window.socket.on('updateChatLines', (data) => {
            const currentRoom = window.location.href.split('=')[1];

            let roomData;

            if (!localStorage.hasOwnProperty('rooms')) {
                localStorage.setItem('rooms', JSON.stringify({}));
            }
            if (!JSON.parse(localStorage.getItem('rooms')).hasOwnProperty(currentRoom)) {
                roomData = JSON.parse(localStorage.getItem('rooms'));
                roomData[currentRoom] = {
                    messages: [],
                };
                roomData = JSON.stringify(roomData);
                localStorage.setItem('rooms', roomData);
            }

            roomData = JSON.parse(localStorage.getItem('rooms'));
            if (data.user !== 'System') roomData[currentRoom].messages.push(data);
            if (roomData[currentRoom].messages.length > maxStoredMessagesPerRoom) roomData[currentRoom].messages.splice(0, 1);

            roomData = JSON.stringify(roomData);
            localStorage.setItem('rooms', roomData);
        });

        window.addEventListener('socketEmit', (event) => {
            if (event.detail.eventName === 'changeRoom') {
                setTimeout(() => {
                    restoreChatlogs();
                }, 100);
            }
        });

        restoreChatlogs();
    });

    function restoreChatlogs() {
        let currentRoomChatlogs = undefined;

        if (JSON.parse(localStorage.getItem('rooms'))) {
            if (JSON.parse(localStorage.getItem('rooms'))[window.location.href.split('=')[1]]) {
                currentRoomChatlogs = JSON.parse(localStorage.getItem('rooms'))[window.location.href.split('=')[1]].messages;
            }
        } else {
            return;
        }

        if (currentRoomChatlogs) {
            setTimeout(() => {
                for (const messageData of currentRoomChatlogs) {
                    if (messageData.user !== 'System' && Date.now() - messageData.timestamp < maxMessageAge) {
                        const message = {
                            hasPremium: messageData.hasPremium,
                            msg: messageData.chatLine,
                            festername: messageData.festername,
                            house: messageData.house ? messageData.house : null,
                            color: undefined,
                            user: messageData.user + ': ',
                            timestamp: `${new Date(messageData.timestamp).toLocaleDateString('de-DE')} - ${new Date(
                                messageData.timestamp
                            )
                                .toLocaleTimeString('de-DE')
                                .slice(0, -3)} Uhr`,
                        };

                        scope.chatmsgs.push(message);
                        document.getElementById('topbar').click(); // Refresh the chat
                    }
                }
            }, 1500);
        }
    }

    
	/************************************
	*
	*
	* Autocomplete usernames Modul
	*
	*
	************************************/
    const chatArea = document.getElementById('graphicChatArea');
    chatArea.style.border = 'none';

    const messageForm = document.getElementsByName('chatMsgForm')[0];
    const messageInput = document.getElementById('chatline');

    messageInput.setAttribute('onKeyUp', 'showResults(this.value)');

    const resultDiv = document.createElement('div');
    resultDiv.setAttribute('id', 'username-results');

    messageForm.appendChild(resultDiv);

    function showResults(value) {
        const result = document.getElementById('username-results');

        result.style.display = 'block';

        if (!value.includes('@')) {
            result.style.display = 'none';
        }

        result.innerHTML = '';

        let list = '';

        const users = window.autocompleteMatch(value);

        for (const user in users) {
            list += `<a class="name-link"><div class="autocomplete-flex autocomplete-list" onclick="replaceName(this.children[1].innerHTML)" tabindex="0"><img class="autocomplete-icon" src="/img/publicimg/skinthumbnails/${
                users[user].imgthumb
            }"><div class="name-wrap">${users[user].username.split('@')[1]}</div></div></a>`;
        }

        result.innerHTML = `<ul style="padding: 0px; margin: 0px;">${list}</ul>`;

        const autocompleteListElements = document.getElementsByClassName('autocomplete-list');

        for (const element of autocompleteListElements) {
            element.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    window.replaceName(this.children[1].innerHTML);
                }
            });
        }
    }

    function autocompleteMatch(input) {
        if (input === '') {
            return [];
        }

        const scope = angular.element(document.getElementById('topbar')).scope();
        const users = scope.chatterlist.filter((user) => user.room === scope.roomData.name);
        const userObjects = users.map((user) => {
            return { ...user, username: `@${user.username}` };
        });

        const reg = new RegExp(`\\B@(${input.split('@')[1]}.*)$`, 'i');
        return userObjects.filter((user) => {
            if (user.username.match(reg)) {
                return user;
            }
        });
    }

    function replaceName(username) {
        const scope = angular.element(document.getElementById('topbar')).scope();
        const messageInput = document.getElementById('chatline');

        scope.chatline = scope.chatline.replace(/\B@(\w*)$/, `${username} `);

        const resultDiv = document.getElementById('username-results');
        resultDiv.style.display = 'none';

        messageInput.focus();
    }

    window.replaceName = replaceName;
    window.showResults = showResults;
    window.autocompleteMatch = autocompleteMatch;

    // Main Application Namespace
    const AACApp = {
        init: function() {
            this.loadModules();
        },

        loadModules: function() {
            TopWrapperIcon.init();
            WallpaperChanger.init();
            ChatArea.init();
        }
    };

  /************************************
   *
   *
   * Video Präferenzen Modul
   *
   *
   ************************************/
   
    
const enableVideosInput = document.getElementById('checkAllowVideo');
const enableVideos =
    JSON.parse(localStorage.getItem('enableVideos')) === undefined
        ? true
        : JSON.parse(localStorage.getItem('enableVideos'));

scope.allowVideos = enableVideos;
enableVideosInput.checked = enableVideos;

enableVideosInput.addEventListener('change', function () {
    localStorage.setItem('enableVideos', JSON.stringify(this.checked));
});

    
	/************************************
	*
	*
	* Microphone colorsaver Modul
	*
	*
	************************************/
const microphoneBackgroundColor = JSON.parse(localStorage.getItem('microphoneBackgroundColor'));
const microphoneTextColor = JSON.parse(localStorage.getItem('microphoneTextColor'));

if (microphoneBackgroundColor && microphoneTextColor) {
    window.addEventListener('globalSocketReady', () => {
        setTimeout(() => {
            window.socket.emit('applyMicrophoneColor', {
                microphoneBackgroundColor: microphoneBackgroundColor,
                microphoneTextColor: microphoneTextColor,
            });
        }, 1500);
    });
}

window.addEventListener('socketEmit', (event) => {
    if (event.detail.eventName === 'applyMicrophoneColor') {
        localStorage.setItem('microphoneBackgroundColor', JSON.stringify(event.detail.args[0].microphoneBackgroundColor));
        localStorage.setItem('microphoneTextColor', JSON.stringify(event.detail.args[0].microphoneTextColor));
    }
});
  /************************************
   *
   *
   *DM loading Fix Modul
   *
   *
   ************************************/
    
window.addEventListener('globalSocketReady', () => {
    window.socket.on('getPNList', () => {
        const scope = angular.element(document.getElementById('topbar')).scope();
        scope.loading = false;
    });
});







  /************************************
   *
   *
   *Top Wrapper & Icon Modul
   *
   *
   ************************************/


    const TopWrapperIcon = {
        init: function() {
            this.addIconToTopWrapper();
        },

        addIconToTopWrapper: function() {
            const topWrapper = document.querySelector('.area');
            if (topWrapper) {
                const iconButton = this.createIconButton();
                iconButton.addEventListener('click', () => Menu.createPlaceholderMenu());
                topWrapper.appendChild(iconButton);
            } else {
                console.warn('[AAC Enhanced] Top wrapper not found. Icon could not be added.');
            }
        },

        createIconButton: function() {
            const iconButton = document.createElement('div');
            iconButton.id = 'aac-topWrapperIcon';
            iconButton.style.width = '40px';
            iconButton.style.height = '40px';
            iconButton.style.borderRadius = '50%';
            iconButton.style.display = 'flex';
            iconButton.style.alignItems = 'center';
            iconButton.style.justifyContent = 'center';
            iconButton.style.cursor = 'pointer';
            iconButton.style.marginRight = '10px';
            iconButton.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)';

            const iconImage = document.createElement('img');
            iconImage.src = 'https://i.ibb.co/z5CJ5zv/revanced.png';
            iconImage.alt = 'Menu Icon';
            iconImage.style.width = '100%';
            iconImage.style.height = '100%';
            iconImage.style.borderRadius = '50%';

            iconButton.appendChild(iconImage);
            return iconButton;
        }
    };
  /************************************
   *
   *
   *Menü Modul
   *
   *
   ************************************/
const Menu = {
    createPlaceholderMenu: function() {
        const existingMenu = document.querySelector('#aac-placeholderMenu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const menu = this.createMenuElement();
        document.body.appendChild(menu);

        ChatArea.updateToggleButton();
        this.updateToggleLeftbarButton();
    },

    createMenuElement: function() {
    const menu = document.createElement('div');
    menu.id = 'aac-placeholderMenu';
    const iconButton = document.querySelector('#aac-topWrapperIcon');
    const iconButtonRect = iconButton.getBoundingClientRect();
    menu.style.position = 'absolute';
    menu.style.top = `${iconButtonRect.bottom + window.scrollY + 10}px`;
    menu.style.left = `${iconButtonRect.left + window.scrollX}px`;
    menu.style.zIndex = '10001';
    menu.style.padding = '20px';
    menu.style.backgroundColor = '#fff';
    menu.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    menu.style.borderRadius = '10px';
    menu.style.textAlign = 'center';

    const title = this.createTitleElement();
    const wallpaperSectionTitle = document.createElement('h4');
    wallpaperSectionTitle.innerText = 'Wallpaper Einstellungen';
    wallpaperSectionTitle.style.marginTop = '20px';
    wallpaperSectionTitle.style.marginBottom = '10px';

    const wallpaperChangerButton = WallpaperChanger.createWallpaperChangerButton();
    const savedWallpapersButton = WallpaperChanger.createSavedWallpapersButton();
    const uiSettingsSectionTitle = document.createElement('h4');
    uiSettingsSectionTitle.innerText = 'UI Einstellungen';
    uiSettingsSectionTitle.style.marginTop = '20px';
    uiSettingsSectionTitle.style.marginBottom = '10px';

    const toggleChatAreaButton = ChatArea.createToggleChatAreaButton();
    const toggleLeftbarButton = this.createToggleLeftbarButton();

    // Add Reset Button to UI Settings
    const resetChatAreaButton = document.createElement('button');
    resetChatAreaButton.innerText = 'Chat Fenster Position zurücksetzen';
    resetChatAreaButton.style.padding = '10px';
    resetChatAreaButton.style.backgroundColor = '#573699';
    resetChatAreaButton.style.color = '#fff';
    resetChatAreaButton.style.border = 'none';
    resetChatAreaButton.style.borderRadius = '5px';
    resetChatAreaButton.style.cursor = 'pointer';
    resetChatAreaButton.style.marginBottom = '10px';
    resetChatAreaButton.addEventListener('click', () => ChatArea.resetChatAreaPosition());

    // PNG Management Section
    const pngSectionTitle = document.createElement('h4');
    pngSectionTitle.innerText = 'PNG Management';
    pngSectionTitle.style.marginTop = '20px';
    pngSectionTitle.style.marginBottom = '10px';

    const pngManagerButton = this.createPngManagerButton();

    const closeButton = this.createCloseButton();

    menu.appendChild(title);
    menu.appendChild(wallpaperSectionTitle);
    menu.appendChild(wallpaperChangerButton);
    menu.appendChild(document.createElement('br'));
    menu.appendChild(savedWallpapersButton);
    menu.appendChild(document.createElement('br'));
    menu.appendChild(uiSettingsSectionTitle);
    menu.appendChild(toggleChatAreaButton);
    menu.appendChild(document.createElement('br'));
    menu.appendChild(toggleLeftbarButton);
    menu.appendChild(document.createElement('br'));
    menu.appendChild(resetChatAreaButton); // Moved here
    menu.appendChild(document.createElement('br'));

    // Append PNG Management section
    menu.appendChild(pngSectionTitle);
    menu.appendChild(pngManagerButton);
    menu.appendChild(document.createElement('br'));

    menu.appendChild(closeButton);

    return menu;
},

    createTitleElement: function() {
        const title = document.createElement('h3');
        title.innerText = 'AC-Enhanced Settings';
        title.style.marginBottom = '20px';
        return title;
    },

    createToggleLeftbarButton: function() {
        const toggleLeftbarButton = document.createElement('button');
        toggleLeftbarButton.id = 'aac-toggleLeftbarButton';
        toggleLeftbarButton.style.padding = '10px';
        toggleLeftbarButton.style.color = '#fff';
        toggleLeftbarButton.style.border = 'none';
        toggleLeftbarButton.style.borderRadius = '5px';
        toggleLeftbarButton.style.cursor = 'pointer';
        toggleLeftbarButton.style.marginBottom = '10px';

        toggleLeftbarButton.addEventListener('click', () => Menu.toggleLeftbarVisibility());

        return toggleLeftbarButton;
    },

    createResetChatAreaButton: function() {
        const resetButton = document.createElement('button');
        resetButton.innerText = 'Chat Fenster Position zurücksetzen';
        resetButton.style.padding = '10px';
        resetButton.style.backgroundColor = '#573699';
        resetButton.style.color = '#fff';
        resetButton.style.border = 'none';
        resetButton.style.borderRadius = '5px';
        resetButton.style.cursor = 'pointer';
        resetButton.style.marginBottom = '10px';

        resetButton.addEventListener('click', () => ChatArea.resetChatAreaPosition());

        return resetButton;
    },

    createPngManagerButton: function() {
        const pngManagerButton = document.createElement('button');
        pngManagerButton.innerText = 'PNG Management';
        pngManagerButton.style.padding = '10px';
        pngManagerButton.style.backgroundColor = '#573699';
        pngManagerButton.style.color = '#fff';
        pngManagerButton.style.border = 'none';
        pngManagerButton.style.borderRadius = '5px';
        pngManagerButton.style.cursor = 'pointer';
        pngManagerButton.style.marginBottom = '10px';

        pngManagerButton.addEventListener('click', () => {
            PngManager.createPngMenu();
        });

        return pngManagerButton;
    },

    createCloseButton: function() {
        const closeButton = document.createElement('button');
        closeButton.innerText = 'Schließen';
        closeButton.style.padding = '10px';
        closeButton.style.backgroundColor = '#ccc';
        closeButton.style.color = '#000';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';

        closeButton.addEventListener('click', () => {
            const menu = document.querySelector('#aac-placeholderMenu');
            if (menu) menu.remove();
        });

        return closeButton;
    },

    toggleLeftbarVisibility: function() {
        const leftbar = document.querySelector('#leftbar');
        const chatBox = document.querySelector('#chatverlaufbox');
        if (!leftbar) return;

        if (leftbar.style.visibility === 'hidden') {
            leftbar.style.transition = 'visibility 0s, opacity 0.5s linear';
            leftbar.style.opacity = '1';
            leftbar.style.visibility = 'visible';
            leftbar.style.pointerEvents = 'auto';
            if (chatBox) chatBox.style.left = '250px';
            localStorage.setItem('aac-leftbarVisibility', 'visible');
        } else {
            leftbar.style.transition = 'visibility 0s 0.5s, opacity 0.5s linear';
            leftbar.style.opacity = '0';
            leftbar.style.visibility = 'hidden';
            leftbar.style.pointerEvents = 'none';
            if (chatBox) chatBox.style.left = '0';
            localStorage.setItem('aac-leftbarVisibility', 'hidden');
        }

        this.updateToggleLeftbarButton();
    }
};





Menu.updateToggleLeftbarButton = function() {
    const toggleLeftbarButton = document.querySelector('#aac-toggleLeftbarButton');
    const leftbarVisible = localStorage.getItem('aac-leftbarVisibility') !== 'hidden';

    if (toggleLeftbarButton) {
        if (leftbarVisible) {
            toggleLeftbarButton.innerText = 'User Liste verstecken';
            toggleLeftbarButton.style.backgroundColor = '#573699';
        } else {
            toggleLeftbarButton.innerText = 'User Liste zeigen';
            toggleLeftbarButton.style.backgroundColor = '#FF0000';
        }
    }
};


    // Initialize the leftbar visibility state on load
    document.addEventListener('DOMContentLoaded', () => {
        sessionStorage.removeItem('aac-wallpaperChanged');
        sessionStorage.removeItem('aac-chatAreaButtonState');
        const leftbar = document.querySelector('#leftbar');
        const chatBox = document.querySelector('#chatverlaufbox');
        const toggleLeftbarButton = document.querySelector('#aac-toggleLeftbarButton');
        if (leftbar) {
            const leftbarVisible = localStorage.getItem('aac-leftbarVisibility') !== 'hidden';
            leftbar.style.transition = 'visibility 0s, opacity 0.5s linear';
            leftbar.style.opacity = leftbarVisible ? '1' : '0';
            leftbar.style.visibility = leftbarVisible ? 'visible' : 'hidden';
            leftbar.style.pointerEvents = leftbarVisible ? 'auto' : 'none';
            if (chatBox) {
                chatBox.style.left = leftbarVisible ? '250px' : '0'; // Ensure consistent positioning for chatbox
            }
            if (toggleLeftbarButton) {
                toggleLeftbarButton.innerText = leftbarVisible ? 'User Liste verstecken' : 'User Liste zeigen';
                toggleLeftbarButton.style.backgroundColor = leftbarVisible ? '#573699' : '#FF0000';
            }
        }
        window.onbeforeunload = () => {}; // Disable confirmation popup when reloading the page
    });

  /************************************
   *
   *
   * PNG "Sticker" Modul
   *
   *
   ************************************/
const PngManager = {
    init: function() {
        $(document).ready(() => {
            this.loadSavedPngs();
        });
    },

    loadSavedPngs: function() {
        const savedPngs = JSON.parse(localStorage.getItem('aac-savedPngs') || '[]');
        savedPngs.forEach((png, index) => {
            if (png.active) {
                this.createPngElement(png.url, index);
            }
        });
    },

    createPngMenu: function() {
        const existingMenu = document.querySelector('#aac-pngMenu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const menu = document.createElement('div');
        menu.id = 'aac-pngMenu';
        menu.style.position = 'fixed';
        menu.style.top = '50%';
        menu.style.left = '50%';
        menu.style.transform = 'translate(-50%, -50%)';
        menu.style.zIndex = '10001';
        menu.style.padding = '20px';
        menu.style.backgroundColor = '#fff';
        menu.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        menu.style.borderRadius = '10px';
        menu.style.textAlign = 'center';

        const title = document.createElement('h3');
        title.innerText = 'PNG Management';
        title.style.marginBottom = '20px';
        menu.appendChild(title);

        // Toggle Handles Button
        const toggleHandlesButton = document.createElement('button');
        toggleHandlesButton.innerText = 'Toggle Handles';
        toggleHandlesButton.style.padding = '10px';
        toggleHandlesButton.style.backgroundColor = '#573699';
        toggleHandlesButton.style.color = '#fff';
        toggleHandlesButton.style.border = 'none';
        toggleHandlesButton.style.borderRadius = '5px';
        toggleHandlesButton.style.cursor = 'pointer';
        toggleHandlesButton.style.marginBottom = '10px';

        toggleHandlesButton.addEventListener('click', () => {
            const handles = document.querySelectorAll('.aac-png-handle');
            const areHandlesVisible = handles[0].style.display !== 'none';

            handles.forEach(handle => {
                handle.style.display = areHandlesVisible ? 'none' : 'block';
            });

            // Save state to localStorage
            localStorage.setItem('aac-png-handles-visible', !areHandlesVisible);
        });

        menu.appendChild(toggleHandlesButton);

        const savedPngs = JSON.parse(localStorage.getItem('aac-savedPngs') || '[]');
        savedPngs.forEach((png, index) => {
            const pngContainer = document.createElement('div');
            pngContainer.style.display = 'flex';
            pngContainer.style.alignItems = 'center';
            pngContainer.style.marginBottom = '10px';

            const thumbnail = document.createElement('img');
            thumbnail.src = png.url;
            thumbnail.alt = png.name || `PNG ${index + 1}`;
            thumbnail.style.width = '50px';
            thumbnail.style.height = '50px';
            thumbnail.style.objectFit = 'cover';
            thumbnail.style.borderRadius = '5px';
            thumbnail.style.marginRight = '10px';

            const activateButton = document.createElement('button');
            activateButton.innerText = png.active ? 'Ausblenden' : 'Einblenden';
            activateButton.style.padding = '10px';
            activateButton.style.marginRight = '5px';
            activateButton.style.backgroundColor = png.active ? '#FF0000' : '#573699';
            activateButton.style.color = '#fff';
            activateButton.style.border = 'none';
            activateButton.style.borderRadius = '5px';
            activateButton.style.cursor = 'pointer';

            activateButton.addEventListener('click', () => {
                png.active = !png.active;
                savedPngs[index] = png;
                localStorage.setItem('aac-savedPngs', JSON.stringify(savedPngs));
                if (png.active) {
                    this.createPngElement(png.url, index);
                } else {
                    const existingPng = document.querySelector(`#aac-png-${index}`);
                    if (existingPng) existingPng.remove();
                }
                activateButton.innerText = png.active ? 'Ausblenden' : 'Einblenden';
                activateButton.style.backgroundColor = png.active ? '#FF0000' : '#573699';
            });

            const deleteButton = document.createElement('button');
            deleteButton.innerText = '✕';
            deleteButton.style.marginLeft = '5px';
            deleteButton.style.padding = '2px';
            deleteButton.style.width = '20px';
            deleteButton.style.height = '20px';
            deleteButton.style.backgroundColor = '#FF0000';
            deleteButton.style.color = '#fff';
            deleteButton.style.border = 'none';
            deleteButton.style.borderRadius = '3px';
            deleteButton.style.cursor = 'pointer';

            deleteButton.addEventListener('click', () => {
                savedPngs.splice(index, 1);
                localStorage.setItem('aac-savedPngs', JSON.stringify(savedPngs));

                // Remove the entire container (including handles)
                const existingPngContainer = document.querySelector(`#aac-png-container-${index}`);
                if (existingPngContainer) existingPngContainer.remove();

    menu.remove();
    this.createPngMenu();
});

            pngContainer.appendChild(thumbnail);
            pngContainer.appendChild(activateButton);
            pngContainer.appendChild(deleteButton);
            menu.appendChild(pngContainer);
        });

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/png';
        fileInput.style.marginBottom = '10px';
        fileInput.style.display = 'block';

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 2560 * 2560) {
                    alert('Die PNG-Datei ist zu groß. Bitte wählen Sie eine Datei, die kleiner als 2,5 MB ist.');
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    const pngUrl = e.target.result;
                    let savedPngs = JSON.parse(localStorage.getItem('aac-savedPngs') || '[]');
                    if (savedPngs.length >= 5) {
                        alert('Du kannst maximal 5 PNG-Dateien speichern. Bitte lösche eine, bevor du eine neue hinzufügst.');
                        return;
                    }
                    savedPngs.push({ url: pngUrl, name: file.name, active: false });
                    localStorage.setItem('aac-savedPngs', JSON.stringify(savedPngs));
                    menu.remove();
                    this.createPngMenu();
                };
                reader.readAsDataURL(file);
            }
        });

        const closeButton = document.createElement('button');
        closeButton.innerText = 'Schließen';
        closeButton.style.marginTop = '20px';
        closeButton.style.padding = '10px';
        closeButton.style.backgroundColor = '#ccc';
        closeButton.style.color = '#000';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';

        closeButton.addEventListener('click', () => {
            menu.remove();
        });

        menu.appendChild(fileInput);
        menu.appendChild(closeButton);

        document.body.appendChild(menu);
    },

    createResizeHandle: function() {
    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('aac-png-handle');
    resizeHandle.style.width = '15px';
    resizeHandle.style.height = '15px';
    resizeHandle.style.backgroundColor = '#573699'; // Purple for resizing
    resizeHandle.style.border = '2px solid #fff';
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.right = '0';
    resizeHandle.style.bottom = '0';
    resizeHandle.style.cursor = 'se-resize';
    resizeHandle.title = 'Resize'; // Tooltip
    return resizeHandle;
},

createRotateHandle: function() {
    const rotateHandle = document.createElement('div');
    rotateHandle.classList.add('aac-png-handle');
    rotateHandle.style.width = '15px';
    rotateHandle.style.height = '15px';
    rotateHandle.style.backgroundColor = '#FF0000'; // Red for rotating
    rotateHandle.style.border = '2px solid #fff';
    rotateHandle.style.position = 'absolute';
    rotateHandle.style.top = '0';
    rotateHandle.style.right = '0';
    rotateHandle.style.cursor = 'grab';
    rotateHandle.title = 'Rotate'; // Tooltip
    return rotateHandle;
},

createPngElement: function(url, index) {
    const pngElement = document.createElement('img');
    pngElement.src = url;
    pngElement.id = `aac-png-${index}`;

    // Set initial styles for the PNG
    pngElement.style.position = 'absolute'; // Position relative to the container
    pngElement.style.width = '150px';
    pngElement.style.height = '150px';
    pngElement.style.cursor = 'move';
    pngElement.style.transformOrigin = 'center center'; // For rotation

    // Container for the PNG and handles
    const pngContainer = document.createElement('div');
    pngContainer.id = `aac-png-container-${index}`; // Unique ID for the container
    pngContainer.style.position = 'fixed';
    pngContainer.style.top = '100px';
    pngContainer.style.left = '100px';
    pngContainer.style.zIndex = '10002';
    pngContainer.style.pointerEvents = 'auto';

    // Append the PNG to the container
    pngContainer.appendChild(pngElement);

    // Create and append handles
    const resizeHandle = this.createResizeHandle();
    const rotateHandle = this.createRotateHandle();
    pngContainer.appendChild(resizeHandle);
    pngContainer.appendChild(rotateHandle);

    // Append the container to the body
    document.body.appendChild(pngContainer);

    let isDragging = false;
    let isResizing = false;
    let isRotating = false;
    let startX, startY, initialLeft, initialTop, initialWidth, initialHeight, initialAngle;

    // Dragging logic
    pngContainer.addEventListener('mousedown', (e) => {
        if (e.target === resizeHandle || e.target === rotateHandle) {
            return; // Ignore mousedown on handles for dragging
        }

        e.preventDefault();
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = parseInt(pngContainer.style.left, 10) || 0;
        initialTop = parseInt(pngContainer.style.top, 10) || 0;
        pngElement.style.opacity = '0.6';
    });

    // Resizing logic
    resizeHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        initialWidth = pngElement.offsetWidth;
        initialHeight = pngElement.offsetHeight;
    });

    // Rotating logic
    rotateHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isRotating = true;
        startX = e.clientX;
        startY = e.clientY;
        const transform = pngElement.style.transform;
        initialAngle = transform ? parseFloat(transform.replace('rotate(', '').replace('deg)', '')) : 0;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            const newLeft = initialLeft + deltaX;
            const newTop = initialTop + deltaY;

            // Update container position
            pngContainer.style.left = `${newLeft}px`;
            pngContainer.style.top = `${newTop}px`;
        }

        if (isResizing) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            const newWidth = initialWidth + deltaX;
            const newHeight = initialHeight + deltaY;

            // Ensure minimum size
            if (newWidth > 50 && newHeight > 50) {
                pngElement.style.width = `${newWidth}px`;
                pngElement.style.height = `${newHeight}px`;
            }
        }

        if (isRotating) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            const angle = initialAngle + Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            pngElement.style.transform = `rotate(${angle}deg)`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        isResizing = false;
        isRotating = false;
        pngElement.style.opacity = '1';
    });
}
};

// Load handle visibility state on page load
    document.addEventListener('DOMContentLoaded', () => {
    const handlesVisible = localStorage.getItem('aac-png-handles-visible') === 'true';
    const handles = document.querySelectorAll('.aac-png-handle');
    handles.forEach(handle => {
        handle.style.display = handlesVisible ? 'block' : 'none';
    });
});


  /************************************
   *
   *
   * Wallpaper Modul
   *
   *
   ************************************/


    const WallpaperChanger = {
        init: function() {
            this.applySavedBackground();
        },

        applySavedBackground: function() {
            const savedImageUrl = localStorage.getItem('aac-customBackgroundUrl');
            if (savedImageUrl) {
                this.applyCustomBackground(savedImageUrl);
            } else {
                this.resetToDefaultBackground();
            }
        },

        applyCustomBackground: function(url) {
            if (url) {
                document.documentElement.style.cssText = `
                    background-image: url("${url}") !important;
                    background-color: #000 !important;
                    background-position: center center !important;
                    background-attachment: fixed !important;
                    background-size: cover !important;
                    background-repeat: no-repeat !important;
                `;
                document.body.style.cssText = `
                    background-image: url("${url}") !important;
                    background-color: #000 !important;
                    background-position: center center !important;
                    background-attachment: fixed !important;
                    background-size: cover !important;
                    background-repeat: no-repeat !important;
                `;
            }
        },

        resetToDefaultBackground: function() {
            document.documentElement.style.cssText = '';
            document.body.style.cssText = '';
            localStorage.removeItem('aac-customBackgroundUrl');
        },

 createWallpaperChangerButton: function() {
        const button = document.createElement('button');
        button.innerText = 'Hintergrund ändern'; // Change Wallpaper -> Hintergrund ändern
        button.style.padding = '10px';
        button.style.backgroundColor = '#573699';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.marginBottom = '10px';

        button.addEventListener('click', () => {
            WallpaperChanger.createInputMenu();
            const menu = document.querySelector('#aac-placeholderMenu');
            if (menu) menu.remove();
        });

        return button;
    },

createSavedWallpapersButton: function() {
    const button = document.createElement('button');
    button.innerText = 'Gespeicherte Hintergründe'; // Saved Wallpapers -> Gespeicherte Hintergründe
    button.style.padding = '10px';
    button.style.backgroundColor = '#573699';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.marginBottom = '10px';

    button.addEventListener('click', () => {
        WallpaperChanger.createSavedWallpapersMenu();
    });

    return button;
},

createSavedWallpapersMenu: function() {
    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.top = '50%';
    menu.style.left = '50%';
    menu.style.transform = 'translate(-50%, -50%)';
    menu.style.zIndex = '10001';
    menu.style.padding = '20px';
    menu.style.backgroundColor = '#fff';
    menu.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    menu.style.borderRadius = '10px';
    menu.style.textAlign = 'center';

    const title = document.createElement('h3');
    title.innerText = 'Gespeicherte Hintergründe';
    title.style.marginBottom = '20px';
    menu.appendChild(title);

    const savedWallpapers = JSON.parse(localStorage.getItem('aac-savedWallpapers') || '[]');
    savedWallpapers.forEach((wallpaper, index) => {
        const wallpaperContainer = document.createElement('div');
        wallpaperContainer.style.display = 'flex';
        wallpaperContainer.style.alignItems = 'center';
        wallpaperContainer.style.marginBottom = '10px';

        const thumbnail = document.createElement('img');
        thumbnail.src = wallpaper.url;
        thumbnail.alt = wallpaper.name || `Wallpaper ${index + 1}`;
        thumbnail.style.width = '50px';
        thumbnail.style.height = '50px';
        thumbnail.style.objectFit = 'cover';
        thumbnail.style.borderRadius = '5px';
        thumbnail.style.marginRight = '10px';

        const wallpaperButton = document.createElement('button');
        wallpaperButton.innerText = wallpaper.name || `Wallpaper ${index + 1}`;
        wallpaperButton.style.padding = '10px';
        wallpaperButton.style.backgroundColor = '#573699';
        wallpaperButton.style.color = '#fff';
        wallpaperButton.style.border = 'none';
        wallpaperButton.style.borderRadius = '5px';
        wallpaperButton.style.cursor = 'pointer';
        wallpaperButton.style.marginRight = '5px';
        wallpaperButton.addEventListener('click', () => {
            WallpaperChanger.applyCustomBackground(wallpaper.url);
            localStorage.setItem('aac-customBackgroundUrl', wallpaper.url); // Save the applied wallpaper URL
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = '✕';
        deleteButton.style.marginLeft = '5px';
        deleteButton.style.padding = '2px';
        deleteButton.style.width = '20px';
        deleteButton.style.height = '20px';
        deleteButton.style.backgroundColor = '#FF0000';
        deleteButton.style.color = '#fff';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '3px';
        deleteButton.style.cursor = 'pointer';
        deleteButton.addEventListener('click', () => {
        savedPngs.splice(index, 1);
        localStorage.setItem('aac-savedPngs', JSON.stringify(savedPngs));

            // Remove the entire container (including handles)
            const existingPngContainer = document.querySelector(`#aac-png-container-${index}`);
            if (existingPngContainer) existingPngContainer.remove();

            menu.remove();
            this.createPngMenu();
});

        wallpaperContainer.appendChild(thumbnail);
        wallpaperContainer.appendChild(wallpaperButton);
        wallpaperContainer.appendChild(deleteButton);
        menu.appendChild(wallpaperContainer);
    });

    // Add a button to reset to the default wallpaper
    const resetButton = document.createElement('button');
    resetButton.innerText = 'Standardhintergrund wiederherstellen'; // Reset to Default Background
    resetButton.style.marginTop = '20px';
    resetButton.style.padding = '10px';
    resetButton.style.backgroundColor = '#ccc';
    resetButton.style.color = '#000';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '5px';
    resetButton.style.cursor = 'pointer';
    resetButton.addEventListener('click', () => {
        WallpaperChanger.resetToDefaultBackground();
        menu.remove();
    });

    menu.appendChild(resetButton);

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Schließen';
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '10px';
    closeButton.style.backgroundColor = '#ccc';
    closeButton.style.color = '#000';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        menu.remove();
    });

    menu.appendChild(closeButton);
    document.body.appendChild(menu);
},

        createInputMenu: function() {
            const menu = document.createElement('div');
            menu.style.position = 'fixed';
            menu.style.top = '50%';
            menu.style.left = '50%';
            menu.style.transform = 'translate(-50%, -50%)';
            menu.style.zIndex = '10001';
            menu.style.padding = '20px';
            menu.style.backgroundColor = '#fff';
            menu.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            menu.style.borderRadius = '10px';
            menu.style.textAlign = 'center';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Bild-URL hier eingeben...'; // Enter image URL here...
            input.value = localStorage.getItem('aac-customBackgroundUrl') || '';
            input.style.width = '300px';
            input.style.padding = '10px';
            input.style.marginBottom = '10px';
            input.style.border = '1px solid #ccc';
            input.style.borderRadius = '5px';

            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Geben Sie den Namen des Hintergrunds ein...'; // Enter wallpaper name...
            nameInput.style.width = '300px';
            nameInput.style.padding = '10px';
            nameInput.style.marginBottom = '10px';
            nameInput.style.border = '1px solid #ccc';
            nameInput.style.borderRadius = '5px';

            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.marginBottom = '10px';

            fileInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    // Check if file size exceeds 1 MB (1 MB = 1024 * 1024 bytes)
                   if (file.size > 2.5 * 1024 * 1024) {
                       alert('Die Bilddatei ist zu groß. Bitte wählen Sie eine Datei, die kleiner als 2,5 MB ist.');
                       return;
}

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imageUrl = e.target.result;
                        input.value = imageUrl;
                    };
                    reader.readAsDataURL(file);
                }
            });

    const applyButton = document.createElement('button');
            applyButton.innerText = 'Hintergrund anwenden'; // Apply Background -> Hintergrund anwenden
            applyButton.style.marginLeft = '10px';
            applyButton.style.padding = '10px';
            applyButton.style.backgroundColor = '#573699';
            applyButton.style.color = '#fff';
            applyButton.style.border = 'none';
            applyButton.style.borderRadius = '5px';
            applyButton.style.cursor = 'pointer';

            applyButton.addEventListener('click', () => {
                const imageUrl = input.value.trim();
                const wallpaperName = nameInput.value.trim();
                if (imageUrl && wallpaperName) {
                    localStorage.setItem('aac-customBackgroundUrl', imageUrl);
                    WallpaperChanger.applyCustomBackground(imageUrl);
                    sessionStorage.setItem('aac-wallpaperChanged', 'true');
                    menu.remove();
                } else {
                    alert('Bitte geben Sie eine gültige URL und einen Namen ein.'); // Please enter a valid URL and name.
                }
            });

    const saveButton = document.createElement('button');
            saveButton.innerText = 'Hintergrund speichern'; // Save Wallpaper -> Hintergrund speichern
            saveButton.style.marginTop = '10px';
            saveButton.style.padding = '10px';
            saveButton.style.backgroundColor = '#573699';
            saveButton.style.color = '#fff';
            saveButton.style.border = 'none';
            saveButton.style.borderRadius = '5px';
            saveButton.style.cursor = 'pointer';

            saveButton.addEventListener('click', () => {
                const imageUrl = input.value.trim();
                const wallpaperName = nameInput.value.trim();
                if (imageUrl && wallpaperName) {
                    let savedWallpapers = JSON.parse(localStorage.getItem('aac-savedWallpapers') || '[]');
                    if (savedWallpapers.length >= 5) {
                        alert('Du kannst maximal 5 Hintergründe speichern. Bitte lösche einen, bevor du einen neuen hinzufügst.'); // You can save a maximum of 5 wallpapers. Please delete one before adding a new one.
                        return;
                    }
                    WallpaperChanger.saveWallpaper(imageUrl, wallpaperName);
                    alert('Hintergrund erfolgreich gespeichert.'); // Wallpaper saved successfully.
                } else {
                    alert('Bitte geben Sie eine gültige URL und einen Namen ein.'); // Please enter a valid URL and name.
                }
            });

            const closeButton = document.createElement('button');
            closeButton.innerText = 'Schließen'; // Close -> Schließen
            closeButton.style.marginTop = '10px';
            closeButton.style.padding = '10px';
            closeButton.style.backgroundColor = '#ccc';
            closeButton.style.color = '#000';
            closeButton.style.border = 'none';
            closeButton.style.borderRadius = '5px';
            closeButton.style.cursor = 'pointer';

            closeButton.addEventListener('click', () => {
                menu.remove();
            });

            menu.appendChild(input);
            menu.appendChild(document.createElement('br'));
            menu.appendChild(nameInput);
            menu.appendChild(document.createElement('br'));
            menu.appendChild(fileInput);
            menu.appendChild(applyButton);
            menu.appendChild(document.createElement('br'));
            menu.appendChild(saveButton);
            menu.appendChild(document.createElement('br'));
            menu.appendChild(closeButton);

            document.body.appendChild(menu);
        },

        saveWallpaper: function(url, name) {
            let savedWallpapers = JSON.parse(localStorage.getItem('aac-savedWallpapers') || '[]');
            if (!savedWallpapers.some(wallpaper => wallpaper.url === url)) {
                savedWallpapers.push({ url, name });
                localStorage.setItem('aac-savedWallpapers', JSON.stringify(savedWallpapers));
            }
        },

        deleteWallpaper: function(index) {
            let savedWallpapers = JSON.parse(localStorage.getItem('aac-savedWallpapers') || '[]');
            savedWallpapers.splice(index, 1);
            localStorage.setItem('aac-savedWallpapers', JSON.stringify(savedWallpapers));
        }
    };

  /************************************
   *
   *
   * Chat Area Modul
   *
   *
   ************************************/


const ChatArea = {
    isDraggable: false,

    init: function() {
        this.chatArea = document.querySelector('#graphicChatArea');
        if (this.chatArea) {
            this.centerChatArea();
            this.chatArea.style.position = 'absolute';

            const savedState = localStorage.getItem('aac-isChatAreaDraggable');
            if (savedState === 'true') {
                this.enableDraggable();
            }
        }
    },

    centerChatArea: function() {
        if (this.chatArea) {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const chatWidth = this.chatArea.offsetWidth;
            const chatHeight = this.chatArea.offsetHeight;

            this.chatArea.style.left = `${(windowWidth - chatWidth) / 2}px`;
            this.chatArea.style.top = `${(windowHeight - chatHeight) / 2}px`;
        }
    },

    resetChatAreaPosition: function() {
        this.centerChatArea();
        console.log('[AAC Enhanced] Chat area position reset to center.');
    },

    toggleDraggable: function() {
        if (!this.chatArea) return;

        if (this.isDraggable) {
            this.disableDraggable();
        } else {
            this.enableDraggable();
        }

        this.updateToggleButton();
    },

    enableDraggable: function() {
        this.isDraggable = true;
        localStorage.setItem('aac-isChatAreaDraggable', 'true');
        sessionStorage.setItem('aac-chatAreaButtonState', 'true');

        $(this.chatArea).draggable({
            containment: 'document',
            start: function() {
                ChatArea.chatArea.classList.add('ui-draggable-enabled');
            },
            stop: function() {
                ChatArea.chatArea.classList.remove('ui-draggable-enabled');
            }
        });

        console.log('[AAC Enhanced] Chat area is now draggable.');
    },

    disableDraggable: function() {
        this.isDraggable = false;
        localStorage.setItem('aac-isChatAreaDraggable', 'false');

        if ($(this.chatArea).draggable('instance')) {
            $(this.chatArea).draggable('destroy');
        }

        console.log('[AAC Enhanced] Draggable functionality has been disabled.');
    },

    updateToggleButton: function() {
        const toggleButton = document.querySelector('#aac-toggleChatAreaButton');
        if (toggleButton) {
            if (this.isDraggable) {
                toggleButton.innerText = 'Verschiebbare Chat-Bereich deaktivieren'; // Disable Draggable Chat Area
                toggleButton.style.backgroundColor = '#FF0000';
            } else {
                toggleButton.innerText = 'Verschiebbare Chat-Bereich aktivieren'; // Enable Draggable Chat Area
                toggleButton.style.backgroundColor = '#573699';
            }
        }
    },

    createToggleChatAreaButton: function() {
        const button = document.createElement('button');
        button.id = 'aac-toggleChatAreaButton';
        button.style.padding = '10px';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.marginBottom = '10px';

        button.addEventListener('click', () => ChatArea.toggleDraggable());

        return button;
    }
};

  /************************************
   *
   *
   *Reply Modul & Image in Chat Modul
   *
   *
   ************************************/


   
const messageDiv = document.getElementsByClassName('chatverlauf')[0];

const messageObserverConfig = { childList: true };

const messagesMutationCallback = function (mutationsList) {
    for (const mutation of mutationsList) {
        // Reply-Message
        if (mutation.addedNodes.length) {
            const message = mutation.addedNodes[0];
            const chatMessageDiv = message.querySelectorAll(`[ng-bind-html^='chatmsg.msg']`)[0];
            const messageContent = chatMessageDiv.textContent;
            const isSystemMessage = message.classList.contains('systemMsg');
            const isEmojiMessage = message.querySelectorAll(`[ng-if='chatmsg.emojiImage']`).length > 0;
            const isOwnMessage = messageContent.startsWith(': ');

            message.style.paddingLeft = '1px';

            if (isEmojiMessage) {
                continue;
            }

            if (isSystemMessage) {
                continue;
            }

            message.classList.add('chatMessage');

            const messageIconsDiv = document.createElement('div');

            messageIconsDiv.classList.add('messageIcons');
            messageIconsDiv.innerHTML =
                '<svg aria-hidden="true" class="svg-inline--fa fa-quote-right fa-w-16" focusable="false" data-prefix="fa" data-icon="quote-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="#d2d2d2" d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path></svg>';

            message.appendChild(messageIconsDiv);

            message.addEventListener('mouseover', function () {
                const iconDiv = this.children[this.children.length - 1];
                iconDiv.style.display = 'flex';
            });

            message.addEventListener('mouseout', function () {
                const iconDiv = this.children[this.children.length - 1];
                iconDiv.style.display = 'none';
            });

            messageIconsDiv.addEventListener('click', function () {
                const scope = angular.element(document.getElementById('topbar')).scope();
                const messageInput = document.getElementById('chatline');

                let username = '';

                if (!isOwnMessage) {
                    username = chatMessageDiv.previousElementSibling.textContent.slice(0, -1);
                } else {
                    username = chatMessageDiv.previousElementSibling.textContent;
                }

                if (scope.chatline === undefined) {
                    scope.chatline = '';
                }

                if (!isOwnMessage) {
                    scope.chatline += ` @${username} "${messageContent}" `;
                } else {
                    scope.chatline += ` @${username} "${messageContent.split(': ')[1]}" `;
                }

                messageInput.focus();
            });

	/************************************
	*
	*
	*View Images in chat Modul
	*
	*
	************************************/
            
            const imageUrlRegex = new RegExp(`(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|svg))`);
            const isImageUrl = messageContent.match(imageUrlRegex);

            if (isImageUrl) {
                const imageUrl = isImageUrl[0];
                const imageDiv = document.createElement('div');
                const imageElement = document.createElement('img');

                imageDiv.setAttribute('class', 'message-image-container');
                imageElement.setAttribute('class', 'message-image');

                imageElement.src = imageUrl;

                imageDiv.appendChild(imageElement);

                chatMessageDiv.appendChild(imageDiv);
            }
        }
    }
};

const messagesObserver = new MutationObserver(messagesMutationCallback);

messagesObserver.observe(messageDiv, messageObserverConfig);


  /************************************
   *
   *
   * Avatar-Collections Modul
   * 
   *
   ************************************/

  if (!localStorage.hasOwnProperty('collections')) {
    localStorage.setItem('collections', JSON.stringify({ 'Keine Kategorie': { isDefault: true } }));
  }
  if (!localStorage.hasOwnProperty('avatars')) {
    localStorage.setItem('avatars', JSON.stringify({}));
  }

  window.addEventListener('globalSocketReady', () => {
    window.socket.on('getAvatarcase', (data) => {
      const avatars = data.avatars;

      const storageAvatars = JSON.parse(localStorage.getItem('avatars'));

      for (const avatar of avatars) {
        if (!storageAvatars[avatar.avatarid]) {
          storageAvatars[avatar.avatarid] = {
            id: avatar.avatarid,
            img: avatar.img,
            imgthumb: avatar.imgthumb,
            collection: 'Keine Kategorie',
          };
        }
      }

      localStorage.setItem('avatars', JSON.stringify(storageAvatars));
    });
    window.socket.emit('getAvatarcase');
  });

  window.addEventListener('socketEmit', (event) => {
    if (event.detail.eventName === 'deleteAvatar') {
      // Remove Avatar properly in case it gets deleted
      const avatarID = event.detail.args[0].avatarid;
      const avatarDiv = document.querySelectorAll(`[id^='${avatarID}']`)[0];
      avatarDiv.remove();

      const storageAvatars = JSON.parse(localStorage.getItem('avatars'));

      delete storageAvatars[avatarID];

      localStorage.setItem('avatars', JSON.stringify(storageAvatars));
    }
  });

  window.addAvatarToCollection = function (avatarID, collection) {
    const collections = JSON.parse(localStorage.getItem('collections'));
    if (!collections[collection]) {
      console.log(`Collection '${collection}' doesn't exist!`);
      return false;
    }
    const storageAvatars = JSON.parse(localStorage.getItem('avatars'));

    if (!storageAvatars[avatarID]) {
      console.log(`Avatar '${avatarID}' doesn't exist!`);
      return false;
    }

    storageAvatars[avatarID].collection = collection;
    localStorage.setItem('avatars', JSON.stringify(storageAvatars));
    return true;
  };

  window.removeAvatarFromCollection = function (avatarID) {
    const storageAvatars = JSON.parse(localStorage.getItem('avatars'));
    if (!storageAvatars[avatarID]) {
      console.log(`Avatar '${avatarID}' doesn't exist!`);
      return false;
    }
    storageAvatars[avatarID].collection = 'Keine Kategorie';
    localStorage.setItem('avatars', JSON.stringify(storageAvatars));
    return true;
  };

  window.addCollection = function (collection) {
    const collections = JSON.parse(localStorage.getItem('collections'));
    if (collections[collection]) {
      console.log(`Collection ${collection} already exists!`);
      return false;
    }
    collections[collection] = {
      isDefault: false,
    };

    localStorage.setItem('collections', JSON.stringify(collections));
    return true;
  };

  window.deleteCollection = function (collection) {
    const collections = JSON.parse(localStorage.getItem('collections'));
    if (!collections[collection]) {
      console.log(`Collection '${collection}' doesn't exist!`);
      return false;
    }
    if (collections[collection].isDefault) {
      console.log(`Default collections such as '${collection}' must not be deleted!`);
      return false;
    }

    const storageAvatars = JSON.parse(localStorage.getItem('avatars'));

    for (const avatar in storageAvatars) {
      if (storageAvatars[avatar].collection === collection) {
        storageAvatars[avatar].collection = 'Keine Kategorie';
      }
    }

    localStorage.setItem('avatars', JSON.stringify(storageAvatars));

    delete collections[collection];

    localStorage.setItem('collections', JSON.stringify(collections));
    return true;
  };

  // View

  const avatarcaseObserverConfig = { childList: true };
  const avatarcaseDiv = document.querySelector('[ng-hide="disconnectedClient"]').children[1];

  const avatarcaseMutationCallback = function (mutationsList) {
    for (const mutation of mutationsList) {
      for (const node of mutation.addedNodes) {
        if (node.id === 'avatarcase') {
          const acSelfAvatarElements = document.querySelectorAll('[ng-repeat="ownedAva in ownedAvas track by $index"]');

          setTimeout(() => {
            for (const element of acSelfAvatarElements) {
              element.remove();
            }
          }, 1200);

          const collections = JSON.parse(localStorage.getItem('collections'));
          const avatarCaseDiv = document.getElementsByClassName('avatarcase_main')[0];

          for (const collection in collections) {
            const collapsibleWrap = createCategoryElement(collection, node, avatarCaseDiv);
            avatarCaseDiv.append(collapsibleWrap);
          }

          const newCollectionFormDiv = document.createElement('div');
          const newCollectionInput = document.createElement('input');
          const newCollectionSubmitButton = document.createElement('button');

          newCollectionSubmitButton.textContent = 'Neue Kategorie erstellen';
          newCollectionSubmitButton.id = 'createCollectionBtn';
          newCollectionInput.id = 'createCollectionInput';

          newCollectionFormDiv.appendChild(newCollectionInput);
          newCollectionFormDiv.appendChild(newCollectionSubmitButton);

          newCollectionSubmitButton.addEventListener('click', function () {
            const input = document.getElementById('createCollectionInput');
            if (input.value !== '') {
              const successfullyAdded = window.addCollection(input.value);

              if (successfullyAdded) {
                const collapsbileWrap = createCategoryElement(input.value, node);
                avatarCaseDiv.insertBefore(collapsbileWrap, newCollectionFormDiv);
              }
            }
          });

          avatarCaseDiv.appendChild(newCollectionFormDiv);
        }
      }
    }
  };

  function createCategoryElement(collection, node) {
    const scope = angular.element(document.getElementById('topbar')).scope();

    const collapsibleWrap = document.createElement('div');
    const collapsibleButton = document.createElement('button');
    const collapsibleContent = document.createElement('div');
    const avatarGrid = document.createElement('div');
    const removeCategoryButton = document.createElement('button');

    collapsibleWrap.setAttribute('class', 'collapsible-wrap');
    collapsibleWrap.setAttribute('id', collection);
    collapsibleButton.setAttribute('class', 'collapsible-button');
    collapsibleContent.setAttribute('class', 'collapsible-content');
    removeCategoryButton.setAttribute('class', 'removeCategory-btn');
    avatarGrid.setAttribute('class', 'avatar-grid');
    collapsibleButton.textContent = collection;
    removeCategoryButton.textContent = 'Kategorie löschen';

    removeCategoryButton.addEventListener('click', function () {
      window.selectedCollection = this.parentElement.parentElement.id;

      const requestDeleteCollectionDiv = document.createElement('div');
      const cancelRequestBtn = document.createElement('button');
      const acceptRequestBtn = document.createElement('button');

      requestDeleteCollectionDiv.setAttribute('class', 'request-delete-collection');

      requestDeleteCollectionDiv.textContent = `Kategorie "${window.selectedCollection}" wirklich löschen?`;
      acceptRequestBtn.textContent = 'löschen';
      cancelRequestBtn.textContent = 'abbrechen';

      acceptRequestBtn.addEventListener('click', function () {
        const deletionSuccessfull = window.deleteCollection(window.selectedCollection);

        if (deletionSuccessfull) {
          const defaultCategory = document.getElementById('Keine Kategorie');
          const selecetedCategory = document.getElementById(window.selectedCollection);

          for (const avatar of selecetedCategory.children[1].children[0].children) {
            avatar.children[avatar.childElementCount - 1].remove();
            createAddToCollectionIcon(avatar, node);
            defaultCategory.children[1].children[0].appendChild(avatar);
          }

          selecetedCategory.remove();
        }
        this.parentElement.remove();
      });

      cancelRequestBtn.addEventListener('click', function () {
        this.parentElement.remove();
      });

      requestDeleteCollectionDiv.appendChild(cancelRequestBtn);
      requestDeleteCollectionDiv.appendChild(acceptRequestBtn);

      node.appendChild(requestDeleteCollectionDiv);
    });

    collapsibleContent.appendChild(avatarGrid);

    if (collection !== 'Keine Kategorie') {
      collapsibleContent.appendChild(removeCategoryButton);
    }

    collapsibleWrap.appendChild(collapsibleButton);
    collapsibleWrap.appendChild(collapsibleContent);

    const avatars = JSON.parse(localStorage.getItem('avatars'));

    for (const avatar in avatars) {
      if (avatars[avatar].collection === collection) {
        const avatarDiv = document.createElement('div');
        const deleteIconDiv = document.createElement('div');
        const selectIconDiv = document.createElement('div');

        avatarDiv.id = `${avatars[avatar].id}-${avatars[avatar].img}`;
        avatarDiv.setAttribute('class', 'avatar-div');
        avatarDiv.style.backgroundImage = `url('/img/publicimg/skinthumbnails/${avatars[avatar].imgthumb}')`;

        deleteIconDiv.setAttribute('class', 'avatarIcon');
        selectIconDiv.setAttribute('class', 'avatarIcon');

        deleteIconDiv.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Trash</title><path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none"/><path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z"/></svg>';

        selectIconDiv.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Shirt</title><path d="M256 96c33.08 0 60.71-25.78 64-58 .3-3-3-6-6-6a13 13 0 00-4.74.9c-.2.08-21.1 8.1-53.26 8.1s-53.1-8-53.26-8.1a16.21 16.21 0 00-5.3-.9h-.06a5.69 5.69 0 00-5.38 6c3.35 32.16 31 58 64 58z"/><path d="M485.29 89.9L356 44.64a4 4 0 00-5.27 3.16 96 96 0 01-189.38 0 4 4 0 00-5.35-3.16L26.71 89.9A16 16 0 0016.28 108l16.63 88a16 16 0 0013.92 12.9l48.88 5.52a8 8 0 017.1 8.19l-7.33 240.9a16 16 0 009.1 14.94A17.49 17.49 0 00112 480h288a17.49 17.49 0 007.42-1.55 16 16 0 009.1-14.94l-7.33-240.9a8 8 0 017.1-8.19l48.88-5.52a16 16 0 0013.92-12.9l16.63-88a16 16 0 00-10.43-18.1z"/></svg>';

        avatarDiv.appendChild(deleteIconDiv);
        avatarDiv.appendChild(selectIconDiv);

        selectIconDiv.addEventListener('click', function () {
          scope.changeAvatarTexture(this.parentElement.id.split('-')[1]);
        });

        deleteIconDiv.addEventListener('click', function () {
          scope.requestDeleteAvatar({ avatarid: this.parentElement.id.split('-')[0] });
        });

        if (collection === 'Keine Kategorie') {
          createAddToCollectionIcon(avatarDiv, node);
        } else {
          createRemoveFromCollectionIcon(avatarDiv, node);
        }

        avatarDiv.addEventListener('mouseover', function () {
          for (const child of this.children) {
            child.style.display = 'flex';
          }
        });

        avatarDiv.addEventListener('mouseout', function () {
          for (const child of this.children) {
            child.style.display = 'none';
          }
        });

        avatarGrid.appendChild(avatarDiv);
      }
    }

    collapsibleButton.addEventListener('click', function () {
      this.classList.toggle('active');
      const content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });

    return collapsibleWrap;
  }

  function createAddToCollectionIcon(avatarDiv, node) {
    const addToCollectionIcon = document.createElement('div');

    addToCollectionIcon.setAttribute('class', 'avatarIcon');
    addToCollectionIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Bag Add</title><path d="M454.66 169.4A31.86 31.86 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.78 31.78 0 00-9.34-22.6zM320 336h-48v48a16 16 0 01-32 0v-48h-48a16 16 0 010-32h48v-48a16 16 0 0132 0v48h48a16 16 0 010 32zm16-176H176v-16a80 80 0 01160 0z"/></svg>';

    addToCollectionIcon.addEventListener('click', function () {
      const collections = JSON.parse(localStorage.getItem('collections'));
      window.selectedAvatar = this.parentElement.id.split('-')[0];

      const collectionSelection = document.createElement('div');
      const cancelSelectionBtn = document.createElement('button');

      cancelSelectionBtn.textContent = 'abbrechen';

      collectionSelection.setAttribute('class', 'collection-selection');
      for (const collection in collections) {
        const collectionSelectable = document.createElement('div');
        collectionSelectable.setAttribute('class', 'collection-selectable');
        collectionSelectable.textContent = collection;
        collectionSelection.appendChild(collectionSelectable);
        collectionSelectable.addEventListener('click', function () {
          window.addAvatarToCollection(window.selectedAvatar, this.textContent);
          const avatarDiv = document.querySelectorAll(`[id^='${window.selectedAvatar}']`)[0];
          const newCollectionDiv = document.getElementById(this.textContent).children[1].children[0];

          avatarDiv.children[avatarDiv.childElementCount - 1].remove();

          createRemoveFromCollectionIcon(avatarDiv, node);

          for (const child of avatarDiv.children) {
            child.style.display = 'none';
          }

          newCollectionDiv.appendChild(avatarDiv);

          this.parentElement.remove();
        });
      }

      cancelSelectionBtn.addEventListener('click', function () {
        this.parentElement.remove();
      });

      collectionSelection.appendChild(cancelSelectionBtn);
      node.appendChild(collectionSelection);
    });

    avatarDiv.appendChild(addToCollectionIcon);
  }

  function createRemoveFromCollectionIcon(avatarDiv, node) {
    const removeFromCollectionIcon = document.createElement('div');
    removeFromCollectionIcon.setAttribute('class', 'avatarIcon');
    removeFromCollectionIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Bag Remove</title><path d="M454.66 169.4A31.86 31.86 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.78 31.78 0 00-9.34-22.6zM320 336H192a16 16 0 010-32h128a16 16 0 010 32zm16-176H176v-16a80 80 0 01160 0z"/></svg>';

    removeFromCollectionIcon.addEventListener('click', function () {
      const avatarDiv = this.parentElement;
      const newCollectionDiv = document.getElementById('Keine Kategorie').children[1].children[0];

      avatarDiv.children[avatarDiv.childElementCount - 1].remove();

      createAddToCollectionIcon(avatarDiv, node);

      for (const child of avatarDiv.children) {
        child.style.display = 'none';
      }

      window.removeAvatarFromCollection(avatarDiv.id.split('-')[0]);
      newCollectionDiv.appendChild(avatarDiv);
    });

    avatarDiv.appendChild(removeFromCollectionIcon);
  }

  const avatarcaseObserver = new MutationObserver(avatarcaseMutationCallback);

  avatarcaseObserver.observe(avatarcaseDiv, avatarcaseObserverConfig);

  /************************************
   *
   *
   * Marktplatz Popup Modul
   *
   *
   ************************************/

    function createMarktplatzPanel() {
    // Create Marktplatz Panel box
    const panelBox = document.createElement('div');
    panelBox.id = 'marktplatzPanel';
    panelBox.style.position = 'fixed';
    panelBox.style.width = '600px';
    panelBox.style.height = '700px';
    panelBox.style.backgroundColor = '#1e1e1e';
    panelBox.style.color = '#f0f0f0';
    panelBox.style.border = '1px solid #333';
    panelBox.style.borderRadius = '5px';
    panelBox.style.zIndex = '10000';
    panelBox.style.overflow = 'auto';
    panelBox.style.resize = 'both';
    panelBox.style.cursor = 'default';
    panelBox.style.userSelect = 'text';

    // Center the popup on the screen
    panelBox.style.left = '50%';
    panelBox.style.top = '50%';
    panelBox.style.transform = 'translate(-50%, -50%)';

    // Create a title bar for the panel box
    const titleBar = document.createElement('div');
    titleBar.style.cursor = 'move';
    titleBar.style.padding = '5px';
    titleBar.style.backgroundColor = '#333';
    titleBar.style.color = '#f0f0f0';
    titleBar.style.fontWeight = 'bold';
    titleBar.innerHTML = 'Marktplatz Panel (Drag Title Bar to Move)';
    titleBar.style.display = 'flex';
    titleBar.style.justifyContent = 'space-between';
    titleBar.style.alignItems = 'center';

    // Create a close button
    const closeButton = document.createElement('button');
    closeButton.innerText = '×';
    closeButton.style.background = '#ff4d4d';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '16px';
    closeButton.style.width = '25px';
    closeButton.style.height = '25px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.cursor = 'pointer';
    closeButton.style.textAlign = 'center';
    closeButton.style.lineHeight = '25px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.marginRight = '5px';
    closeButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent drag triggering when clicking close
        panelBox.remove();
    });

    // Append close button and title bar
    titleBar.appendChild(closeButton);
    panelBox.appendChild(titleBar);

    // Create a container to load Marktplatz content
    const contentContainer = document.createElement('div');
    contentContainer.style.width = '100%';
    contentContainer.style.height = 'calc(100% - 30px)'; // Adjusting height for the title bar
    contentContainer.style.overflow = 'auto';
    contentContainer.style.background = '#282828';
    contentContainer.style.padding = '5px';
    panelBox.appendChild(contentContainer);

    // Load the Marktplatz page inside an iframe to ensure full functionality
    const iframe = document.createElement('iframe');
    iframe.src = 'https://anime.academy/marktplatz';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.background = '#1e1e1e';
    contentContainer.appendChild(iframe);

    // Append the panel box to the document body
    document.body.appendChild(panelBox);

    // Drag functionality for the title bar only
    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - panelBox.getBoundingClientRect().left;
        offsetY = e.clientY - panelBox.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            panelBox.style.left = `${e.clientX - offsetX}px`;
            panelBox.style.top = `${e.clientY - offsetY}px`;
            panelBox.style.transform = 'none';
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });
}

function attachMarktplatzListener() {
    document.addEventListener('click', function (event) {
        const target = event.target.closest('a[href="/marktplatz"]');
        if (target) {
            event.preventDefault(); // Prevent default opening in new tab
            if (!document.getElementById('marktplatzPanel')) {
                createMarktplatzPanel();
            }
        }
    });
}

    attachMarktplatzListener();


AACApp.init();
})();
