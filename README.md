# -sticky-table-header 

[![Build Status](https://travis-ci.org/solnetdigital/solnet-angular-sticky-table-header.svg?branch=master)](https://travis-ci.org/solnetdigital/solnet-angular-sticky-table-header) [![Code Climate](https://codeclimate.com/github/solnetdigital/solnet-angular-sticky-table-header/badges/gpa.svg)](https://codeclimate.com/github/solnetdigital/solnet-angular-sticky-table-header) [![Test Coverage](https://codeclimate.com/github/solnetdigital/solnet-angular-sticky-table-header/badges/coverage.svg)](https://codeclimate.com/github/solnetdigital/solnet-angular-sticky-table-header)

A directive that provides a very basic implementation of a "sticky header" for HTML tables. Designed to work in IE9+, and all the proper browsers.

## Dependencies

 - angularjs
 
## Usage

### HTML

```HTML
<html>
  <head>
    <link rel="stylesheet" href="sn-sticky-table-header.css" />
  </head>
  <body ng-app="yourApp">
    <table sn-sticky-table-header>
      ...
    <table>
    
    <script src="sn-sticky-table-header.js"></script>
  </body>
</html>
```

### JS

```JavaScript
angular.module('yourApp', ['solnetAngularStickyTableHeader']);
```
