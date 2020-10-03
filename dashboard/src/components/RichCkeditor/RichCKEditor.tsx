import React from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imageToolbar';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imageStyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageResize';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle';
import Link from '@ckeditor/ckeditor5-link/src/link';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import {ChangeEvent} from "@temp/hooks/useForm";
import {ImageUploadAdapterPlugin} from "@temp/components/RichCkeditor/ImageUploadAdapter";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    editor: {
        '& .ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items': {
            flexWrap: "wrap"
        }
    }
}));

export interface RichCKEditorProps {
    disabled: boolean;
    data: string;
    name: string;
    onChange: (event: ChangeEvent) => void;
}

const RichCKEditor:React.FC<RichCKEditorProps> = ({
                                                      disabled,
                                                      data,
                                                      name,
                                                      onChange
                                                  }) => {

    const classes = useStyles();
    const onChangeContent = (event, editor) => {
        onChange({
            target: {
                name,
                value: editor.getData()
            }
        });
    }

    return(
        <div className={classes.editor}>
            <CKEditor
                editor={ ClassicEditor }
                data={data}
                disabled={disabled}
                // onChange={onChangeContent}
                onBlur={onChangeContent}
                config={{
                    language: "ru",
                    initial: data,
                    toolbar: ['heading', 'alignment', 'bold', 'italic', '|',
                        'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
                        'highlight', '|',
                        'imageInsert', 'imageResize', '|',
                        'bulletedList', 'numberedList', '|',
                        'link', 'undo', 'redo',
                        'insertTable'
                    ],
                    alignment: {
                        options: [ 'left', 'center', 'right', 'justify']
                    },
                    image: {
                        toolbar: [
                            'imageStyle:full',
                            'imageStyle:side',
                            '|',
                            'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                            '|',
                            'linkImage'
                        ],
                        // The default value.
                        styles: [
                            'full',
                            'side',
                            'alignLeft',
                            'alignCenter',
                            'alignRight'
                        ]
                    },
                    table: {
                        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
                    },
                    uploadFn: (file: File): Promise<{default: string}> => {
                        return new Promise((resolve, reject) => {
                            console.log(file.name);
                            resolve({
                                default: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcREhVJT1aQLQmbTi_YrZhpEPZ4MX2paUP97mg&usqp=CAU"
                            });
                            // reject(`Couldn't upload file: ${ file.name }.`)
                        })
                    },
                    plugins: [
                        Alignment, Essentials, Paragraph, Bold, Italic, Heading, Font, Highlight,
                        Image, ImageInsert, ImageToolbar, ImageStyle, ImageResize, LinkImage,
                        ListStyle, Link, AutoLink,
                        Table, TableToolbar,
                        ImageUploadAdapterPlugin
                    ]
                }}
            />
        </div>
    )
};

export default RichCKEditor;