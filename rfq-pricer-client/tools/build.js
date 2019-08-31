import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';
console.log(chalk.blue('Generating minified bundle...'));

webpack(webpackConfig).run((err, stats) => {
  if(err) {
    console.log(chalk.red(err));
    return 1;
  }

  const result = stats.toJson();
  console.log('RESULT: ');
  console.log('ERRORS: ' + result.errors);
  console.log('WARNINGS: ' + result.warnings);

  return 0;
});
