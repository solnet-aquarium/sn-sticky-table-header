# solnet-angular-sticky-table-header [![Build Status](https://travis-ci.org/solnetdigital/solnet-angular-sticky-table-header.svg)](https://travis-ci.org/solnetdigital/solnet-angular-sticky-table-header.svg)

A directive that provides a very basic implementation of a "sticky header" for HTML tables. Designed to work in IE9+, and all the proper browsers.

## Dependencies

 - angularjs
 
## Usage

### HTML

```HTML
<html>
  <head>
    <link rel="stylesheet" href="solnet-angular-sticky-table-header.css" />
  </head>
  <body ng-app="yourApp">
    <table solnet-angular-sticky-table-header>
      ...
    <table>
    
    <script src="solnet-angular-sticky-table-header.js"></script>
  </body>
</html>
```

### JS

```JavaScript
angular.module('yourApp', ['solnetAngularStickyTableHeader']);
```
