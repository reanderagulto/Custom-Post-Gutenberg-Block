import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

// Import Themes
import { ClassicTheme } from '../views/templates/classic/index.js';
import { DefaultTheme } from '../views/templates/default/index.js';

export default function Save ( props ){
    const { className, attributes, setAttributes } = props;

    const blockProps = useBlockProps.save();    

    return(
        <div { ...blockProps }>
            {
                JSON.stringify(props)
            }

        </div>
    );
} 