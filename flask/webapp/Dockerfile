FROM centos
MAINTAINER yuhia
ENV REPERSHED_AT 2017-11-08
RUN yum install epel-release -y
RUN yum install nginx  -y
RUN yum install python-pip -y
RUN yum install -y gcc pcre-devel openssl-devel python-devel && pip install uwsgi
RUN yum install mysql -y
RUN pip install sqlalchemy pymysql flask supervisor 
RUN mkdir -p /opt/webapp
WORKDIR /opt/webapp
VOLUME /home/flask
EXPOSE 80
