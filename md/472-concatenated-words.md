### Leetcode 472 (Hard): Concatenated Words [Practice](https://leetcode.com/problems/concatenated-words)

### Description  
Given an array of strings words (without duplicates), return all the concatenated words in the given list of words. A concatenated word is defined as a string that is comprised entirely of at least two shorter words (not necessarily distinct) in the given array.

### Examples  

**Example 1:**  
Input: `words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]`  
Output: `["catsdogcats","dogcatsdog","ratcatdogcat"]`  
*Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats"; "dogcatsdog" can be concatenated by "dog", "cats" and "dog"; "ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".*

**Example 2:**  
Input: `words = ["cat","dog","catdog"]`  
Output: `["catdog"]`  
*Explanation: "catdog" can be concatenated by "cat" and "dog".*


### Thought Process (as if you're the interviewee)  
This is a word break problem variant where we need to find words that can be formed by concatenating other words from the same list.

**Key Insight:**
For each word, we need to check if it can be completely formed by concatenating at least 2 other words (or the same word multiple times) from the word list.

**Approach 1 - DFS with Memoization:**
1. Convert words array to a set for O(1) lookup
2. For each word, use DFS to check if it can be formed by concatenating other words
3. Use memoization to avoid recomputing results for the same substring
4. Ensure we use at least 2 words in the concatenation

**Approach 2 - Dynamic Programming:**
1. For each word, use DP where dp[i] represents whether the substring from 0 to i can be formed
2. For each position, try all possible previous splits

**Implementation Strategy:**
I'll use DFS with memoization as it's more intuitive and easier to implement correctly in an interview setting.

**Optimization:**
Sort words by length and process shorter words first, so we can build up the solution incrementally.


### Corner cases to consider  
- Words that are substrings of themselves: Should be handled by "at least 2 words" requirement  
- Empty array: Should return empty list  
- Single word: Cannot be concatenated, return empty list  
- Words that can be formed in multiple ways: Should still be included once  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def findAllConcatenatedWordsInADict(words):
    if not words:
        return []
    
    # Convert to set for O(1) lookup
    word_set = set(words)
    result = []
    
    def can_form(word, word_set, memo):
        # Check if word can be formed by concatenating other words
        if word in memo:
            return memo[word]
        
        # Try all possible splits of the word
        for i in range(1, len(word)):
            prefix = word[:i]
            suffix = word[i:]
            
            # If prefix is in word_set
            if prefix in word_set:
                # If suffix is also in word_set, we found a valid split
                if suffix in word_set:
                    memo[word] = True
                    return True
                
                # If suffix can be formed recursively, we found a valid split
                if can_form(suffix, word_set, memo):
                    memo[word] = True
                    return True
        
        memo[word] = False
        return False
    
    # Check each word to see if it can be formed by concatenating others
    for word in words:
        memo = {}
        if can_form(word, word_set, memo):
            result.append(word)
    
    return result

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m³) where n is the number of words and m is the average length of words. For each word, we try all possible splits (O(m²)) and for each split, the recursive call can take O(m) time in the worst case.
- **Space Complexity:** O(n × m) for the memoization cache storing results for all possible substrings, plus O(n) for the word set and result list.


### Potential follow-up questions (as if you're the interviewer)  

- How would you optimize this if words could have duplicates?  
  *Hint: Remove duplicates first, or modify the algorithm to handle duplicate counting properly*

- What if you needed to return the actual concatenation breakdown for each word?  
  *Hint: Modify the DFS to track and return the actual split points or constituent words instead of just boolean results*

- How would you solve this if you needed to find the minimum number of words to form each concatenated word?  
  *Hint: Use DP to track the minimum count of words needed to form each substring, similar to the word break problem*

### Summary
This problem combines the word break pattern with set operations and memoization. The key insight is recognizing that it's essentially a word break problem applied to each word in the array. Using DFS with memoization provides an efficient solution that avoids redundant computations. This pattern appears in many string decomposition problems and demonstrates the power of combining recursive thinking with dynamic programming optimizations.
