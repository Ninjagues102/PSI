CONTAINER_NAME="mongoDB"

if docker inspect $CONTAINER_NAME >/dev/null 2>&1; then
    docker start $CONTAINER_NAME
else
    docker run -d -p 5050:27017 --name $CONTAINER_NAME mongo:5.0.6
fi