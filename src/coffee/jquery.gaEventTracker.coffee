# jQuery Plugin to simplify Google Events tracking
#
# Event data can be stored in the target element in data- bits, or it can be passed in to the method
# on initialization, or it can be passed in as methods to compute the values when the tracker fires.
#
# Given the following DOM elements,
#
#  <a class="trackit default" data-category="my category" data-label="my label" data-action="my action'>track this link</a>
#  <a class="trackit with-values">track with values</a>
#  <a class="trackit with-functions" id="thislink">track with functions</a>
#
# You might add (initialize the plugin like this):
#
#  _gaq = window._gaq || []
#
#  // to use the data values from the tag
#  $('.trackit.default').gaEventTracker(_gaq)
#
#  // to specify values
#  $('.trackit.with-values').gaEventTracker(_gaq, 'This Category', 'This Label', 'This Action')
#
#  // to specify functions
#  var getCategory = function() { return this.innerHTML; }
#  $('.trackit.with-functions').gaEventTracker(_gaq, getCategory)
#
#  If you send in a function, but the result is null or undefined, we'll use the default value of 'empty'.
#
#  Author: Jon Rogers <jon@bunnymatic.com>
#  Github: https://github.com/bunnymatic

$.fn.gaEventTracker = (gaq, category, action, label) ->

  getCategory = () ->
    $(this).data 'category'
  getAction = () ->
    $(this).data 'action'
  getLabel = () ->
    $(this).data 'label'

  @each ->
    $(this).bind "click", (ev) ->
      target = this
      category ||= getCategory
      action ||= getAction
      label ||= getLabel
      args = $.map([category, action, label], (entry) ->
        console.log entry
        if typeof entry is "function"
          try
            val = entry.apply(target)
          val || 'empty'
        else
          entry
      )
      gaq.push ["_trackEvent", args[0], args[1], args[2]]
      true
