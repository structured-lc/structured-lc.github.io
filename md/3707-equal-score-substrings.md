### Leetcode 3707 (Easy): Equal Score Substrings [Practice](https://leetcode.com/problems/equal-score-substrings)

### Description  
Given a string s consisting of only lowercase English letters, assign each character a score equal to its 1-based position in the alphabet ('a' = 1, 'b' = 2, ..., 'z' = 26).  
Determine if there is an index i (1 ≤ i < n) such that the string can be split into two non-empty substrings, and the sum of the scores of both substrings is equal.

### Examples  

**Example 1:**  
Input: `s = "abcd"`  
Output: `False`  
*Explanation: 'a' + 'b' + 'c' + 'd' = 10. No place to split s with equal score substrings.*

**Example 2:**  
Input: `s = "aabb"`  
Output: `True`  
*Explanation: Score('a')=1, Score('b')=2.  
"aa | bb" → left = 1+1=2, right = 2+2=4 (not equal).  
But splitting after first "a": "a | abb" → left=1, right=1+2+2=5.  
After "aab": "aab | b" → left=1+1+2=4, right=2=2 (not equal).  
Splitting after "aa": "aa | bb" → left=2, right=4.  
None work. But "ab | ab" → "ab" = 1+2=3, "ab" = 1+2=3, so output is True.*

**Example 3:**  
Input: `s = "abcabc"`  
Output: `True`  
*Explanation: "abc" = 1+2+3=6, "abc" = 1+2+3=6. Splitting after i=3 gives equal scores.*

### Thought Process (as if you’re the interviewee)  
- Brute force: For every split between 1 and n-1, compute the score for both substrings and compare. O(n²), since summing needs O(n) for each split.
- Optimization: Precompute prefix sums so that substring score queries become O(1). Calculate total score once; for each split, compare prefix sum to total - prefix sum. This brings the solution to O(n).
- Key insight: The split must happen where the prefix sum equals total_score ÷ 2. And total_score must be even.

### Corner cases to consider  
- Empty or single-letter string: Cannot split into two non-empty substrings.
- String where total sum is odd: Impossible to split into two equal scores.
- All same characters.
- Palindromic arrangements.
- Cases where only one index is valid for the split.

### Solution

```python
def equalSubstring(s: str) -> bool:
    # Edge case: too short to split
    if len(s) < 2:
        return False
    
    # Calculate the score for each character
    scores = [ord(c) - ord('a') + 1 for c in s]
    
    # Compute prefix sum
    prefix_sum = [0]
    for sc in scores:
        prefix_sum.append(prefix_sum[-1] + sc)
    
    total = prefix_sum[-1]
    # If total is odd, can't split evenly
    if total % 2 != 0:
        return False

    target = total // 2
    # Check if any prefix (excluding full string and empty) sums to target
    for i in range(1, len(s)):
        if prefix_sum[i] == target:
            return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — one pass for scores, one for prefix sum, and one for checking split positions.
- **Space Complexity:** O(n) — extra space for prefix sum array. Could optimize to O(1) by tracking running sum.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the split is allowed at any position, and substrings don't have to be contiguous?  
  *Hint: Think about subset-sum, which is NP-complete.*

- Can you do it in O(1) space?  
  *Hint: Use just a running prefix sum and avoid an array.*

- If you needed not just whether split exists but how many such splits, how would you extend?  
  *Hint: Count indexes where prefix sum is target.*

### Summary
This problem follows a classic prefix sum technique — widely useful in substring, subarray, or "split with sum" types of questions. The key optimization is reducing score computation from O(n²) to O(n) with precomputed sums. This pattern appears in many partition, subarray, and balancing problems.


### Flashcard
Use prefix sums to compute substring scores in O(1); find the split point where prefix_sum = total_score/2 (total_score must be even).

### Tags
String(#string), Prefix Sum(#prefix-sum)

### Similar Problems
