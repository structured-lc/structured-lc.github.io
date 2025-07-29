### Leetcode 2185 (Easy): Counting Words With a Given Prefix [Practice](https://leetcode.com/problems/counting-words-with-a-given-prefix)

### Description  
Given an array of strings (words) and a string (prefix), count how many words in the list start with the given prefix.  
You must return the count of those words whose initial substring matches the prefix exactly.

### Examples  

**Example 1:**  
Input: `words = ["pay","attention","practice","attend"]`, `pref = "at"`  
Output: `2`  
*Explanation: Only "attention" and "attend" start with the prefix "at".*

**Example 2:**  
Input: `words = ["apple","banana","apricot","berry"]`, `pref = "ap"`  
Output: `2`  
*Explanation: Both "apple" and "apricot" start with the prefix "ap".*

**Example 3:**  
Input: `words = ["dog","cat","mouse"]`, `pref = "z"`  
Output: `0`  
*Explanation: No word in the list starts with "z".*

### Thought Process (as if you’re the interviewee)  

First, using a brute-force approach, I would iterate through each word in the array and check if the word starts with the given prefix by comparing the first few characters of the word to the prefix. If they match, I would increment a counter.

For each word, we need to check whether its first pref.length characters equal the prefix. If so, count it.

Optimizing further, if we have many queries or the list is extremely large, we might consider using a Trie data structure to index the words for multiple prefix queries. However, since this problem is single-query, a simple linear scan is optimal.

I will use the brute-force approach as it is clear and most efficient for this problem size. Using a Trie would only improve efficiency for repeated queries or extremely large inputs, but that is unnecessary for the constraints here.

### Corner cases to consider  
- Empty words array `[]`
- All words are empty strings
- Prefix longer than any word
- Prefix is an empty string (""); every word should count as a match
- Prefix matches some words fully but not others
- Words with unicode or mixed-case (problem assumes simple lowercase letters)

### Solution

```python
def prefix_count(words, pref):
    # Initialize count of words starting with prefix
    count = 0
    
    # Iterate through each word
    for word in words:
        # Check if the word's start matches the prefix
        if word[:len(pref)] == pref:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m)  
  n = number of words, m = length of the prefix.  
  For each word, we compare up to m characters.

- **Space Complexity:** O(1)  
  No extra data structures used; just the counter variable.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you have to do many queries with different prefixes?  
  *Hint: Preprocess words in a Trie to answer prefix queries efficiently.*

- What if you want to return all words matching the prefix, not just the count?  
  *Hint: Instead of counting, collect and return words where their prefix matches.*

- Can you handle case-insensitive prefix matching?  
  *Hint: Normalize words and prefix (e.g., `.lower()`) before comparing.*

### Summary
This is a classic *prefix matching* and *array scan* problem, following a straightforward pattern: loop through the array, compare a substring, and count matches.  
The pattern is common in string problems and shows up in applications like autocomplete, word search, or dictionary prefix lookup. For repeated queries, a Trie is the preferred data structure for improved performance.