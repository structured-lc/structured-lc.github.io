### Leetcode 3295 (Medium): Report Spam Message [Practice](https://leetcode.com/problems/report-spam-message)

### Description  
You’re given two arrays of strings: **message** (the words in a message) and **bannedWords** (a list of banned words). The message is considered **spam** if **at least two** words from the message *exactly* match any word in the bannedWords list. Return `True` if the message is spam, `False` otherwise.

### Examples  

**Example 1:**  
Input: `message = ["hello","world","leetcode"]`, `bannedWords = ["world","hello"]`  
Output: `True`  
*Explanation: "hello" and "world" from the message both appear in bannedWords. At least two matches, so it's spam.*

**Example 2:**  
Input: `message = ["hello","programming","fun"]`, `bannedWords = ["world","programming","leetcode"]`  
Output: `False`  
*Explanation: Only "programming" is found in bannedWords (one match). Not spam.*

**Example 3:**  
Input: `message = ["foo","bar","baz"]`, `bannedWords = ["abc","def","foo"]`  
Output: `False`  
*Explanation: Only "foo" matches a banned word (one match); not enough for spam.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to loop through each word in the message, and for each one, check if it’s in bannedWords (using a nested loop), counting how many matches occur. If we reach two matches, return True.
- But, since looking up in a list is O(m) and both lists can have up to 10⁵ elements, this is inefficient.
- **Optimization**: Convert bannedWords to a set for O(1) lookup, and then iterate through the message, counting how many words are in the banned set. As soon as the count reaches two, immediately return True for efficiency.
- This approach leverages a set to gain O(1) membership check, making the overall time complexity O(m + n), where m is the length of message and n the length of bannedWords.

### Corner cases to consider  
- message or bannedWords is empty
- All words in message are not in bannedWords
- All words in message are in bannedWords (every word is a banned word)
- Duplicate words in message or bannedWords
- message or bannedWords contains only one word
- What if message and bannedWords overlap only by one word, even if that word occurs multiple times in message? (We just count number of matches, regardless of uniqueness in message.)

### Solution

```python
def reportSpamMessage(message, bannedWords):
    # Convert bannedWords to a set for fast lookup
    banned_set = set(bannedWords)
    count = 0
    # Iterate through each word in message
    for word in message:
        if word in banned_set:
            count += 1
            if count == 2:
                return True  # spam found, exit early
    return False  # less than 2 matches found
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n), where m = len(message), n = len(bannedWords). We build a set of bannedWords (O(n)), then iterate over message (O(m)).
- **Space Complexity:** O(n) for the bannedWords set; negligible extra space beyond that.

### Potential follow-up questions (as if you’re the interviewer)  

- What if bannedWords is extremely large and doesn't fit in memory?  
  *Hint: Can you use a bloom filter or external storage for membership checks?*

- If duplicates in message count as multiple matches, what changes?  
  *Hint: No change—count every match; if only unique matches count: track matched message words with a set.*

- What if you had to report *which* two banned words were matched?  
  *Hint: Store matched words in a list during traversal; return that list as soon as it has size 2.*

### Summary
This problem uses the **hash set membership pattern**: transform the bannedWords list to a set for efficient detection of matches. It's a direct application of set for O(1) lookup, a foundational pattern in coding interviews for de-duplication and fast existence checking. This pattern is prevalent in problems such as “intersection of two arrays,” “word break,” and “longest substring without repeating characters.”

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
