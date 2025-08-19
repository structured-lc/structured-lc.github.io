### Leetcode 192 (Medium): Word Frequency [Practice](https://leetcode.com/problems/word-frequency)

### Description  
Given a text file, `words.txt`, where each line contains only **lowercase words** separated by spaces, write a script to **count the frequency** of each word and **output each word with its frequency**—one per line.  
The output should be **sorted by descending frequency**. If multiple words have the same frequency, they should be sorted **alphabetically**.

### Examples  

**Example 1:**  
Input:  
`words.txt`:  
```
the day is sunny the sunny is day
```
Output:  
```
the 2
day 2
is 2
sunny 2
```
*Explanation: Each word appears twice. Output is descending by count, then alphabetically.*  

**Example 2:**  
Input:  
`words.txt`:  
```
cat bat cat bat dog
```
Output:  
```
bat 2
cat 2
dog 1
```
*Explanation: "bat" and "cat" both appear twice so are sorted alphabetically, followed by "dog" with frequency 1.*  

**Example 3:**  
Input:  
`words.txt`:  
```
the day is sunny the the the sunny is is
```
Output:  
```
the 4
is 3
sunny 2
day 1
```
*Explanation: "the" appears four times, then "is" three, "sunny" two, "day" once — sorted by descending frequency.*  

### Thought Process (as if you’re the interviewee)  
- First, I need to **read the file** and extract all words. Then, **count the frequency** of each.
- A brute-force approach:
  - Read all lines and split by spaces.
  - Use a dictionary/hashmap to count how many times each word appears.
  - Once counted, sort the word/frequency pairs by frequency (descending) and alphabetically for ties.
- This is clearly a **word-frequency** counting problem, something that can be efficiently solved with a hashmap (dict).
- For a *system* problem like this (often tested as a shell/bash script), we can use Unix tools: `cat`, `tr`, `sort`, `uniq -c`, `sort -r`, and `awk`.
- In Python (if simulating), I’d use `split`, `collections.Counter`, and then sort.
- Key trade-offs: Bash is fast for text files and avoids memory overhead of keeping all words in memory (streams data). Python or other languages provide more control.

### Corner cases to consider  
- **Empty file:** no output.
- **Multiple spaces or lines:** handle any whitespace correctly.
- **All unique words:** each appears once, so output is alphabetical.
- **One word only:** should output that word with count 1.
- **Same word separated by different whitespace types or at start/end:** robust splitting is needed.
- **Case sensitivity:** all lowercase as per problem.

### Solution

```python
# Read a file named 'words.txt' and output word frequencies:
# Output should be sorted by descending frequency, then alphabetically.

def word_frequency(filename):
    freq = {}
    with open(filename, 'r') as file:
        for line in file:
            # Split by whitespace (handles multiple spaces)
            for word in line.strip().split():
                freq[word] = freq.get(word, 0) + 1

    # Convert to list of (word, count), sort by descending count, then alphabetically
    output = sorted(freq.items(), key=lambda x: (-x[1], x[0]))
    for word, count in output:
        print(f"{word} {count}")
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + U log U) where N is the number of words in the file and U is number of unique words. Counting is O(N). Sorting is O(U log U).
- **Space Complexity:** O(U) for storing frequency dictionary where U is number of unique words.

### Potential follow-up questions (as if you’re the interviewer)  

- **How would you handle very large files that can’t fit in memory?**  
  *Hint: Think about streaming, external sorting, and disk-backed storage.*

- **How would you modify the script to ignore case or handle punctuation?**  
  *Hint: Normalize input (e.g., lowercasing, stripping punctuation) before counting.*

- **What if words could contain punctuation marks or were not just lowercase?**  
  *Hint: Pre-process lines, use regex to extract valid words.*

### Summary
This problem demonstrates the **hashmap pattern** for word counting, frequently seen in text processing. The output sorting by two criteria is a common question and applies to tasks like histogram counting, log analysis, and deduplication. A similar template is used for “Top K Frequent Elements” and problems involving grouping and sorting by frequency or metrics.

### Tags
Shell(#shell)

### Similar Problems
- Top K Frequent Elements(top-k-frequent-elements) (Medium)