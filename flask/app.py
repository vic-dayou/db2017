from flask import Flask,render_template 
from flask import request,session
from db import session,User
import hashlib
from flask import jsonify
from io import BytesIO
from utils.image import ImageCaptcha
import random
import redis
from myredis import redisClient
app = Flask(__name__)

@app.route('/')

def hello_flask(name=None):
  return render_template('index.html',name=name)

@app.route('/api/register',methods=['POST'])
def resgister():
  err=None
  if request.method == 'POST':
    dictData = request.get_json()
    result = session.query(User).filter(User.username == dictData['name']).first()
    if result:
      return jsonify({"errno":"0","errmsg":"user name has exist"})
    name = dictData['name']
    email = dictData['email']
    passwd = dictData['pwd']
    pwd = hashlib.md5(passwd).hexdigest()
    data = User(username=name,passwd=pwd,email=email)
    session.add(data)
    session.commit()
  return render_template('register.html')

@app.route('/api/captcha',methods=['GET'])
def captcha():
  seed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  sa = []
  for i in range(4):
    sa.append(random.choice(seed))
    salt = ''.join(sa)
  img1 = ImageCaptcha()
  img = img1.generate_image(salt)
  buf = BytesIO()
  img.save(buf, 'jpeg')
  preImgCode = request.args.get("pcode")
  ImgCode = request.args.get("codeid")
  redisClient.set(ImgCode,salt.lower(),120)
  redisClient.delete(preImgCode)
  buf_str = buf.getvalue()
  response = app.make_response(buf_str)
  response.headers['Content-Type'] = 'image/gif'
  #session['img'] = salt.upper()
  return response
@app.route('/api/checkCaptcha',methods=['POST'])
def checkCaptcha():
  preData = request.get_json()
  imgValue = preData['data']
  imgCode = preData['imgcode']
  if redisClient.get(imgCode):
    if  imgCode.lower() ==  redisClient.get(imgCode):
     return jsonify({"errno":0,"errmsg":""})
    else:
     return jsonify({"errno":1,"errmsg":"captcha error"})
  else:
    return jsonify({"errno":2,"errmsg":"captcha timeout"})                   
if __name__ == '__main__':
	app.run(host='0.0.0.0',port=8000,debug=True)
