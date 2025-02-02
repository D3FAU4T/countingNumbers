const baseNums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const teens = ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const tenths = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const thousands = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion"];

const prefixes = ["", "un", "duo", "tre", "quattuor", "quin", "sex", "septen", "octo", "novem"];
const suffixes = ["decillion", "vigintillion", "trigintillion", "quadragintillion", "quinquagintillion", "sexagintillion", "septuagintillion", "octogintillion", "nonagintillion"];

const generateLargeNums = (): string[] => {
    const largeNums: string[] = [];
    for (const suffix of suffixes)
        for (const prefix of prefixes)
            largeNums.push(prefix + suffix);

    largeNums.push("centillion");
    return largeNums;
};

const largeNums = generateLargeNums();

const processChunk = (chunk: bigint): string => {
    let words = "";

    if (chunk >= 100n) {
        const hundreds = chunk / 100n;
        words += baseNums[Number(hundreds)] + " hundred";
        chunk %= 100n;
    }

    if (chunk >= 20n) {
        const tens = chunk / 10n;
        words += (words ? " " : "") + tenths[Number(tens)];
        chunk %= 10n;
    }

    if (chunk >= 11n && chunk <= 19n)
        words += (words ? " " : "") + teens[Number(chunk - 11n)];
    
    else if (chunk > 0n && chunk < 11n)
        words += (words ? " " : "") + baseNums[Number(chunk)];

    return words;
};

const numberToWords = (input: number | bigint): string => {
    let inputStr = input.toString();

    if (inputStr === "Infinity") return "positive infinity";
    if (inputStr === "-Infinity") return "negative infinity";

    let sign = "";
    if (inputStr[0] === "-") {
        sign = "negative ";
        inputStr = inputStr.slice(1);
    }

    let [intStr, fracStr] = inputStr.split(".");
    
    let intNum = BigInt(intStr);
    let words = "";
    if (intNum === 0n)
        words = baseNums[0];

    else {
        let i = 0;
        const thousandBigInt = 1000n;
        while (intNum > 0n) {
            const chunk = intNum % thousandBigInt;
            if (chunk !== 0n) {
                const suffix = i < thousands.length 
                    ? thousands[i] 
                    : largeNums[i - thousands.length];
                const chunkWords = processChunk(chunk);
                words = chunkWords + (suffix ? " " + suffix : "") + (words ? " " + words : "");
            }

            intNum /= thousandBigInt;
            i++;
        }
    }

    if (fracStr !== undefined && fracStr.length > 0) {
        let fracSeparator = "point";

        for (const digitChar of fracStr) {
            const digit = Number(digitChar);
            fracSeparator += " " + baseNums[digit];
        }

        words = words + " " + fracSeparator;
    }

    return (sign + words).trim();
};

// Test cases
console.log(numberToWords(-0.12345678912345678));
console.log(numberToWords(12345.123456789));
console.log(numberToWords(123456789));
console.log(numberToWords(-123456789));
console.log(numberToWords(0));
console.log(numberToWords(Infinity));
console.log(numberToWords(-Infinity));
console.log(numberToWords(999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999n));
