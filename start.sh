set -a
source <(cat .env | sed -e '/^#/d;/^\s*$/d' -e "s/'/'\\\''/g" -e "s/=\(.*\)/='\1'/g")
set +a

docker run -e SCREEN_WIDTH=$SCREEN_WIDTH -e SCREEN_HEIGHT=$SCREEN_HEIGHT -e PROFILE_ID=$PROFILE_ID -e TOKEN=$TOKEN --rm -ti -p 5901:5901 -p 3000:3000 --name orbita-browser orbita-docker:latest 