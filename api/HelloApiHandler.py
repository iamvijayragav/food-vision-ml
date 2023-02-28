import numpy
from flask_restful import Resource 
from flask import  request, jsonify
from tensorflow import keras
import tensorflow as tf
import os

def load_and_prep_image(img, img_shape=224, scale=True):
  # Decode it into a tensor
  img = tf.image.decode_jpeg(img)
  # Resize the image
  img = tf.image.resize(img, [img_shape, img_shape])
  if scale:
    # Rescale the image (get all values between 0 and 1)
    return img/255.
  else:
    return img



class HelloApiHandler(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Hello Api Handler"
      }

  def post(self):
   
    files = request.files

    file = files.get('file')

    target = os.path.join('D:/reactFlaskTutorial','temp/')

    file.save("".join([target,file.filename]))

    target=os.path.join('D:/reactFlaskTutorial','temp/'+file.filename)

    img = tf.io.read_file(target)

    img = tf.image.decode_jpeg(img)

    img = tf.image.resize(img, [224, 224])

    img = tf.expand_dims(img, axis=0)

    model = keras.models.load_model('hello.h5')

    pred =  model.predict(img)

    index = numpy.argmax(pred)

    classes = ['chicken_curry',
              'chicken_wings',
              'fried_rice',
              'grilled_salmon',
              'hamburger',
              'ice_cream',
              'pizza',
              'ramen',
              'steak',
              'sushi']

    print(classes[index])

    os.remove(target)

    return jsonify({'msg': 'success','pred':classes[index]})