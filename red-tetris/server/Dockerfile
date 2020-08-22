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



#see if you cant make the server in django then have the requirements.txt here then pip install -r that and run the python to  run