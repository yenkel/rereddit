app.directive('postFocus', function ($timeout) {
  return function (scope, elem, attrs) {
    console.log(attrs);
    scope.$watch(attrs.postFocus, function (newVal) {
      console.log(newVal);
      if (newVal) {
        $timeout(function () {
          console.log('hey!');
          console.log(elem);
          elem[0].focus();
        }, 0, false);
      }
    });
  };
});

