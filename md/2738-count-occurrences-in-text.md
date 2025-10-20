### Leetcode 2738 (Medium): Count Occurrences in Text [Practice](https://leetcode.com/problems/count-occurrences-in-text)

### Description  
Given a table of files, each with a unique filename and some content (a text string), return how many files contain at least one **standalone** occurrence of the word **"bull"** and how many contain at least one **standalone** occurrence of the word **"bear"**.  
A *standalone* word is one that is surrounded by spaces (or at the string start/end). For example, "the bull runs" counts "bull", but "cabull", "bull.", or "bullish" do not.  
You need to return, for each word ("bull" and "bear"), the number of files with at least one standalone occurrence of that word.

### Examples  

**Example 1:**  
Input:  
Files =  
| file_name      | content          |  
|:---------------|:----------------|  
| draft1.txt     | "the bull runs" |  
| draft2.txt     | "bear bull"     |  
| draft3.txt     | "bearish bull"  |  

Output:  
| word | count |  
|:-----|:------|  
| bull |   2   |  
| bear |   1   |  

*Explanation:  
- "bull": Appears as a standalone word in draft1.txt ("the bull runs") and draft2.txt ("bear bull"), so count = 2.  
- "bear": Appears as a standalone word in draft2.txt only. "bearish" does not count, so count = 1.*

**Example 2:**  
Input:  
Files =  
| file_name      | content                  |  
|:---------------|:------------------------|  
| notes.txt      | "No bulls or bears!"     |  
| letters.txt    | "bulls and bears exist." |  

Output:  
| word | count |  
|:-----|:------|  
| bull |   0   |  
| bear |   0   |  

*Explanation:  
- There are no standalone "bull" or "bear" words in any file. "bulls" and "bears" are not counted as "bull" or "bear".*

**Example 3:**  
Input:  
Files =  
| file_name      | content       |  
|:---------------|:-------------|  
| onlybull.txt   | "bull"       |  
| onlybear.txt   | "bear"       |  
| nothing.txt    | "something"  |  

Output:  
| word | count |  
|:-----|:------|  
| bull |   1   |  
| bear |   1   |  

*Explanation:  
- "bull" matches only in onlybull.txt (exact match).
- "bear" matches only in onlybear.txt (exact match).*


### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For each file, check if the word "bull" or "bear" occurs as a standalone word in the file's content. To do this, we can split the content by spaces and check if any token exactly matches "bull" or "bear".  
  Iterate over all files, count for each word how many files have it.

- **Optimizations:**  
  Instead of splitting for each file, we can scan the file contents and use regular expressions to match a whole-word occurrence (e.g., r'\bbull\b').  
  The problem emphasizes checking for standalone: so, matching by word boundaries is the most robust and reliable solution (avoids "bullish" or "cabull" matching).

- **Trade-offs:**  
  - Using regex may be a bit slower per file than just splitting for simple contents, but safer and handles punctuation/scenario around words, and fewer edge bugs.
  - If large file sizes: process line by line if needed, but since we only care if it occurs at least once (not counting total), we can terminate search early per file.

- **Final approach:**  
  For each file, use a regular expression to check if "bull" or "bear" appears as a standalone word in the content, and increment counters.

### Corner cases to consider  
- Empty content files ("")
- Words at file start/end (e.g., "bull", "the bull", "bull run")
- Words with punctuation next to them ("bull!", "bear.")
- Multiple standalone occurrences in the same file (should count as 1 file for that word)
- No files
- Case sensitivity if specified (assuming exact match, typically case-sensitive)
- Content with special unicode characters or separators

### Solution

```python
import re

def count_occurrences_in_text(files):
    # files: list of dicts with 'file_name' and 'content' keys
    count = {'bull': 0, 'bear': 0}
    # Precompile regex for performance
    pattern_bull = re.compile(r'\bbull\b')
    pattern_bear = re.compile(r'\bbear\b')
    
    for file in files:
        text = file['content']
        
        # Check for standalone "bull"
        if pattern_bull.search(text):
            count['bull'] += 1
        # Check for standalone "bear"
        if pattern_bear.search(text):
            count['bear'] += 1
    
    # Prepare result format
    result = [
        {'word': 'bull', 'count': count['bull']},
        {'word': 'bear', 'count': count['bear']}
    ]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n \* L), where n = number of files, L = average length of file content.  
  For each file, runs one regex search for each word (constant factor).

- **Space Complexity:**  
  O(1) auxiliary, as counters and compiled patterns do not depend on input size. Input data must be present in memory (O(total input)), but minimal extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this function for a list of arbitrary words?  
  *Hint: Accept a list of target words; loop regex for each or build one composite regex.*

- How would you handle case-insensitive matching or ignore punctuation?  
  *Hint: Add re.IGNORECASE flag; for punctuation, preprocess text or adjust regex.*

- If some files are extremely large (gigabytes), how to optimize this to avoid memory issues?  
  *Hint: Stream file contents line-by-line; stop at first match per word; process files one at a time.*

### Summary
This approach uses a **regex / string scanning pattern** to detect whole-word matches, which is robust against substrings and punctuation. This is a classic technique useful in word-count, search-engine, and text-processing problems. Variants appear in search tools, spam detection, and document indexing.


### Flashcard
Count files containing “bull” or “bear” as whole words using regex or split—iterate and tally matches.

### Tags
Database(#database)

### Similar Problems
