FROM centos

RUN yum -y update && yum clean all

RUN yum -y install python3

COPY . /data

RUN pip3 install -r /data/requirements.txt

VOLUME [ "/data" ]

WORKDIR /data/Backend/backend

CMD ["python3", "server.py"]


#see if you cant make the server in django then have the requirements.txt here then pip install -r that and run the python to  run