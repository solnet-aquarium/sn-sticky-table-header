# sn-sticky-table-header

[![Circle CI](https://circleci.com/gh/solnetdigital/sn-sticky-table-header.svg?style=svg)](https://circleci.com/gh/solnetdigital/sn-sticky-table-header)
[![Code Climate](https://codeclimate.com/github/solnetdigital/sn-sticky-table-header/badges/gpa.svg)](https://codeclimate.com/github/solnetdigital/sn-sticky-table-header) 
[![Test Coverage](https://codeclimate.com/github/solnetdigital/sn-sticky-table-header/badges/coverage.svg)](https://codeclimate.com/github/solnetdigital/sn-sticky-table-header)

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
angular.module('yourApp', ['snStickyTableHeader']);
```
