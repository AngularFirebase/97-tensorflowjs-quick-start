# Tensorflow.js MNIST Angular Demo

Watch the [screencast](https://angularfirebase.com/lessons)

This demo imports an MNIST ConvNet trained in Keras Python, then makes predictions with TensorFlow.js

- clone it, cd into it, `npm install && ng serve`

## Use a Different Keras Model

```
tensorflowjs_converter --input_format keras keras/yourWeights.h5 src/assets
```