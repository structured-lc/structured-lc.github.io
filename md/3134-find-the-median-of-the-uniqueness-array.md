### Leetcode 3134 (Hard): Find the Median of the Uniqueness Array [Practice](https://leetcode.com/problems/find-the-median-of-the-uniqueness-array)

### Description  
Given an integer array **nums**, construct the **uniqueness array**, which is the sorted list of the number of distinct elements for every subarray of nums (i.e., for every pair 0 ≤ i ≤ j < n, include `distinct(nums[i..j])`). The median is defined as the middle value in the sorted uniqueness array; if there are two, return the smaller one. Return the median of this uniqueness array.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`,  
Output: `1`  
*Explanation:*
- All subarrays: [1], [2], [3], [1,2], [2,3], [1,2,3]
- Unique counts: [1], [1], [1], [2], [2], [3]
- Sorted: [1, 1, 1, 2, 2, 3]
- Middle is at index ⌊6/2⌋ = 3; uniqueness = 1

**Example 2:**  
Input: `nums = [1,2,1]`,  
Output: `1`  
*Explanation:*
- Subarrays: [1], [2], [1], [1,2], [2,1], [1,2,1]
- Distincts: [1], [1], [1], [2], [2], [2]
- Sorted: [1, 1, 1, 2, 2, 2]
- Median at index 3: 1

**Example 3:**  
Input: `nums = [2,2,2]`,  
Output: `1`  
*Explanation:*
- All subarrays will have only value 2, so all have uniqueness count of 1.
- Median is 1.

### Thought Process (as if you’re the interviewee)  
- **Brute Force**: For every subarray, count its unique elements, collect all, sort, then pick the median.  
    - This has O(n³) time (n² subarrays, and O(n) to count unique values per subarray). Cannot pass constraints for large n.

- **Optimization**:  
    - Instead of forming the full array, note that the uniqueness count is always an integer between 1 and n.  
    - **Binary Search & Counting**: For every possible value of k (uniqueness), count how many subarrays have at most k unique values.  
    - Use **binary search** to find the smallest k for which "subarrays with at most k unique" ≥ median of total subarrays (if sorted).
    - For "number of subarrays with at most k unique", use a sliding window: move right pointer, and for valid window (≤k unique), count new subarrays ending at r; if >k, shrink left.  
    - Similar to Leetcode 992 (Subarrays with K Different Integers).

- **Why final approach works**:  
    - No need to construct the full uniqueness array.  
    - Only need to find the threshold where at least half the subarrays (by median definition) have uniqueness ≤ k.  
    - Binary search O(n log n) across possible k ∈ [1, n].

### Corner cases to consider  
- Array length 1 ([x]): only 1 subarray, uniqueness is 1.
- All elements equal: all subarrays have uniqueness 1.
- All elements unique: uniqueness grows |j-i|+1 for [i..j].
- Odd and even total number of subarrays (test how median is chosen).
- Arrays with alternating repeats: e.g., [1,2,1,2], checks correct uniqueness calculations.

### Solution

```python
def medianOfUniquenessArray(nums):
    n = len(nums)
    total = n * (n + 1) // 2  # Total number of subarrays
    medianPos = (total + 1) // 2  # 1-based index (if even, pick smaller)
    
    def subarraysWithAtMostKUnique(k):
        count = {}
        result = 0
        left = 0
        unique = 0
        for right in range(n):
            val = nums[right]
            count[val] = count.get(val, 0) + 1
            if count[val] == 1:
                unique += 1
            while unique > k:
                count[nums[left]] -= 1
                if count[nums[left]] == 0:
                    unique -= 1
                left += 1
            result += right - left + 1
        return result
    
    left, right = 1, n
    while left < right:
        mid = (left + right) // 2
        if subarraysWithAtMostKUnique(mid) >= medianPos:
            right = mid
        else:
            left = mid + 1
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Binary search over values 1..n (log n)
  - Each binary search step uses sliding window subarray counting in O(n)
  - So total O(n log n)
- **Space Complexity:** O(n)  
  - Dictionary for frequency counts during sliding window.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you find the actual median value without sorting the uniqueness array?
  *Hint: Consider counting subarrays in a way that allows you to infer the distribution without full construction.*

- How would the solution change if the median should be the *larger* of two values (even length)?
  *Hint: What index would you need for the median then?*

- Can this technique be applied to finding other percentiles (like the kᵗʰ smallest uniqueness)?
  *Hint: Think about generalizing binary search to arbitrary percentiles.*

### Summary
This problem requires finding the median value from the multiset of distinct counts of all possible subarrays—a problem that naively demands vast computation and memory. With **binary search** on possible uniqueness values and a **sliding window** for subarray counting (a common pattern for problems involving subarrays with at most K distinct values), we efficiently locate the median without building the full array. This sliding window + binary search pattern appears in other subarray counting and percentile-finding problems, especially involving uniqueness or frequency.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Sliding Window(#sliding-window)

### Similar Problems
- Find K-th Smallest Pair Distance(find-k-th-smallest-pair-distance) (Hard)
- Total Appeal of A String(total-appeal-of-a-string) (Hard)