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
});

