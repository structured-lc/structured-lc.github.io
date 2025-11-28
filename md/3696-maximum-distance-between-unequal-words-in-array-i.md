### Leetcode 3696 (Easy): Maximum Distance Between Unequal Words in Array I [Practice](https://leetcode.com/problems/maximum-distance-between-unequal-words-in-array-i)

### Description  
Given an array of strings `words`, find the greatest distance between any two indices **i** and **j** (0 ≤ i < j < n) such that `words[i]` ≠ `words[j]`. Distance is defined as `j - i`. If all words are the same (no such pair exists), return 0.

### Examples  

**Example 1:**  
Input: `["a", "b", "c", "a"]`  
Output: `3`  
*Explanation: The distance between index 0 ("a") and index 3 ("a") is not valid because they are equal. Try indices 0 ("a") and 2 ("c"), they are different and the distance is 2. However, the farthest pair with unequal words is between index 1 ("b") and 3 ("a"), distance is 2, as well as 0 ("a") and 2 ("c"), but 0 ("a") and 3 ("a") are equal. Actually, the best pairs are at the two ends (if those are unequal). But if the ends are same, we check inner different word distances.*

**Example 2:**  
Input: `["apple", "apple", "banana", "apple"]`  
Output: `2`  
*Explanation: The leftmost different word is index 2 ("banana"). The possible unequal pairs are (0,"apple") vs (2,"banana") ➔ distance = 2, and (3,"apple") vs (2,"banana") ➔ distance = 1. Maximum is 2.*

**Example 3:**  
Input: `["same", "same", "same"]`  
Output: `0`  
*Explanation: All words are equal, no unequal pair exists, so output is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Compare all possible pairs (i, j) with 0 ≤ i < j < n, check if words[i] ≠ words[j], and record the largest j - i. This would be O(n²).
- **Optimized Approach:**  
  Notice that the max distance could only be either:
    - Between some word at the left end and its farthest right unequal word, or
    - Between some word at the right end and its farthest left unequal word.  
  So, scan from left to right to find the first unequal word from the right end, and from right to left to find the first unequal word from the left end.  
  The answer is max of these two distances.  
  The array is small (n ≤ 100), so a single pass suffices.
- **Final Approach:**  
  - Scan forward for rightmost unequal
  - Scan backward for leftmost unequal
  - Take maximum

### Corner cases to consider  
- Empty array (`[]`) – not allowed by problem, but if present, should return 0.
- All elements equal – return 0.
- Only one element – return 0.
- Unequal pair only at ends.
- More than two kinds of words.
- Long string identical except for one word.

### Solution

```python
def maximum_distance(words):
    # Check if all words are the same
    if all(word == words[0] for word in words):
        return 0

    n = len(words)
    res = 0

    # Compare word at leftmost (words[0]) with all farther words (rightwards)
    for j in range(n-1, -1, -1):
        if words[j] != words[0]:
            res = max(res, j)
            break

    # Compare word at rightmost (words[-1]) with all closer words (leftwards)
    for i in range(n):
        if words[i] != words[-1]:
            res = max(res, n-1-i)
            break

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each scan (forward and backward) is linear, no nested loops.
- **Space Complexity:** O(1).  
  Uses only a few integer variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the words array is very large (say, millions)?  
  *Hint: Is your approach still O(n)? Could you avoid scanning the whole array more than necessary?*

- What if we want not just distance — but to return the indices of the unequal pair(s) that give this distance?  
  *Hint: Store the positions when updating max.*

- How would your code change for the case where we want the minimum distance between unequal words?  
  *Hint: Scan from left, keep track of previous different word.*

### Summary
This approach is a classic "two-pointer/scan from ends" or greedy technique, optimized by leveraging the observation that the maximum distance pair of unequal words must include one endpoint. This pattern appears often in array problems where extremal values are required subject to an inequality, such as "longest unequal", "farthest different", or "spread in a spectrum."


### Flashcard
Information not available in search results.

### Tags
Array(#array), String(#string)

### Similar Problems
