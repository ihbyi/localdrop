import {
    uniqueNamesGenerator,
    adjectives,
    colors,
} from 'unique-names-generator';

export function randomName() {
    const config = {
        dictionaries: [adjectives, colors],
        separator: '-',
    };

    return uniqueNamesGenerator(config);
}
