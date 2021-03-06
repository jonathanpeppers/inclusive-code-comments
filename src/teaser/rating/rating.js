/*! (C) Copyright 2020 LanguageTooler GmbH. All rights reserved. */
class RatingTeaser {
    constructor(e, t, r) {
        (this._container = e), (this._componentName = t), (this._url = r), (this._storageController = StorageController.create());
    }
    _translate() {
        translateSection(this._container);
        const e = document.querySelector("#review-headline");
        BrowserDetector.isFirefox()
            ? translateElement(e, "reviewFirefoxHeadline")
            : BrowserDetector.isOpera()
            ? translateElement(e, "reviewOperaHeadline")
            : BrowserDetector.isEdge()
            ? translateElement(e, "reviewEdgeHeadline")
            : BrowserDetector.isSafari()
            ? translateElement(e, "reviewSafariHeadline")
            : translateElement(e, "reviewChromeHeadline");
    }
    _observe() {
        const e = this._container.querySelector("[data-lt-emotion=like]"),
            t = this._container.querySelector("[data-lt-emotion=dislike]");
        e.addEventListener("click", () => this._sendRating("like")),
            t.addEventListener("click", () => this._sendRating("dislike")),
            this._link.addEventListener("click", () => {
                Tracker.trackEvent("Action", "dialog:rating_teaser:click");
            });
    }
    _sendRating(e) {
        Tracker.trackEvent("Stat", `rating:${LanguageManager.getPrimaryLanguageCode(navigator.language)}`, e),
            this._storageController.updateStatistics({ ratingValue: e }),
            this._storageController.updateUIState({ hasRated: !0 }),
            "like" === e
                ? BrowserDetector.isChrome() || BrowserDetector.isFirefox() || BrowserDetector.isOpera() || BrowserDetector.isEdge() || BrowserDetector.isSafari()
                    ? this._showReviewContainer()
                    : this._showThanksContainer()
                : "dislike" === e && (this._showThanksContainer(), this._openFeedbackForm(i18nManager.getMessage("ratingUnhappyQuestion")), Tracker.trackEvent("Stat", "dislike_host", getCurrentDomain()));
    }
    _showReviewContainer() {
        this._element.classList.remove("lt-rating-teaser--thanks-visible"), this._element.classList.add("lt-rating-teaser--review-visible");
    }
    _showThanksContainer() {
        this._element.classList.remove("lt-rating-teaser--review-visible"), this._element.classList.add("lt-rating-teaser--thanks-visible");
    }
    _openFeedbackForm(e) {
        EnvironmentAdapter.openFeedbackForm(this._url, e);
    }
    // Removed rating UI
    render() {
    //     loadStylesheet("/teaser/rating/rating.css"),
    //         loadHTML("/teaser/rating/rating.html").then((e) => {
    //             (this._container.innerHTML = e),
    //                 (this._element = this._container.querySelector("#rating-teaser")),
    //                 (this._link = this._container.querySelector("#rating-teaser-link")),
    //                 BrowserDetector.isChrome()
    //                     ? (this._element.classList.add("lt-rating-teaser--chrome"), (this._link.href = "https://chrome.google.com/webstore/detail/grammar-and-spell-checker/oldceeleldhonbafppcapldpdifcinji/reviews"))
    //                     : BrowserDetector.isFirefox()
    //                     ? (this._element.classList.add("lt-rating-teaser--firefox"), (this._link.href = "https://addons.mozilla.org/firefox/addon/languagetool/"))
    //                     : BrowserDetector.isOpera()
    //                     ? (this._element.classList.add("lt-rating-teaser--opera"), (this._link.href = "https://addons.opera.com/extensions/details/grammar-and-spell-checker-languagetool/"))
    //                     : BrowserDetector.isEdge()
    //                     ? (this._element.classList.add("lt-rating-teaser--edge"), (this._link.href = "https://microsoftedge.microsoft.com/addons/detail/hfjadhjooeceemgojogkhlppanjkbobc"))
    //                     : BrowserDetector.isSafari() && (this._element.classList.add("lt-rating-teaser--safari"), (this._link.href = "https://appstoreconnect.apple.com/apps/1534275760/appstore")),
    //                 this._translate(),
    //                 this._observe(),
    //                 Tracker.trackEvent("Action", `${this._componentName}:rating_teaser`);
    //         });
    }
}
