module.exports = {
  root: true,
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-html/vue',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss'
  ],
  rules: {
    'declaration-property-value-no-unknown': true,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'function',
          'if',
          'each',
          'include',
          'mixin',
          'tailwind',
          'extend',
          'variants',
          'apply',
          'responsive',
          'screen'
        ]
      }
    ],
    'font-family-name-quotes': 'always-where-required',
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports'
        },
        {
          type: 'at-rule',
          name: 'media'
        },
        'rules'
      ],
      {
        severity: 'warning'
      }
    ],
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ]
  },
  ignoreFiles: ['dist/*.css']
};
