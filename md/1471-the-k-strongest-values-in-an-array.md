### Leetcode 1471 (Medium): The k Strongest Values in an Array [Practice](https://leetcode.com/problems/the-k-strongest-values-in-an-array)

### Description  
Given an array of integers arr and an integer k, return the k strongest values in arr. Strength of value x is defined as: |x - m| is greater for a larger strength, where m is the median of arr. If multiple have the same strength, the larger value wins.

### Examples  
**Example 1:**  
Input: `arr = [1,2,3,4,5], k = 2`  
Output: `[5,1]`  
*Explanation: m = 3, strength(5) = 2, strength(1) = 2. 5 > 1, so 5 comes first.*

**Example 2:**  
Input: `arr = [1,1,3,5,5], k = 2`  
Output: `[5,5]`  
*Explanation: m = 3, strengths: |5-3|=2, |1-3|=2, but 5 > 1. Largest numbers win.*

**Example 3:**  
Input: `arr = [6,7,11,7,6,8], k = 5`  
Output: `[11,8,6,6,7]`  
*Explanation: m = 7, sorted by strength then value descending.*

### Thought Process (as if you’re the interviewee)  
To determine strength, sort array to get median: m = arr[⌊(n-1)/2⌋]. Then, define strength as abs(x - m). For same strength, prefer larger value.

Brute-force: compute strength for each, sort by strength desc, value desc, and return first k.

Potential optimization (for follow-up): QuickSelect can get median in O(n), but sorting is simple.

### Corner cases to consider  
- arr has duplicates
- k ≥ n
- arr already sorted
- n is even or odd (median at ⌊(n-1)/2⌋)

### Solution

```python
def getStrongest(arr, k):
    arr.sort()
    n = len(arr)
    m = arr[(n - 1) // 2]
    # Sort by custom strength rule
    arr.sort(key=lambda x: (abs(x - m), x), reverse=True)
    return arr[:k]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sort
- **Space Complexity:** O(n) for output and sort (can do in-place)

### Potential follow-up questions (as if you’re the interviewer)  

- (Can you do better than O(n log n))  
  *Hint: Use QuickSelect for median and partial selection.*

- (If array is too large for memory?)  
  *Hint: Use streaming/heap solutions.*

- (If tie-breaker was opposite direction?)  
  *Hint: Change comparison lambda in sort.*

### Summary
This is a classic custom-sort problem, especially common when needing to sort by both value and some property like distance to median. The two-pass sort is simple and robust for small input sizes.