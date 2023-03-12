/*

1. Create a band of your choice.
2. Log the newly created band. (Just that band, not all bands)
3. Create another band of your choice.
4. Query all bands, and log them all
5. Create the 3rd band of your choice.
6. Log the newly created 3rd band. (Just that band, not all bands)
7. Rename the first band
8. Log the first band with the updated name. 
9. Remove the second band you created.
10. Query all bands, and log them all
11. Try to create a band with bad input parameters to make sure it throws errors.
12. Try to remove a band that does not exist to make sure it throws errors.
13. Try to rename a band that does not exist to make sure it throws errors.
14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a band by ID that does not exist to make sure it throws errors.


import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);


*/
import {
    create,
    getAll,
    get,
    remove,
    rename
} from './data/bands.js';

async function main() {

    try {
        const band1 = await create(
            // Create a band of your choice.
            'Radwimps',
            ['Rock', 'Indie'],
            'http://www.radwimps.com',
            'Universal Music',
            ['Yojiro Noda', 'Akira Kuwahara', 'Yusuke Saiki', 'Yusuke Takeda'],
            2001
        );
        console.log(band1);
        //Log the newly created band. (Just that band, not all bands)

        const band2 = await create(
            //Create another band of your choice.
            'One Direction',
            ['Pop', 'Pop Rock'],
            'http://www.onedirectionmusic.com',
            'Columbia Records',
            ['Harry Styles', 'Niall Horan', 'Liam Payne', 'Louis Tomlinson'],
            2010
        );

        const bands = await getAll();
        console.log(bands);
        //Query all bands, and log them all

        const band3 = await create(
            //Create the 3rd band of your choice.
            'BTS',
            ['hip hop', 'R&B'],
            'http://www.ibighit.com',
            'Big Hit Music',
            ['Jin Suga', 'Jung kook', 'Jimin', 'RM', 'J-hope'],
            2010
        );
        console.log(band3);
        //Log the newly created 3rd band. (Just that band, not all bands)

        const renamedBand1 = await rename(band1.id, 'GOT7');
        //Rename the first band

        console.log(renamedBand1);
        //Log the first band with the updated name. 

        await remove(band2.id);
        //Remove the second band you created.

        const allBands = await getAll();
        console.log(allBands);
        //Query all bands, and log them all

        const badBand = await create(
            //Try to create a band with bad input parameters to make sure it throws errors.
            'Bad input band',
            ['Wrong Genre'],
            'http://www.xxxxxxx.com',
            null,
            ['Wrong Member'],
            'just a string'
        );
        console.log(badBand);

        await remove('wrong id');
        //Try to remove a band that does not exist to make sure it throws errors.

        await rename('wrong id', 'Test name');
        //Try to rename a band that does not exist to make sure it throws errors.

        await rename(band1.id, null);
        //Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.

        const wrong_id_Band = await get('hiasdhfhwoihfw');
        //Try getting a band by ID that does not exist to make sure it throws errors.

        console.log(wrong_id_Band);

    } catch (e) {
        console.log(e);
    }
}

main();
