function sortPages(pages) {
    // Step - 1
    // Create the array of key-value pairs
    const items = Object.keys(pages).map(
        (url) => { return [url, pages[url]] }
    )
    // const items = Object.entries(pages)

    // Step - 2
    // Sort the array based on the second element (i.e. the value)
    items.sort(
        (first, second) => {return second[1] - first[1]}
    )

    return items
    /*
    // Step - 3
    // Obtain the list of keys in sorted order of the values.
    const keys = items.map(
        (e) => { return e[0] });
    
    return keys
    */
}

function printReport(pages) {
    console.log('\n\nStarting report :')
    console.log('============')
    const sortedPages = sortPages(pages)
    for (let page of sortedPages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
}
 
export { printReport, sortPages }
/*
var dict = {
    "Alice": 25, "Bob": 22, "James": 15, "Jennifer": 29,
    "Sarah": 30, "Luke": 18, "Steve": 41
  };

// Step - 1
// Create the array of key-value pairs
var items = Object.keys(dict).map(
(key) => { return [key, dict[key]] });

// Step - 2
// Sort the array based on the second element (i.e. the value)
items.sort(
(first, second) => { return first[1] - second[1] }
);

// Step - 3
// Obtain the list of keys in sorted order of the values.
var keys = items.map(
(e) => { return e[0] });

console.log(keys);

printReport(keys)
*/