// ==UserScript==
// @name         Pixiv Always Open in New Tab
// @name:zh-CN   Pixiv始终在新标签页打开
// @namespace    https://github.com/juzijun233/PixivAlwaysOpenInNewtab
// @version      1.0.0
// @description  Always open illustrations, manga, and novels in new tabs on Pixiv
// @description:zh-CN 在Pixiv中点击插画、漫画、小说的超链接时，始终在新标签中打开
// @author       juzijun233
// @match        https://www.pixiv.net/*
// @match        https://pixiv.net/*
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

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
     * Set up MutationObserver to handle dynamically added links
     */
    function setupObserver() {
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
     * Initialize the script
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                processAllLinks();
                setupObserver();
            });
        } else {
            processAllLinks();
            setupObserver();
        }

        // Also process links on page load as a fallback
        window.addEventListener('load', processAllLinks);
    }

    // Start the script
    init();
})();
