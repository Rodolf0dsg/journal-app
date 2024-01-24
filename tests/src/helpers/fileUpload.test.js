import { fileUpload } from "../../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dtopqtz8a',
    api_key: '592379534895185',
    api_secret: 'OwqgP24k6hMGSqf9CBAxf4y8h9Q',
    secure: true,
})

describe('Pruebas en fileUpload', () => {

    test('Debe subir el archivo correctamente', async() => {

        const imgUrl = 'https://pbs.twimg.com/profile_images/1311763847775125516/mvBRhlDs_400x400.jpg';
        const resp = await fetch( imgUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        // console.log(url);

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');
        await cloudinary.api.delete_resources([`journal/${imageId}`], {
            resource_type: 'image',
        });
        

    });

    test('Debe retornar null si el archivo no existe', async() => {

        const file = new File([], 'foto.jpg');

        const url = await fileUpload( file );

        expect( url ).toBe( null );

    });

});