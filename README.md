# ngRadio
Ready-To-Use ngRadio

ngRadio is a simple Angular Directive serving as Online Radio Player, you can provide the directive with your radio stations as an array, and then you are ready to go. Sometime your client request online radio player for their Apps or websites and what you need - like me - is a self-contained and reusable module like this. 

# Install
bower install ngRadio

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

# Options & Documentations
Working on
