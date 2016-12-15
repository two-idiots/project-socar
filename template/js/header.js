/**
* myHeader Module
*
* Description
*/
angular.module('header', []).
directive('myHeader', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			title : '='
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '<div class="header-container"><h1><span>{{title}}</span><div safe></div></h1><p class="prev"><a href="javascript:history.back();">이전</a></p><!-- //header --></div>',
		templateUrl: '../template/html/header.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});