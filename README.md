# jQuery Plugin to simplify Google Events tracking

Use this plugin to quickly and easily tie in to Google Analytics Events.  Event data can be stored 
in the target element in data- bits, or it can be passed in to the method on initialization, or 
it can be passed in as methods to compute the values when the tracker fires.

## Usage

Include the source (either Coffeescript or Javascript file) in your application.  Then given the following DOM elements,

    <a class="trackit default" data-category="my category" data-label="my label" data-action="my action'>track this link</a>
    <a class="trackit with-values">track with values</a>
    <a class="trackit with-functions" id="thislink">track with functions</a>

You might add (initialize) the plugin like this (in your javascript onload):

    // to use the data values from the tag
    $('.trackit.default').gaEventTracker()

    // to specify values
    $('.trackit.with-values').gaEventTracker('This Category', 'This Label', 'This Action')

    // to specify functions
    var getCategory = function() { return this.innerHTML; }
    $('.trackit.with-functions').gaEventTracker(getCategory)

If you send in a function, but the result is null or undefined, we'll use the default value of 'empty'.

This assumes you already have Google Analytics' script tag setup in your app/page.  Read more about Google Analytics setup [here](See https://support.google.com/analytics/answer/1008080?hl=en&utm_medium=et&utm_campaign=en_us&utm_source=SetupChecklist)

## Building 

If you care to make modifications, the `compile.sh` script has been included to compile the Javascript from the Coffeescript.

## Contributions

Feel free to fork, add your ideas and submit a pull request.  If you do, please update the tests in the `spec` directory.  You'll notice the `specRunner.html` file which should run the tests for you using Jasmine.

## TODO

* add other event listeners other than 'click' - maybe 'blur', 'focus', 'mouseover' (?)
