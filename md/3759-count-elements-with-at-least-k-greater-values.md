### Leetcode 3759 (Medium): Count Elements With at Least K Greater Values [Practice](https://leetcode.com/problems/count-elements-with-at-least-k-greater-values)

### Description  
Given an integer array nums of length n and an integer k, count how many elements are "qualified"—meaning each has at least k other elements in the array that are **strictly greater** than it.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4], k = 2`  
Output: `2`  
*Explanation: 1 has 3 greater elements (2,3,4) ≥ 2, so qualified. 2 has 2 greater elements (3,4) ≥ 2, so qualified. 3 has 1 (4) < 2, not qualified. 4 has 0 < 2, not qualified.*

**Example 2:**  
Input: `nums = [2,2,2,2], k = 2`  
Output: `0`  
*Explanation: All elements are 2, so each has 0 strictly greater elements < 2, none qualified.*

**Example 3:**  
Input: `nums = [1,3,1,3,1,3], k = 2`  
Output: `3`  
*Explanation: Each 1 has 3 greater elements (3s) ≥ 2, so all three 1s are qualified. Each 3 has 0 greater elements < 2, not qualified.*


### Thought Process (as if you’re the interviewee)  
Brute force: For each element, iterate through the array counting strictly greater elements; if ≥ k, increment answer. This is O(n²), too slow for n=10⁵.  

To optimize, sort a copy of nums. For each unique value, find how many elements are strictly greater using binary search (upper_bound for first ≥ value, then count from there to end). Multiply by frequency of that value if count ≥ k. Sorting is O(n log n), binary search per unique value is O(log n), total O(n log n).  

Final approach uses sorting + frequency map: handles duplicates efficiently by processing each unique value once, avoiding O(n²) while being simple to implement.

### Corner cases to consider  
- Empty array (n=0): return 0.  
- Single element (n=1): return 0 (no greater elements).  
- All elements equal: return 0 (no strictly greater elements).  
- k=0: all elements qualified (but per constraints k ≥ 1).  
- k > n-1: return 0 (impossible to have that many greater).  
- Duplicates: must count frequency correctly, exclude same values from "greater".

### Solution

```python
from collections import Counter

def countElements(nums, k):
    # Count frequency of each number
    freq = Counter(nums)
    
    # Sort unique values for efficient greater count lookup
    sorted_unique = sorted(freq.keys())
    n = len(nums)
    ans = 0
    
    # For each unique value, find strictly greater count via binary search
    for val in sorted_unique:
        # Binary search for first position >= val+1 (strictly > val)
        left, right = 0, len(sorted_unique)
        while left < right:
            mid = (left + right) // 2
            if sorted_unique[mid] >= val + 1:
                right = mid
            else:
                left = mid + 1
        
        # Count of strictly greater = total unique after this pos * their freqs
        greater_count = 0
        for i in range(left, len(sorted_unique)):
            greater_count += freq[sorted_unique[i]]
        
        # If enough greater elements, add this value's frequency
        if greater_count >= k:
            ans += freq[val]
    
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n). Sorting unique values O(d log d) where d ≤ n is # uniques; for each of d values, binary search O(log d) + O(d) to sum freqs worst-case, but overall bounded by O(n log n).  
- **Space Complexity:** O(n) for Counter and sorted unique list (worst-case all unique).


### Potential follow-up questions (as if you’re the interviewer)  

- Modify to count elements with **at most** k greater values (instead of at least).  
  *Hint: Use similar sorting; for each value, compute total - greater_count - self_freq ≤ k.*

- What if we need to support **multiple queries** with different k values?  
  *Hint: Precompute prefix sums of frequencies after sorting for O(1) greater_count per query.*

- Extend to 2D: given matrix, count cells with ≥ k strictly greater values in same row.  
  *Hint: Sort per row independently, apply same logic per row.*

### Summary
Sort unique values and use binary search + frequency counting to efficiently compute strictly greater elements per value, multiplying by frequency if ≥ k. Common **sorting + binary search for counting** pattern, also used in inversion counts, quantile finding, or range queries.

### Flashcard
Sort unique values + frequency map; for each value use binary search to count strictly greater elements across frequencies, qualify if ≥ k and multiply by its frequency for O(n log n).

### Tags
Array(#array), Binary Search(#binary-search), Divide and Conquer(#divide-and-conquer), Sorting(#sorting), Quickselect(#quickselect)

### Similar Problems
