# solnet-angular-sticky-table-header

A directive that provides a very basic implementation of a "sticky header" for HTML tables. Designed to work in IE9+.

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
