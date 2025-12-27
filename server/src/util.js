import { uniqueNamesGenerator, colors } from 'unique-names-generator';

export function randomName() {
    const config = {
        dictionaries: [colors],
    };

    let name = uniqueNamesGenerator(config);
    while (name === 'tan') name = uniqueNamesGenerator;
    return name;
}
