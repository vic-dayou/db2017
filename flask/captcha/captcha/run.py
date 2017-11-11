from image import ImageCaptcha
import random
import string
def run():
  seed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  sa = []
  for i in range(8):
    sa.append(random.choice(seed))
    salt = ''.join(sa)
#print salt
  img = ImageCaptcha()
  img1 = img.generate_image(salt)
  img1.save("captcha.jpg")
#  with open("captcha.jpg",'wb') as f:
#    f.write(data)
if __name__ == '__main__':
  run()
