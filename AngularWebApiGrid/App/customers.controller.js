(function () {
    'use strict';

    angular
        .module('app')
        .controller('CustomersController', CustomersController);

    CustomersController.$inject = ['$scope', 'Restangular', 'ngTableParams'];

    function CustomersController($scope, Restangular, ngTableParams) {
        /* jshint validthis:true */
        var vm = this;

        vm.search = '';

        vm.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                lastName: 'asc'
            }
        },
        {
            getData: function ($defer, params) {
                // Load the data from the API
                Restangular.all('customers').getList({
                    pageNo: params.page(),
                    pageSize: params.count(),
                    sort: params.orderBy(),
                    search: vm.search
                }).then(function (customers) {
                    // Tell ngTable how many records we have (so it can set up paging)
                    params.total(customers.paging.totalRecordCount);

                    // Return the customers to ngTable
                    $defer.resolve(customers);
                }, function (response) {
                    // Notify of error
                });
            }
        });

        // Watch for changes to the search text, so we can reload the table
        $scope.$watch(angular.bind(vm, function () {
            return vm.search;
        }), function (value) {
            vm.tableParams.reload();
        });
    }
})();