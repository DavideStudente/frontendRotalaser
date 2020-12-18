import {diecutters} from '../fakedata/data';
import {factories} from '../fakedata/data';

function getDieCutterFromId(diecutterId) {
    var diecutter;
    for (var i=0; i<diecutters.length; i++) {
        if (diecutters[i].id==diecutterId) {
            diecutter=diecutters[i];
        }

    }

    
    return diecutter;
}

export default getDieCutterFromId;