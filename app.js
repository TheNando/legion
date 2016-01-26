angular
    .module('legionApp', ['ngMaterial'])

    .controller('DeckCtrl', function () {
        var vm = this;

        vm.troops = troops;
        vm.getRange = function (ary) {
            return `${Math.min(...ary)}-${Math.max(...ary)}`;
        }
    });
