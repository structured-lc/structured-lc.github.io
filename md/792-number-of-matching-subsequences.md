### Leetcode 792 (Medium): Number of Matching Subsequences [Practice](https://leetcode.com/problems/number-of-matching-subsequences)

### Description  
Given a string **s** and an array of strings **words**, count how many words are *subsequences* of **s**.  
A word is a subsequence if you can remove (possibly zero) characters from **s** to get the word, without reordering the remaining characters.  
You're to return the number of words in **words** that appear as subsequences within **s**.

### Examples  

**Example 1:**  
Input: `s = "abcde", words = ["a", "bb", "acd", "ace"]`  
Output: `3`  
*Explanation: "a", "acd", and "ace" are subsequences of "abcde", but "bb" is not.*

**Example 2:**  
Input: `s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]`  
Output: `2`  
*Explanation: "ahjpjau" and "ja" are subsequences; "ahbwzgqnuk" and "tnmlanowax" are not.*

**Example 3:**  
Input: `s = "abc", words = ["", "a", "ab", "acb"]`  
Output: `3`  
*Explanation: "", "a", "ab" are all subsequences; "acb" is not, as it would require swapping characters.*

### Thought Process (as if you’re the interviewee)  

First, brute-force: For each word, check character by character whether it is a subsequence of **s** using two pointers. For each word, scan through **s**. This is slow when **s** is large and **words** has many entries, costing up to O(L × W), with L=len(s) and W=sum(len(word) for word in words).

To optimize, notice that for each word, you only need to know when its next needed character appears in **s**. Instead of starting from scratch for every word, you can use a more efficient technique:  
- Group words by their waiting character using a dictionary/queue.  
- As you walk through **s** letter by letter, update the waiting position for all words waiting for that letter.

This way, every character of **s** is only processed once, and so is every character of every word.

### Corner cases to consider  
- **Empty s:** words can only match if they are also empty.
- **Empty words list:** output should be 0.
- **Empty words (empty string in words):** The empty string is always a subsequence.
- **words longer than s:** cannot be subsequences.
- **Duplicate words:** Count each instance independently.
- **All words matched:** Should still work quickly.

### Solution

```python
from collections import defaultdict, deque

def numMatchingSubseq(s, words):
    # Create buckets mapping char → queue of (word, position)
    waiting = defaultdict(deque)
    for word in words:
        # Each entry: (word, idx of next char needed)
        waiting[word[0] if word else ''].append((word, 1))
    
    count = 0
    # Handle empty string as always a subsequence
    count += len(waiting[''])
    # Remove already matched
    if '' in waiting:
        del waiting['']
    
    for c in s:
        # pop all words currently waiting for c
        advance_queue = waiting[c]
        waiting[c] = deque()
        for word, idx in advance_queue:
            if idx == len(word):
                count += 1
            else:
                waiting[word[idx]].append((word, idx + 1))
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L + Σ len(wordᵢ)), where L = len(s) and the Σ is over all words. Each character in **s** is processed once, and each character in every word is processed once as it advances in its queue.
- **Space Complexity:** O(Σ len(wordᵢ)) for storing all progress pointers/tuples in the queues and O(L) for buckets (dict of letters), but dominated by the total size of words.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **uppercase letters** or a wider character set?  
  *Hint: Replace character-indexed arrays with hashmaps for flexibility.*

- How would you handle **very large input**, e.g., millions of words with many duplicates?  
  *Hint: Prebuild a frequency map for words and only process unique words, then multiply the count at the end.*

- Can you **return the list of matched subsequences** instead of just the count?  
  *Hint: Keep track of matched word references as you increment the count; maintain a result list.*

### Summary  
This uses the **buckets queue** or **multiple pointers/buckets** pattern, grouping work by moments where progress is possible.  
Every character in **s** advances the 'waiting list' for matching subsequences, so the work for each character and each word is done only once and in order.  
This pattern is common for sequence matching, task pipelines, and event simulation.