/* Cut & Hire — Our Work / Shorts-Reels placement.
   Keep the existing thumbnail, hover-preview and YouTube popup data intact.
   Desktop order: Short8403930367, Video8393222, Video339393,
   Video44554, short2741313123329039446702190. */
(function () {
  'use strict';
  var installed = false;
  var attempts = 0;
  var maxAttempts = 24;
  var additions = [
    {
      cat: ['shorts'],
      title: 'Video8393222',
      src: 'assets/videos/Video8393222.mp4',
      thumb: 'assets/images/Video8393222.png',
      isPhoto: false,
      youtubeUrl: 'https://youtube.com/shorts/HiowiMiYMk4?feature=share',
      youtubeEmbed: 'https://www.youtube.com/embed/HiowiMiYMk4?autoplay=1&rel=0&playsinline=1&modestbranding=1'
    },
    {
      cat: ['shorts'],
      title: 'Video339393',
      src: 'assets/videos/Video339393.mp4',
      thumb: 'assets/images/Video339393.png',
      isPhoto: false,
      youtubeUrl: 'https://youtube.com/shorts/qSVo267uhkw?feature=share',
      youtubeEmbed: 'https://www.youtube.com/embed/qSVo267uhkw?autoplay=1&rel=0&playsinline=1&modestbranding=1'
    },
    {
      cat: ['shorts'],
      title: 'Video44554',
      src: 'assets/videos/Video44554.mp4',
      thumb: 'assets/images/Video44554.png',
      isPhoto: false,
      youtubeUrl: 'https://youtube.com/shorts/czFRpkzW07Q?feature=share',
      youtubeEmbed: 'https://www.youtube.com/embed/czFRpkzW07Q?autoplay=1&rel=0&playsinline=1&modestbranding=1'
    }
  ];

  function isShort(item) {
    return item && Array.isArray(item.cat) && item.cat.includes('shorts');
  }
  function fileName(item) {
    return item && String(item.src || '').split('/').pop().toLowerCase();
  }
  function install() {
    if (installed) return;
    if (typeof works === 'undefined' || !Array.isArray(works) ||
        typeof renderWork !== 'function' || typeof mobilePortfolioLimit !== 'function') {
      if (++attempts < maxAttempts) window.setTimeout(install, 150);
      else console.warn('[Cut & Hire] Shorts reorder: original portfolio script is missing.');
      return;
    }
    installed = true;

    var anchor = works.find(function (item) { return fileName(item) === 'short8403930367.mp4'; });
    var target = works.find(function (item) { return fileName(item) === 'short2741313123329039446702190.mp4'; });
    if (!anchor || !target) {
      console.warn('[Cut & Hire] Shorts reorder: a required original video was not found.');
      return;
    }

    // The anchor originally ends the 8-card desktop row. Reposition an existing
    // later short in front of it so the requested five-video sequence begins
    // on the following row, rather than being broken across two rows.
    var shortsBefore = works.filter(isShort);
    var anchorShortIndex = shortsBefore.indexOf(anchor);
    if (anchorShortIndex % 8 === 7) {
      var targetShortIndex = shortsBefore.indexOf(target);
      var filler = shortsBefore[targetShortIndex + 1];
      if (filler && filler !== anchor && filler !== target) {
        works.splice(works.indexOf(filler), 1);
        works.splice(works.indexOf(anchor), 0, filler);
      }
    }

    // Remove old copies before placing the block, so refresh/re-initialization
    // never creates duplicates or loses the original target's video metadata.
    additions.forEach(function (newItem) {
      var duplicateIndex = works.findIndex(function (item) { return item && item.src === newItem.src; });
      if (duplicateIndex !== -1) works.splice(duplicateIndex, 1);
    });
    works.splice(works.indexOf(target), 1);
    works.splice.apply(works, [works.indexOf(anchor) + 1, 0].concat(additions, [target]));

    // Show all existing and new Shorts/Reels on mobile, preserving earlier videos.
    var previousMobileLimit = mobilePortfolioLimit;
    mobilePortfolioLimit = function (cat) {
      if (cat === 'shorts') return Math.max(previousMobileLimit(cat), works.filter(isShort).length);
      return previousMobileLimit(cat);
    };

    var grid = document.getElementById('work-grid');
    if (grid && grid.dataset.cat === 'shorts') {
      renderWork(works.filter(isShort), 'shorts');
    }
  }
  install();
})();
