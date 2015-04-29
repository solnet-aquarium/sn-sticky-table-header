describe('sn-sticky-table-header', function() {
  beforeEach(function() {
    browser.get('http://localhost:8080/demo/index.html');
  });

  it('should ensure the secondary thead is visible when the original is scrolled off the screen', function() {
    expect(element.all(by.css('.sn-sticky-table__clone--visible')).count()).toBe(0);
    browser.executeScript('window.scrollTo(0, 250);').then(function() {
      expect(element.all(by.css('.sn-sticky-table__clone--visible')).count()).toBe(1);
    });
  });

  it('should display the "scroll to top" button when the secondary thead is visible and hovered', function() {
    var secondaryThead = element.all(by.css('.sn-sticky-table__clone--visible'));
    var scrollToTopButton = element.all(by.css('.sn-sticky-table__clone__scroll-button'));
    browser.actions()
      .mouseMove(secondaryThead.get(0))
      .perform();

    expect(scrollToTopButton.count()).toEqual(0);
  });

  it('should scroll to top when "scroll to top" button is clicked', function() {
    var secondaryThead = element.all(by.css('.sn-sticky-table__clone--visible'));
    var scrollToTopButton = element.all(by.css('.sn-sticky-table__clone__scroll-button'));

    browser.actions()
      .mouseMove(secondaryThead.get(0))
      .perform();
    browser.actions()
      .mouseClick(secondaryThead.get(0))
      .perform();

    browser.executeScript('return window.pageYOffset').then(function(yPosition) {
      expect(yPosition).toEqual(0);
    });
  });
});

