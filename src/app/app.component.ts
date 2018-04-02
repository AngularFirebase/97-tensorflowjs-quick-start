import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawableDirective } from './drawable.directive';

import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  linearModel: tf.Sequential;
  prediction: any;

  model: tf.Model;
  predictions: any;

  @ViewChild(DrawableDirective) canvas;

  ngOnInit() {
    this.trainNewModel();
    this.loadModel();
  }


  async trainNewModel() {
      // Define a model for linear regression.
    this.linearModel = tf.sequential();
    this.linearModel.add(tf.layers.dense({units: 1, inputShape: [1]}));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});


    // Training data, completely random stuff
    const xs = tf.tensor1d([3.2, 4.4, 5.5, 6.71, 6.98, 7.168, 9.779, 6.182, 7.59, 2.16, 7.042, 10.71, 5.313, 7.97, 5.654, 9.7, 3.11]);
    const ys = tf.tensor1d([1.6, 2.7, 2.9, 3.19, 1.684, 2.53, 3.366, 2.596, 2.53, 1.22, 2.87, 3.45, 1.65, 2.904, 2.42, 2.4, 1.31]);


    // Train
    await this.linearModel.fit(xs, ys)

    console.log('model trained!')
  }

  linearPrediction(val) {
    const output = this.linearModel.predict(tf.tensor2d([val], [1, 1])) as any;
    this.prediction = Array.from(output.dataSync())[0]
  }



  //// LOAD PRETRAINED KERAS MODEL ////

  async loadModel() {
    this.model = await tf.loadModel('/assets/model.json');
  }

  async predict(imageData: ImageData) {

    const pred = await tf.tidy(() => {

      // Convert the canvas pixels to 
      let img = tf.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = this.model.predict(img) as any;

      // Save predictions on the component
      this.predictions = Array.from(output.dataSync()); 
    });

  }

}

