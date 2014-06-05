var devLibs = [
  'vendor/jquery/dist/jquery.js',
  'vendor/handlebars/handlebars.runtime.js',
  'vendor/ember/ember.js'
];

var distLibs = [
  'vendor/jquery/dist/jquery.min.js',
  'vendor/handlebars/handlebars.runtime.min.js',
  'vendor/ember/ember.min.js'
];

var emberFiles = [
  'app.js',
  'router.js',
  'utils/**/*.js',
  'initializers/**/*.js',
  'models/**/*.js',
  'routes/**/*.js',
  'controllers/**/*.js',
  'helpers/**/*.js',
  'views/**/*.js',
  'components/**/*.js',
];

var config = {

  concat: {
    devLibs: {
      files: [ {src: devLibs, dest: 'tmp/lib.js'} ]
    },

    distLibs: {
      files: [ {src: distLibs, dest: 'tmp/lib.js'} ]
    },

    app: {
      files: [ {src: emberFiles, dest: 'tmp/app.js'} ]
    },

    dev: {
      files: [ {src: ['tmp/app.js'], dest: 'tmp/build.js'} ]
    }
  },

  emberTemplates: {
    compile: {
      files: [ {src: 'app/templates/**/*.hbs', dest: 'tmp/templates.js'} ]
    }
  },

  watch: {
    dev: {
      files: ['app/**/*.js', 'app/templates/**/*.hbs'],
      tasks: ['buildApp']
    }
  }

};

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');


  // grunt.registerTask('copyLibs', function() {
  //   grunt.file.copy('tmp/lib.js', jsDest);
  // });
  // grunt.registerTask('copyBuild', function() {
  //   grunt.file.copy('tmp/build.js', jsDest);
  // });
  grunt.registerTask('buildDevLibs', [
    'concat:devLibs'
    // 'copyLibs'
  ]);
  grunt.registerTask('buildDistLibs', [
    'concat:distLibs'
    // 'copyLibs'
  ]);
  grunt.registerTask('buildApp', ['emberTemplates:compile', 'concat:app', 'concat:dev',
    // 'copyBuild'
  ]);
  grunt.registerTask('dev', ['buildDevLibs', 'watch:dev']);
};
