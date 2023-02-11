interface insert {
    name: string;
    header: string[];
    values: string[];
}

function gen_row(row: string[], lengths: number[]): string {
    const gen_cell = (cell: string, i: number) => 
        (i < lengths.length - 1) ? `${cell},`.padEnd(lengths[i]) : cell;

    return row.map((cell, i) => gen_cell(cell, i)).join("");
}

function gen_table(inserts: insert[]): string {
    const header = inserts[0].header;
    const values = inserts.map(insert => insert.values);

    const combine = [header, ...values];

    const lengths = header.map(
        (_, i) => combine.map(row => row[i].length + 5).reduce((a, b) => Math.max(a, b))
    );
    

    const table = values.map(row => 
        `\t(${gen_row(row, lengths)})`
    ).join(",\n");

    return `INSERT INTO ${inserts[0].name}\n\t(${gen_row(header, lengths)})\nVALUES\n${table};`;
}

function prettify(str: string): string {
    const matches = parse(str);
    console.log(matches);

    if (matches.length === 0) { return str; }

    return gen_table(matches);
}

function parse(str: string): insert[] {
    const PREFIX = "INSERT\\s+INTO\\s+";
    const NAME = "([a-zA-Z0-9_.]+)\\s*";
    const SIGNATURE = "\\(([^)]+)\\)\\s+";
    const VALUES = "VALUES\\s+";
    const VALUES_LIST = "\\(([^)]+)\\)";

    const full = `${PREFIX}${NAME}${SIGNATURE}${VALUES}${VALUES_LIST}`;
    
    const re = new RegExp(full, "g");

    return [...str.matchAll(re)].map(match => ({
        name: match[1],
        header: match[2].split(","),
        values: match[3].split(",")
    }));
}

export default prettify;