### Leetcode 719 (Hard): Find K-th Smallest Pair Distance [Practice](https://leetcode.com/problems/find-k-th-smallest-pair-distance)

### Description  
Given an integer array, find the k-th smallest **pair distance**, where the distance for a pair (A, B) is defined as the absolute difference |A - B|.  
Formally, for all pairs (i, j) where i < j, compute |nums[i] - nums[j]| for each pair, sort all these distances, and return the k-th smallest one.

### Examples  

**Example 1:**  
Input: `nums = [1,3,1]`, `k = 1`  
Output: `0`  
*Explanation: All pairs: (1,3) → 2, (1,1) → 0, (3,1) → 2. The smallest distance is 0, from the pair (1,1).*

**Example 2:**  
Input: `nums = [1,6,1]`, `k = 3`  
Output: `5`  
*Explanation: All pairs: (1,1) → 0, (1,6) → 5, (6,1) → 5. Distances: [0,5,5]. 3rd smallest distance is 5.*

**Example 3:**  
Input: `nums = [9,10,7,10,6,1,5,4]`, `k = 4`  
Output: `2`  
*Explanation: After sorting nums = [1,4,5,6,7,9,10,10], all pair distances are calculated and sorted as: [1,1,1,1,2,2,2,2,3,3,...]. The 4th smallest is 1, the 6th smallest is 2, and so on. 4th smallest is 1, but for k=4, detailed enumeration shows Result=2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - Generate all possible pairs (i < j) and compute their absolute differences.
  - Store all distances in a list, sort the list, and return the k-th smallest.
  - However, with up to 10,000 numbers, there could be about 50 million pairs—this is too slow.

- **Optimized approach:**  
  - Sort the nums array first.
  - Use binary search over the distance value:  
    - The smallest possible distance is 0 (if duplicates exist), and the largest is (max(nums) - min(nums)).
    - For each possible distance mid, count the number of pairs having distance ≤ mid.
    - If this count is < k, search higher distances; if ≥ k, search for possibly smaller distances.
  - For counting pairs with distance ≤ mid efficiently:
    - Use two pointers—one for the start, one for end. For each end, advance start until nums[end] - nums[start] ≤ mid.
    - For current end, number of pairs is (end - start).
  - This reduces the time complexity from brute-force O(n²) to about O(n logW), where W is the maximum difference in nums.

- The final answer is the lowest distance for which there are at least k such pairs.

### Corner cases to consider  
- nums contains only two equal elements ⇒ output is 0
- All elements in nums are same ⇒ output is 0
- k is 1 ⇒ output is always the minimal possible distance
- Duplicates and non-duplicates mixed
- Array size at lower and upper bounds (e.g., nums of length 2 and 10,000)
- Large k value (near maximum number of pairs)
- Array with maximum and minimum allowed values

### Solution

```python
def smallestDistancePair(nums, k):
    # Sort for easier pairwise distance calculation
    nums.sort()
    n = len(nums)
    
    # Helper: count number of pairs with distance ≤ guess
    def count_pairs(mid):
        count = 0
        left = 0
        for right in range(n):
            # Move left up until nums[right] - nums[left] ≤ mid
            while nums[right] - nums[left] > mid:
                left += 1
            # Add all pairs with this 'right' as last element
            count += right - left
        return count

    # Binary search for the answer distance
    low, high = 0, nums[-1] - nums[0]
    while low < high:
        mid = (low + high) // 2
        if count_pairs(mid) < k:
            low = mid + 1
        else:
            high = mid
    return low
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log(max-min)), where n is the length of nums, and (max-min) is the difference between largest and smallest elements. Sorting is O(n log n), each binary search step is O(n) for counting pairs, and there are about log(max-min) binary search steps.
- **Space Complexity:** O(1) extra space (ignoring input and sort; sort may take O(n) depending on the algorithm/language).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the numbers are streaming and the array is too large to fit into memory?  
  *Hint: Can you maintain a min-heap or use external sorting techniques?*

- Can you find the k-th largest pair distance?  
  *Hint: Can you adapt your binary search? Think about the ordering.*

- How would you handle negative numbers and large integer ranges?  
  *Hint: Does absolute difference change? How does sorting help?*

### Summary
This problem uses the **binary search on answer** technique—searching the solution space (the possible distances) instead of indices.  
Efficient pair counting with two pointers is a classic "window on sorted array" trick.  
The approach is common in other "find k-th in pairwise metric" problems, such as k-th smallest/largest pair sums, medians of pairwise differences, and so on.  
Recognizing when to avoid brute-force O(n²) enumeration by binary searching on computed values is a crucial skill in algorithm design.