### Leetcode 3706 (Medium): Maximum Distance Between Unequal Words in Array II [Practice](https://leetcode.com/problems/maximum-distance-between-unequal-words-in-array-ii)

### Description  
Given a list of words (which may contain duplicates), return the largest possible distance between two words at different positions in the array such that they are unequal. The distance is the absolute difference between their indices. If all words are the same, return `-1`.

You are to find the maximum |i - j| such that 0 ≤ i < j < n and words[i] ≠ words[j].

### Examples  

**Example 1:**  
Input: `words = ["cat", "dog", "cat", "cow", "dog"]`  
Output: `4`  
Explanation: words="cat" and words[4]="dog" are unequal and farthest apart (indices 0 and 4, distance 4).

**Example 2:**  
Input: `words = ["apple", "apple", "banana", "apple"]`  
Output: `3`  
Explanation: words="apple" and words[2]="banana" are unequal and distance is 2; words[2]="banana" and words[3]="apple" are at distance 1; words="apple" and words[3]="apple" are equal (not valid). The maximum is 3 between words[2]="banana" and words="apple".

**Example 3:**  
Input: `words = ["a", "a", "a"]`  
Output: `-1`  
Explanation: All words are identical, no pair of unequal words exists.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Check all pairs i, j (with 0 ≤ i < j < n), and if words[i] ≠ words[j], update the answer with |i - j|. This is O(n²), which is too slow for large n.
- **Optimization:**  
  Notice that the farthest possible unequal elements will be either with the first or last element (since to maximize |i-j| we want indices as far apart as possible).  
  - Scan from right to left to find the first occurrence from the end that is unequal to the first word.  
  - Scan from left to right to find the first occurrence from the beginning that is unequal to the last word.  
  - The answer is the max of either (distance from leftmost to farthest unequal from right) or (distance from rightmost to farthest unequal from left).
- **Why this works:**  
  If all words are equal, the scan won't find any unequal, so can return -1. Otherwise, one of these two scans will give the maximal value.

### Corner cases to consider  
- All elements in the array are the same (should return -1).
- Only two elements but both are different (distance is 1).
- Only two elements and both are the same (distance is -1).
- Unequal words appear at ends and middle.
- Single element array (should return -1).

### Solution

```python
def maximumDistance(words):
    n = len(words)
    # If first and last are already unequal, that's max distance possible
    if words[0] != words[-1]:
        return n - 1

    # Scan right to left for first element unequal to words[0]
    right = n - 1
    while right > 0 and words[right] == words[0]:
        right -= 1
    dist_from_first = right if right != 0 else -1

    # Scan left to right for first element unequal to words[-1]
    left = 0
    while left < n - 1 and words[left] == words[-1]:
        left += 1
    dist_from_last = (n - 1 - left) if left != n - 1 else -1

    # Maximum of both attempts
    return max(dist_from_first, dist_from_last)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as each scan traverses up to n elements once.
- **Space Complexity:** O(1), using only a few pointers, and no extra space proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return the actual pair of indices of words for the maximum distance?
  *Hint: Track the index when you find the unequal element in either scan.*

- How would you solve this if the array could be extremely large (e.g., streaming)?
  *Hint: Maintain the earliest and latest positions of each unique word seen so far.*

- What if you wanted the second maximum distance between unequal words?
  *Hint: Try to maintain a list of candidates for leftmost/rightmost unequal words.*

### Summary
This problem uses a two-pointer scanning pattern optimized for maximum span detection between two unequal elements. It's a linear scan leveraging the insight that the max distance appears at the array edges. This approach is common in detection of array range properties (see also: "Maximum Distance Between Two Unequal Elements," "Longest Distance of Same Elements"). Pattern: Two-pointer edge scanning for maximum/minimum across specific pairwise properties.

### Tags
Array(#array), String(#string)

### Similar Problems
