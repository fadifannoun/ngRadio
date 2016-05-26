# ngRadio
Ready-To-Use ngRadio

# Install
bower install ngRadio

# Options & Documentations
Working on

# Usage
Include ngRadio.min.js in your index.html
`<script src="path/to/ngRadio.min.js"></script>

Include the following code snippet anywhere in your code

`<ng-radio nrg-source={{ yourStationList }}></ng-radio>`

Where `yourSationList` is your radio stations var, your may init it from a controller like this

```
angular.module('Radios.controllers',[]).controller('StationsController', function($scope){
  $scope.yourStationList = [
    {
      name: 'First Station Name',
      url: 'url-to-online-streaming'
    },
    {
      name: 'Second Station Name',
      url: 'url-to-online-streaming'
    }
  ];
});
```
Note that each object of the list should have a `name` and `url`
