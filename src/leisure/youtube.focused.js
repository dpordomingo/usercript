// ==UserScript==
// @name         Focused YouTube
// @namespace    dpordomingo.usercripts.src.leisure.youtube.focused
// @version      0.1
// @description  Reduce the distractions in youtube showing video-only when the window is really narrow
// @author       dpordomingo
// @source       https://github.com/dpordomingo/usercripts
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const limitedWidth = 600;
    const limitedWidthClassName = 'limitedWidth';
    const newStyleContainer = document.createElement('style');
    newStyleContainer.innerHTML = '\
.limitedWidth #meta,\
.limitedWidth #info,\
.limitedWidth #masthead-container,\
.limitedWidth #related,\
.limitedWidth #comments {\
display: none !important;\
}\
.limitedWidth #page-manager {\
margin-top: 0 !important;\
}';
    document.getElementsByTagName('head')[0].appendChild(newStyleContainer);

    const isLimitedWidth = () => document.body.classList.contains(limitedWidthClassName);

    window.onresize = () => {
        if (window.innerWidth < limitedWidth) {
            if (!isLimitedWidth()) {
                document.body.classList.add(limitedWidthClassName);
            }

        } else {
            if (isLimitedWidth()) {
                document.body.classList.remove(limitedWidthClassName);
            }
        }
    }
})();
