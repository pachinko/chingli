/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.dtd.$removeEmpty.div = 0;
CKEDITOR.dtd.$removeEmpty.a = 0;
CKEDITOR.config.protectedSource.push(/<br.*?(style|class).*?>/g);   // ASP code
CKEDITOR.config.protectedSource.push(/<a[^>]*><\/a>/g);
CKEDITOR.config.protectedSource.push(/<span[^>]*><\/span>/g);
CKEDITOR.config.disableNativeSpellChecker = false;
CKEDITOR.config.allowedContent = true;
CKEDITOR.config.ignoreEmptyParagraph = false;
CKEDITOR.config.autoParagraph = false;
CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here.
    // For the complete reference:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config 
    // The toolbar groups arrangement, optimized for two toolbar rows.
    config.toolbarGroups = [
		{ name: 'clipboard', groups: ['clipboard', 'undo'] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document', groups: ['mode', 'document', 'doctools'] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
		{ name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
    ];
    config.extraPlugins = 'justify,font';
    // Remove some buttons, provided by the standard plugins, which we don't
    // need to have in the Standard(s) toolbar.
    config.removeButtons = 'Underline,Subscript,Superscript,Save,NewPage,Preview,Print,Templates';

    config.language = 'zh';
    // Se the most common block elements.
    config.format_tags = 'p;h1;h2;h3;pre';

    config.font_names = '標楷體;新細明體;微軟正黑體;Helvetica;Arial;sans-serif;Times New Roman/Times New Roman;Times;serif;Verdana';
    // Make dialogs simpler.
    config.removeDialogTabs = 'image:advanced;link:advanced';
     
    config.enterMode = CKEDITOR.ENTER_BR; 
    config.shiftEnterMode = CKEDITOR.ENTER_P;
    config.docType = '<!DOCTYPE html>';
    config.disableNativeSpellChecker = false;
    config.allowedContent = true;
    config.ignoreEmptyParagraph = false;
    config.autoParagraph = false;
    config.fillEmptyBlocks = false;
};
