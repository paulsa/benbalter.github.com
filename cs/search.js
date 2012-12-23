// Generated by CoffeeScript 1.4.0
(function() {

  jQuery(document).ready(function($) {
    var findEntries;
    findEntries = function(q) {
      var content, matches, rq;
      matches = [];
      rq = new RegExp(q, "im");
      $.each(entries.posts, function(k, post) {
        if (rq.test(post.title) || rq.test(post.url) || rq.test(post.description) || rq.test(post.content) || rq.test(post.tags) || rq.test(post.category)) {
          return matches.push({
            title: post.title,
            url: post.url,
            date: post.date
          });
        }
      });
      $("body").addClass("search");
      content = $("#content");
      content.append("<h3>Search Results</h3>");
      if (matches.length > 0) {
        content.append("<ul class=\"search-results\">");
        $.each(matches, function(key, match) {
          return content.append("<li><a href=\"" + match.url + "\">" + match.title + "</a></li>");
        });
        content.append("</ul>");
      } else {
        content.append("<div class=\"no-search-results\">No matches found</div>");
      }
      return content.append("<a href=\"#\" id=\"back\">Back</a>");
    };
    $("#search_form").live("submit", function(e) {
      var query;
      e.preventDefault();
      query = $("#query").val();
      window.location.hash = "q=" + escape(query.replace(/\s/g, "+"));
      return false;
    });
    $(window).bind("hashchange", function(e) {
      var oldhtml, query;
      query = window.location.hash;
      if (/[#?]{1}q=(.*)/.test(query)) {
        query = window.location.hash.replace("+", " ").replace("#q=", "");
        $("#query").val(query);
        if (query) {
          if (typeof oldhtml === "undefined") {
            oldhtml = $("#content").html();
          }
          $("#content").html("<div id=\"loader\"></div>");
          $("#query").blur().attr("disabled", true);
          if (typeof entries === "undefined") {
            $.getJSON("{{ site.url }}/posts.json", function(data) {
              var entries;
              entries = data;
              return findEntries(query);
            });
          } else {
            findEntries(query);
          }
          $("#query").blur().attr("disabled", false);
        }
        return _gaq.push(["_trackEvent", "Search", "Search", query]);
      } else {
        if (typeof oldhtml === "undefined") {
          oldhtml = $("#content").html();
        }
        $("body").removeClass("search");
        $("#content").html(oldhtml);
        $("#query").blur().attr("disabled", false).val("");
        return _gaq.push(["_trackEvent", "Search", "Back", query]);
      }
    });
    return $(window).trigger("hashchange");
  });

}).call(this);
