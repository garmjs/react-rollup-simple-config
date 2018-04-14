# React Rollup simple config
Set-up a React component library with Rollup

## Why Rollup?
Firstly, it is the tool that [Facebook uses to build the React ecosystem](https://reactjs.org/blog/2017/12/15/improving-the-repository-infrastructure.html#migrating-to-rollup).  In actual usage, I have noticed between a 5-15x smaller bundle size vs Webpack without any degredation in functionality or speed.  It is also much easier to configure and maintain.

### Install for development
```
git clone https://github.com/garmjs/react-rollup-simple-config.git
npm install
npm run storybook
```

### Production Build
* `npm run build`
