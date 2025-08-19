### Leetcode 3302 (Medium): Find the Lexicographically Smallest Valid Sequence [Practice](https://leetcode.com/problems/find-the-lexicographically-smallest-valid-sequence)

### Description  
Given two strings, **word1** and **word2**, find the lexicographically smallest sequence of indices in word1 such that the characters at these positions, taken in order, form **word2** as a subsequence. You need to return the sequence of indices. Constraints typically guarantee word2 is a subsequence of word1.

Imagine: You are given a string word1, and you want to find the smallest possible sequence of indices—one for each character in word2—such that by reading those positions in order, you get word2, and among all possible such index sequences, you should return the smallest lexicographically.

### Examples  

**Example 1:**  
Input:  
word1=`"abcde"`,  
word2=`"ace"`  
Output: `[0,2,4]`  
*Explanation: Pick indices 0 ('a'), 2 ('c'), 4 ('e'). This forms "ace", and you can't select a lower lexicographic sequence.*

**Example 2:**  
Input:  
word1=`"aabaa"`,  
word2=`"ba"`  
Output: `[2,4]`  
*Explanation: Try to pick the first 'b' as early as possible (index 2), then the next 'a' after that (index 4). Earlier choices (like [2,3]) aren't valid as word1[3]!='a'.*

**Example 3:**  
Input:  
word1=`"xyxxyy"`,  
word2=`"xyy"`  
Output: `[0,2,4]`  
*Explanation: The valid subsequence "xyy" can be taken as word1='x', word1[2]='y', word1[4]='y'. Any earlier possibility is not lexicographically smaller.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**: Generate all possible subsequences where positions in word1 match word2, then pick the smallest one. This is highly inefficient because subsequences can be exponential in number.
- **Optimized approach**:  
  - We want, for each position in word2, to pick the smallest index in word1 possible that matches the current character, while strictly moving forward.
  - Use a *greedy* two-pointer approach:  
    - For each character in word2, find the *first* occurrence in word1 at or after the previous match.
    - This ensures lexicographically smallest sequence because we always pick the earliest index possible for each character.
  - For further optimization, preprocess the next occurrence for each character at each index in word1, enabling O(len(word1) + len(word2)) time.

Trade-offs: The greedy approach gives optimal results for lexicographic ordering and is efficient. Brute-force is not feasible due to combinatorial explosion.

### Corner cases to consider  
- word1 and word2 are identical: indices should be sequential [0,1,2...]
- No possible subsequence: the problem states word2 is always a subsequence, but verify this in your implementation.
- Repeated characters: ensure you don’t pick the same index twice.
- word2 of length 1: just find the earliest matching character.
- All characters in word1 are the same.

### Solution

```python
def find_lex_smallest_valid_sequence(word1: str, word2: str) -> list[int]:
    # Initialize pointers
    n1 = len(word1)
    n2 = len(word2)
    result = []
    pos = 0  # Current search start position in word1

    for i in range(n2):
        # Find the leftmost match for word2[i] in word1, starting from pos
        while pos < n1 and word1[pos] != word2[i]:
            pos += 1
        # After the loop, either pos == n1 (should not happen as per constraints), or we found a match
        result.append(pos)
        pos += 1  # move forward for next character

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(len(word1) + len(word2))  
  Each character in word1 and word2 is processed at most once.
- **Space Complexity:** O(len(word2))  
  Only the result list of size len(word2) is allocated. No extra storage used except variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if word2 is not guaranteed to be a subsequence of word1?  
  *Hint: How would you signal no valid answer? Add a check and maybe return an empty array or -1.*

- What if you need not only the *smallest* sequence, but also the *largest*?  
  *Hint: Try traversing from the end and picking the last occurrence at each step.*

- Can you preprocess word1 to support multiple such queries efficiently?  
  *Hint: Build a next-pos table for each character at every position.*

### Summary
This problem uses the **two-pointer greedy pattern** found in classic subsequence questions. It also echoes "merge intervals" or "merge k sorted" behavior, always picking the local optimal for global validity. This greediness, combined with strict progression of word1, yields the lexicographically smallest solution. The approach and code pattern are widely applicable to string and subsequence search problems with lexicographic constraints.

### Tags
Two Pointers(#two-pointers), String(#string), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
- Smallest K-Length Subsequence With Occurrences of a Letter(smallest-k-length-subsequence-with-occurrences-of-a-letter) (Hard)