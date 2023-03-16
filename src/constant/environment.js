import _ from 'lodash';

const Env = {
  dev: 'dev',
  prod: 'prod',
};

Env.all = _.transform(
  Env,
  function(result, value, key) {
    result.push(value);
  },
  [],
);

export default Env;
