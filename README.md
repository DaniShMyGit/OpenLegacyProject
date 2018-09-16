# OpenLegacyProject
'Inventory of items' application

1. The 'InventoryItemBackEnd' dir represents the server.

2. The server runs on port 8080.

3. The link for the docker image (both Front and Back-End): danishmydock/openlegacyproject

4. After downloading the image, run 'docker run -d -p 8080:8080 "BackEndDirName"'
  
5. Then, 'docker run -d -p 4200:4200 "FrontEndDirName"
  
6. In case you want to upload the source files to your docker from the git, 
   redirect in the docker terminal to the downloaded source dir.
   You will find the docker-compose.yml file in the root directory.
   just run 'docker-compose build' and then do steps 4 to 5. 

6. To get to the web api ,which exposed by the swagger, just type http://"default docker machine ip address":8080/swagger-ui.html

7. To open the user portal type http://"default docker machine ip address":4200


