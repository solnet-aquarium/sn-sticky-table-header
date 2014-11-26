module.exports = function(config) {
    config.set({
            files: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/angular/angular.js',
                'bower_components/angular-mocks/angular-mocks.js',
                'src/solnet-angular-sticky-table-header.js',
                'test/unit/**/*.js'
        ],
        autoWatch: true,
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage'],
        preprocessors: {
            'src/**/*.js': ['coverage']
        },
        plugins: [
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
        coverageReporter: {
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' }
        ]
        }
    });
    };
