# WitchDoctor
# Deployment guide

## Requirements

### NodeJS :
- Ubuntu :  `sudo apt-get install --yes nodejs`
- CentOS : `sudo yum install nodejs`

### Node's global packages:
`npm install -g bower grunt-cli pm2`

- grunt : task runner, use for build project.
- bower : javascript library management.
- pm2  : nodejs cluster, auto-restart, monitor, etc....

### Run Command

- Dev:
    
    
        grunt serve
    
- Production
 
        pm2 start express -i <number of instance> 
        pm2 monit <instance id> // monitor
        pm2 logs <instance id>
        pm2 restart <instance id>| all
        pm2 stop <instance id>| all
        

### Global config

- All in config folder.
- default : for all environment.
- dev/prod : for specific environment.


### Ghost blog :
 - ubuntu : do the same with [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-create-a-blog-with-ghost-and-nginx-on-ubuntu-14-04).

 - config for domain :


        server {
            listen 80;
            
            server_name meantodo.com;
            
            location / {
                root /usr/share/nginx/www/WitchDoctor/src/dist;
                proxy_pass http://127.0.0.1:8080;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }
        }


 - config for blog's sub domain :


        server {
            listen 80;
        
            error_log  /var/log/nginx/nginx_error.log  warn;
            server_name blog.morementapp.com;
        
            location / {
               # root /usr/share/nginx/www/ghost/core/built;
                proxy_pass http://127.0.0.1:9000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }
        }


 - link to sites-enabled:


        ln -s /etc/nginx/sites-available/<file-name> /etc/nginx/sites-enabled/


 - Restart nginx :

 
        service nginx restart

