(function(){
                  var image = document.getElementById('reels-pricing-fresh-image');
                  if (!image) return;
                  image.src = 'assets/images/reels.jpg?fresh=' + Date.now();
                })();
