describe("jquery.gaEventTracker", function() {
  beforeEach(function() {
    $('#fixture').remove();
    $('body').append($('<a>', {
      'class': 'tracktest',
      id: 'fixture',
      'data-category': 'cat',
      'data-label': 'lbl',
      'data-action': 'act'
    }));
  });
  describe("no args", function() {
    var ga;
    beforeEach(function() {
      ga = []
      spyOn(ga, 'push');
      $('a.tracktest').gaEventTracker(ga);
    });
    it("click tracks the category, label and action data section", function() {
      $('a.tracktest').trigger('click');
      expect(ga.push).toHaveBeenCalledWith(['_trackEvent', 'cat', 'act', 'lbl']);
    });
  });
  describe("with functions", function() {
    var ga = [], gcat = null;
    beforeEach(function() {
      spyOn(ga, 'push');
      gCat = jasmine.createSpy('getCategory').andReturn('the category');
      $('a.tracktest').gaEventTracker(ga, gCat, gCat, gCat);
    });
    it("click tracks the category, label and action using the functions", function() {
      $('a.tracktest').trigger('click');
      expect(gCat).toHaveBeenCalled();
      expect(gCat.callCount).toEqual(3);
      expect(ga.push).toHaveBeenCalledWith(['_trackEvent', 'the category', 'the category', 'the category']);
    });
  });
  describe("with values", function() {
    var ga;
    beforeEach(function() {
      ga = []
      spyOn(ga, 'push');
      $('a.tracktest').gaEventTracker(ga, 'a', 'b', 'c');
    });
    it("click tracks the category, label and action using the values", function() {
      $('a.tracktest').trigger('click');
      expect(ga.push).toHaveBeenCalledWith(['_trackEvent', 'a', 'b', 'c']);
    });
  });
  describe("with partial arguments", function() {
    var ga;
    beforeEach(function() {
      ga = [];
      spyOn(ga, 'push');
      $('a.tracktest').removeAttr('data-label');
      $('a.tracktest').gaEventTracker(ga, 'a');
    });
    it("click tracks the category, label and action using defaults where necessary", function() {
      $('a.tracktest').trigger('click');
      expect(ga.push).toHaveBeenCalledWith(['_trackEvent', 'a', 'act', 'empty']);
    });
  });
});
