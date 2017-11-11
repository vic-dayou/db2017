from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column,String,Integer
from sqlalchemy.orm import sessionmaker 
engine = create_engine('mysql+pymysql://yuhia:123456@172.17.0.2:3306/blog?charset=utf8')
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()
class User(Base):
  __tablename__ = "users"
  id = Column(Integer,primary_key=True)
  username = Column(String(64),nullable=False,index=True)
  passwd = Column(String(128),nullable=False)
  email = Column(String(128),nullable=False)
