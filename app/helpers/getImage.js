'use strict';

const getImage = {
    shotImage(shot: Object): {uri: ?string} {
        const uri = shot.image.normal
                   ? shot.image.normal
                   : shot.image.teaser;
        return { uri };
    },

    authorAvatar(player: Object): {uri: ?string}{
        const uri;
        if(player){
            uri = player.avatar_url;
            return {uri};
        } 
            uri = require('../../img/AuthorAvatar.png');
            return uri;
        
    }
};

export default getImage;
