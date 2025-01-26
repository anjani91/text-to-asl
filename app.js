// Mapping words/phrases and alphabets to ASL GIFs and images
const gifs = {
    'my name is bill': 'gifs/my_name_is_bill.gif',
    'whats your name': 'gifs/whats_your_name.gif',
    'hello': 'gifs/hello.gif',
    'world': 'gifs/world.gif',
    'see you later': 'gifs/seeyoulater.gif',
    'good morning': 'gifs/gm.gif',
    'nice to meet you': 'gifs/nicetomeetyou.gif',
    'thankyou': 'gifs/thankyou.gif',
    // Add more phrase mappings here
};

// Mapping alphabet to corresponding images (letters in PNG format)
const alphabetImages = {
    'a': 'images/a.png',
    'b': 'images/b.png',
    'c': 'images/c.png',
    'd': 'images/d.png',
    'e': 'images/e.png',
    'f': 'images/f.png',
    'g': 'images/g.png',
    'h': 'images/h.png',
    'i': 'images/i.png',
    'j': 'images/j.png',
    'k': 'images/k.png',
    'l': 'images/l.png',
    'm': 'images/m.png',
    'n': 'images/n.png',
    'o': 'images/o.png',
    'p': 'images/p.png',
    'q': 'images/q.png',
    'r': 'images/r.png',
    's': 'images/s.png',
    't': 'images/t.png',
    'u': 'images/u.png',
    'v': 'images/v.png',
    'w': 'images/w.png',
    'x': 'images/x.png',
    'y': 'images/y.png',
    'z': 'images/z.png',
};

// Function to handle translation
function translateText() {
    const input = document.getElementById('textInput').value.toLowerCase().trim();
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous output

    // If input is empty, show feedback
    if (!input) {
        outputDiv.innerHTML = '<p>Please enter some text.</p>';
        return;
    }

    const words = input.split(' '); // Split input into words
    let found = false; // Flag to check if at least one match is found

    // First, check if the input matches any phrases in `gifs`
    if (gifs[input]) {
        // If it matches a GIF phrase, show the corresponding GIF
        const img = document.createElement('img');
        img.src = `${gifs[input]}?v=${new Date().getTime()}`; // Cache-busting
        img.alt = `ASL for "${input}"`;
        img.classList.add('asl-image', 'gif'); // Add classes for consistent styling
        outputDiv.appendChild(img);
        found = true;
    } else {
        // If no phrase match is found, process as individual letters
        words.forEach(word => {
            const wordWrapper = document.createElement('div');
            wordWrapper.classList.add('word-wrapper'); // Add a class to wrap the word

            // Handle input as individual letters (for each word)
            [...word].forEach(letter => {
                if (alphabetImages[letter]) {
                    const letterWrapper = document.createElement('div');
                    letterWrapper.classList.add('letter-wrapper');
                    
                    // Create the image element for the letter
                    const img = document.createElement('img');
                    img.src = `${alphabetImages[letter]}?v=${new Date().getTime()}`;
                    img.alt = `ASL for letter "${letter}"`;
                    img.classList.add('asl-image', 'letter');
                    
                    // Create the label for the letter
                    const label = document.createElement('p');
                    label.textContent = letter.toUpperCase();
                    label.classList.add('letter-label');
                    
                    // Append the image and label to the wrapper
                    letterWrapper.appendChild(img);
                    letterWrapper.appendChild(label);
                    
                    wordWrapper.appendChild(letterWrapper);
                    found = true;
                }
            });

            // Add spacing between words (wrap each word in a wrapper div)
            if (found) {
                outputDiv.appendChild(wordWrapper);
            }
        });
    }

    // If no match is found for the word/phrase
    if (!found) {
        outputDiv.innerHTML = `<p>No ASL translation found for "${input}".</p>`;
    }
}

// Event listener for Translate button
document.getElementById('translateBtn').addEventListener('click', translateText);

// Event listener for Enter key press
document.getElementById('textInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        translateText();
    }
});

// Event listener for Clear button
document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('textInput').value = '';
    document.getElementById('output').innerHTML = '';
});
