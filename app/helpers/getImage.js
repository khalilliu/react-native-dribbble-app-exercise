'use strict';

const getImage = {
    shotImage(shot: Object): {uri: ?string} {
        var uri = shot.images.normal
                   ? shot.images.normal
                   : shot.images.teaser;
        return { uri };
    },

    hdImage(shot: Object): {uri: ?string} {
        var uri = shot.images.hidpi
                   ? shot.images.hidpi
                   : shot.images.normal;
        return { uri };
    },

    authorAvatar(player: Object): {uri: ?string}{
        var uri;
        if(player){
            uri = player.avatar_url;
            return {uri};
        } 
            uri = require('../../img/AuthorAvatar.png');
            return uri;
        
    }
};

export default getImage;
