import {diecutters} from '../fakedata/data';
import {factories} from '../fakedata/data';

function getOwnerFromFactory(factoryId) {
    var ownerName;
    for (var i=0; i<factories.length; i++) {
        if (factories[i].id==factoryId) {
        ownerName=factories[i].owner;
        }

    }

    
    return ownerName;
}

export default getOwnerFromFactory;