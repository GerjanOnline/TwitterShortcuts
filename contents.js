if(! openLinks) {
	var openLinks = function(e) {
		var tag = e.target.tagName.toLowerCase();

		// do not execute when in an input field or keyCode is not 'o'
		if (tag == 'input' || tag == 'textarea' || e.keyCode != 79){
			return true;
		}

		// get the links
		var linksToOpen = getLinks();

		// open all links (so can be 0-more)
		for(i = 0; i < linksToOpen.length; i++) {
			var url = linksToOpen[i].getAttribute("href");
			chrome.extension.sendMessage({ "url" : url });
		}
	};
}

if(! getLinks) {
	var getLinks = function(){
			var selOriginalTweetText = "#stream-items-id .hovered-stream-item .original-tweet .js-tweet-text ";

			// first try website links
			var links = document.querySelectorAll(selOriginalTweetText + '.twitter-timeline-link');
			if(links.length){ return links; }

			// second users / mentions
			var users = document.querySelectorAll(selOriginalTweetText + '.twitter-atreply');
			if (users.length) { return prefixLinks(users); }

			// third hashtags
			var hashtags = document.querySelectorAll(selOriginalTweetText + '.twitter-hashtag');
			if (hashtags.length) { return prefixLinks(hashtags); }

			// if above resulted in nothing, try pretty-links (in fact all links in a tweet will have this class)
			var others = document.querySelectorAll(selOriginalTweetText + '.pretty-link');
			if (others.length) { return prefixLinks(others); }

			// no links
			return [];
		};
}

if(! prefixLinks){
	var prefixLinks = function(arrLinks){
		for(i = 0; i < arrLinks.length; i++) {
			arrLinks[i].setAttribute("href", "http://www.twitter.com/" + arrLinks[i].getAttribute("href"));
			console.log(arrLinks[i]);
		}

		return arrLinks;
	};
}

document.addEventListener("keydown", openLinks, true);