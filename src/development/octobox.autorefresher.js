// ==UserScript==
// @name         Octobox autorefresher
// @namespace    dpordomingo.usercripts.src.development.octobox.autorefresher
// @version      0.1
// @description  Enable autorefresh in Octobox
// @author       dpordomingo
// @source       https://github.com/dpordomingo/usercripts
// @match        https://octobox.io/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Defines the amount of minutes between every automatic refresh
    const minutesInterval = 3;

    const setAutoRefresh = min => {
        $('.js-table-notifications').data('refresh-interval', min * 60 * 1000);
        setAutoSyncTimer();
    };

    setAutoRefresh(minutesInterval);
})();
