### Leetcode 3389 (Hard): Minimum Operations to Make Character Frequencies Equal [Practice](https://leetcode.com/problems/minimum-operations-to-make-character-frequencies-equal)

### Description  
Given a string **s** of lowercase English letters, you can perform the following operations any number of times:

- **Delete** a character from s.
- **Insert** any lowercase character into s.
- **Change** a character in s to its next letter in the alphabet (but 'z' cannot become 'a').

A string is called **good** if all characters in the string occur the same number of times. Return the **minimum number of operations** needed to make s good.

### Examples  

**Example 1:**  
Input: `s = "acab"`  
Output: `1`  
*Explanation: Delete one 'a' or one 'c' so all characters have frequency 1.*

**Example 2:**  
Input: `s = "wddw"`  
Output: `0`  
*Explanation: All letters ('w' and 'd') already have the same frequency (2 each). No operation needed.*

**Example 3:**  
Input: `s = "aaabc"`  
Output: `2`  
*Explanation: Change one 'a' to 'b' (so counts = 2, 2, 1 for a,b,c), then insert one 'c' (counts = 2,2,2). Total 2 operations.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible way to transform s: enumerate all possible target frequencies (from 1 up to max count of any character, possibly longer for insertions), and for each, compute the number of operations needed for every possible distribution of the letters.  
  This is too slow, as possibilities are exponential.

- **Optimization:**  
  Observation: in any "good" string, all present characters must have the same frequency, and at most 26 (lowercase) unique characters.  
  So, for a target frequency x (try all x from 1 up to the length of s), the minimum number of operations is:
    - For each character, if its current count > x, delete (count - x) copies of it.
    - If count < x, can either insert (x - count) or convert some other extra chars (by changing) into this character.
    - All operations can be counted for all characters, sum, and keep the minimum over all x and all possible choices of k characters (where k ≤ 26 and k × x ≈ len(s)).

- **Trade-off:**  
  Since at most 26 characters, for each x from 1 to len(s), calculate the minimal operations by picking top-k frequencies to boost or reduce to x. This is manageable (O(26 × n)), and guaranteed to cover the best possible cost.

### Corner cases to consider  
- s of length 3 (smallest allowed)
- All characters are already "good"
- All unique letters, each occurring once
- Only one type of character
- Mix of frequencies (e.g., a=5, b=2, c=1, etc.)
- Close but not perfect frequencies (just 1 off)
- s contains only one unique character many times

### Solution

```python
def min_operations_to_make_frequencies_equal(s):
    # Count frequency of each lowercase character
    freq = [0]*26
    for ch in s:
        freq[ord(ch) - ord('a')] += 1
    
    # Filter out non-existent characters
    freq = [cnt for cnt in freq if cnt > 0]
    n = len(s)
    min_ops = float('inf')
    
    # Try every possible frequency x (from 1 to len(s))
    for x in range(1, n + 1):
        # Can only target x if some k: k × x ≤ n + extra chars we could insert
        for k in range(1, 27):  # k = number of distinct letters in the "good" string
            if k * x > n + (26 - len(freq)) * x:
                break  # cannot make more than possible
            
            # To make k letters all occur x times,
            # Pick the k (pseudo-letters) to get counts as close to x as possible
            freq_sorted = sorted(freq, reverse=True)
            
            # Add zeros if needed (for insertions for missing characters)
            while len(freq_sorted) < k:
                freq_sorted.append(0)
            
            ops = 0
            # For the top k letters, count ops to get to freq x
            for i in range(k):
                if freq_sorted[i] >= x:
                    ops += freq_sorted[i] - x  # delete excess
                else:
                    ops += x - freq_sorted[i]  # insert/mutate to get more
                    
            # For remaining letters, must delete all
            for i in range(k, len(freq_sorted)):
                ops += freq_sorted[i]
            
            min_ops = min(min_ops, ops)

    return min_ops
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(26 × n) = O(n), where n = len(s). For each possible target frequency x (up to n), and for each k (up to 26), we sort and process the frequencies, but with at most 26 values, so dominated by O(n).
- **Space Complexity:** O(1) extra space (fixed at 26 for counting), not counting the input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only use deletions and insertions (no change-to-next-letter operation)?  
  *Hint: How does this limit flexibility? Can you always reach a “good” state?*

- If the input includes both uppercase and lowercase, how would you generalize the solution?  
  *Hint: Treat frequency array as size 52.*

- What if the input s could contain Unicode characters?  
  *Hint: Use a dictionary rather than a fixed-size array.*

### Summary
This problem uses the "try all possible targets and count costs" pattern, leveraging the bounded alphabet size for efficiency. The key insight is to enumerate all possible combinations of target frequency and number of unique letters, optimizing the cost using insert, delete, and change operations. Similar approaches can be used when normalizing structures with bounded dimensions, such as frequencies, histograms, or task-balancing scenarios.