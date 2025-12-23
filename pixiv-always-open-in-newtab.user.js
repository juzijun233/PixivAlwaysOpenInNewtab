// ==UserScript==
// @name         Pixiv Always Open in New Tab
// @name:zh-CN   Pixiv始终在新标签页打开
// @namespace    https://github.com/juzijun233/PixivAlwaysOpenInNewtab
// @version      1.1.0
// @description  Always open illustrations, manga, and novels in new tabs on Pixiv
// @description:zh-CN 在Pixiv中点击插画、漫画、小说的超链接时，始终在新标签中打开
// @author       juzijun233
// @match        https://www.pixiv.net/*
// @match        https://pixiv.net/*
// @grant        GM_openInTab
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const STORAGE_KEY = 'pixivAlwaysOpenStayOnCurrentTab';
    let stayOnCurrentTab = localStorage.getItem(STORAGE_KEY) === 'true';
    let toggleButton = null;

    /**
     * Check if a link should open in a new tab
     * @param {HTMLAnchorElement} link - The link element to check
     * @returns {boolean} - True if the link should open in a new tab
     */
    function shouldOpenInNewTab(link) {
        if (!link || !link.href) return false;

        const href = link.href;

        // Check if it's an artwork link (illustrations and manga)
        if (href.includes('/artworks/')) {
            return true;
        }

        // Check if it's a novel link
        if (href.includes('/novel/show.php') || href.match(/\/novel\/\d+/)) {
            return true;
        }

        return false;
    }

    /**
     * Process a link to make it open in a new tab
     * @param {HTMLAnchorElement} link - The link element to process
     */
    function processLink(link) {
        if (shouldOpenInNewTab(link) && link.target !== '_blank') {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            // Mark as processed to avoid redundant processing
            link.dataset.pixivNewTabProcessed = 'true';
        }
    }

    /**
     * Process all links on the page
     */
    function processAllLinks() {
        const links = document.querySelectorAll('a');
        links.forEach(processLink);
    }

    /**
     * Handle clicks to open link in background without switching tabs
     * @param {MouseEvent} event
     */
    function handleLinkClick(event) {
        if (!stayOnCurrentTab) return;
        if (event.defaultPrevented) return;
        if (event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const target = event.target;
        if (!(target instanceof Element)) return;
        const link = target.closest('a');
        if (!link) return;
        if (!shouldOpenInNewTab(link)) return;

        event.preventDefault();

        if (typeof GM_openInTab === 'function') {
            GM_openInTab(link.href, { active: false, insert: true, setParent: true });
        } else {
            const newTab = window.open(link.href, '_blank', 'noopener,noreferrer');
            if (newTab) {
                newTab.opener = null;
            }
        }
    }

    /**
     * Set up MutationObserver to handle dynamically added links
     */
    function setupObserver() {
        // Wait for body to be available
        if (!document.body) {
            setTimeout(setupObserver, 100);
            return;
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    // If the added node is a link
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName === 'A') {
                            processLink(node);
                        }
                        // If the added node contains links
                        const links = node.querySelectorAll && node.querySelectorAll('a');
                        if (links) {
                            links.forEach(processLink);
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return observer;
    }

    /**
     * Update button text to reflect current state
     */
    function updateToggleButtonText() {
        if (!toggleButton) return;
        toggleButton.textContent = stayOnCurrentTab ? '不切换新标签：开' : '不切换新标签：关';
    }

    /**
     * Create toggle button for stay-on-current-tab feature
     */
    function createToggleButton() {
        if (!document.body || toggleButton) return;

        toggleButton = document.createElement('button');
        toggleButton.style.position = 'fixed';
        toggleButton.style.bottom = '16px';
        toggleButton.style.right = '16px';
        toggleButton.style.zIndex = '2147483647';
        toggleButton.style.padding = '8px 12px';
        toggleButton.style.backgroundColor = '#0096fa';
        toggleButton.style.color = '#fff';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '4px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.fontSize = '12px';
        toggleButton.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
        updateToggleButtonText();

        toggleButton.addEventListener('click', () => {
            stayOnCurrentTab = !stayOnCurrentTab;
            localStorage.setItem(STORAGE_KEY, stayOnCurrentTab ? 'true' : 'false');
            updateToggleButtonText();
        });

        document.body.appendChild(toggleButton);
    }

    /**
     * Initialize the script
     */
    function init() {
        const onReady = () => {
            processAllLinks();
            setupObserver();
            createToggleButton();
            document.addEventListener('click', handleLinkClick, true);
        };

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', onReady);
        } else {
            // DOM is already ready
            onReady();
        }
    }

    // Start the script
    init();
})();
