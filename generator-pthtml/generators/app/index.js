'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      '欢迎使用 ' + chalk.red('Pthtml') + ' 生成器!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: '你想去使用这个配置吗？',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {

    src: function () {
      var aDir = ['src', 'src/css', 'src/images', 'src/css', 'src/js', 'src/sass'];
      var _this = this;  
      aDir.forEach(function (i) {
        _this.mkdir(i);
        _this.fs.copy(
          _this.templatePath(i),
          _this.destinationPath(i)
        );
      })
    },
    app: function () {
    
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copy(
        this.templatePath('_Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    }
  },

  install: function () {
    this.installDependencies({
        callback: function () {
          console.log('安装完毕！');
        }
    });
  }
});
