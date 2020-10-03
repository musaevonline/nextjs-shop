
class ImageUploadAdapter {
    public loader: any;
    public xhr: any;
    public uploadFn: (file: File) => Promise<{default: string}>;

    constructor( loader, uploadFn ) {
        this.loader = loader;
        this.uploadFn = uploadFn;
    }

    upload() {
        return this.loader.file.then(this.uploadFn)
    }

    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // _initRequest() {
    //     const xhr = this.xhr = new XMLHttpRequest();
    //     xhr.open( 'POST', 'http://example.com/image/upload/path', true );
    //     xhr.responseType = 'json';
    // }
    //
    // _initListeners( resolve, reject, file ) {
    //     const xhr = this.xhr;
    //     const loader = this.loader;
    //     const genericErrorText = `Couldn't upload file: ${ file.name }.`;
    //
    //     xhr.addEventListener( 'error', () => reject( genericErrorText ) );
    //     xhr.addEventListener( 'abort', () => reject() );
    //     xhr.addEventListener( 'load', () => {
    //         const response = xhr.response;
    //         if ( !response || response.error ) {
    //             return reject( response && response.error ? response.error.message : genericErrorText );
    //         }
    //
    //         resolve( {
    //             default: response.url
    //         } );
    //     } );
    //     if ( xhr.upload ) {
    //         xhr.upload.addEventListener( 'progress', evt => {
    //             if ( evt.lengthComputable ) {
    //                 loader.uploadTotal = evt.total;
    //                 loader.uploaded = evt.loaded;
    //             }
    //         } );
    //     }
    // }
    //
    // _sendRequest( file ) {
    //     // Prepare the form data.
    //     const data = new FormData();
    //
    //     data.append( 'upload', file );
    //
    //     this.xhr.send( data );
    // }
}

export function ImageUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new ImageUploadAdapter( loader,  editor.config._config.uploadFn);
    };
}