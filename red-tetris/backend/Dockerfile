FROM centos

RUN yum -y update && yum clean all

RUN yum -y install python3

COPY . /data

RUN pip3 install -r /data/requirements.txt

RUN  python3 manage.py migrate

VOLUME [ "/data" ]

WORKDIR /data/

CMD ["python3", "server.py"]
