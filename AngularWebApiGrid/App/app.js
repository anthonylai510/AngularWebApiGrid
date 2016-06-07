(function () {
    'use strict';

    angular.module('app', [
        // Angular modules 

        // Custom modules 

        // 3rd Party Modules
        'restangular',
        'ngTable'
    ])
    .config(restangularConfig);

    restangularConfig.$inject = ['RestangularProvider'];

    function restangularConfig(RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');

        RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            var extractedData;
            // .. to look for getList operations
            if (operation === "getList") {
                // .. and handle the data and meta data
                extractedData = data.items;
                extractedData.paging =
                {
                    pageCount: data.pageCount,
                    pageNo: data.pageNo,
                    pageSize: data.pageSize,
                    totalRecordCount: data.totalRecordCount
                };
            } else {
                extractedData = data;
            }
            return extractedData;
        });
    };


})();