import i18n from 'i18n';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const localesPath = path.join(__dirname, '../../translations');
const localeFiles = fs.readdirSync(localesPath).filter(file => file.endsWith('.yml'));
const translations: { [key: string]: any } = {};

localeFiles.forEach(file => {
    const locale = path.basename(file, '.yml');
    const content = fs.readFileSync(path.join(localesPath, file), 'utf8');
    translations[locale] = yaml.parse(content);
});

i18n.configure({
    locales: Object.keys(translations),
    defaultLocale: 'en',
    directory: localesPath,
    objectNotation: true,
    updateFiles: false,
    register: global,
    staticCatalog: translations,
});

export default i18n;