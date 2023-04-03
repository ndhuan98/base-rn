module.exports = {
  root: true,
  extends: '@react-native',
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js','.jsx','.ts','.tsx','.json']
      }
    }
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
};
