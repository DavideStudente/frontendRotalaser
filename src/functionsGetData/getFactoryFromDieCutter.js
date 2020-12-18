import {diecutters} from '../fakedata/data';
import {factories} from '../fakedata/data';

function getFactoryFromDieCutter(diecutterId) {
    var factoryId;
    for (var i=0; i<diecutters.length; i++) {
        if (diecutters[i].id==diecutterId) {
        factoryId=diecutters[i].factory;
        }
    }

    return factoryId;
}

export default getFactoryFromDieCutter;