//Visit this for jshint -https://github.com/jshint/jshint/blob/4c2d091b7e50ce2681ee48a104578bb969c189ae/examples/.jshintrc#L79

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        yamlToJson: {
            your_target: {
                options: {
                    //                ignored: /^_/,
                    space: 4,
                    customTypes: {
                        '!include scalar': function (value, yamlLoader) {
                            return yamlLoader(value);
                        },
                        '!max sequence': function (values) {
                            return Math.max.apply(null, values);
                        },
                        '!extend mapping': function (value, yamlLoader) {
                            return _.extend(yamlLoader(value.basePath), value.partial);
                        }
                    }
                },
                files: [
                    { src: ['api/swagger/*.yaml'], dest: 'api/dist/swagger.json' }
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-yaml');
    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'yaml'
    ]);
};
