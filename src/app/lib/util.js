// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
export function Random(max, exclude) {
    let val = Math.floor(Math.random() * max);

    if (exclude) {
        while (exclude.includes(val)) val = Math.trunc(max * Math.random());
    }

    return val;
}