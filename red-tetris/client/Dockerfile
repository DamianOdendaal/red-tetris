FROM centos

RUN yum -y update && yum clean all

RUN npm install

COPY . /data

#here we install all of the project dependencies
RUN sh atom.sh

VOLUME [ "/data" ]

WORKDIR /data/

#here we run the image
CMD ["python3", "server.py"]